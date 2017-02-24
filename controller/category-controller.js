const Category = require('../model/category');
const Item = require('../model/item');
const async = require('async');
const constant = require('../config/constant');

class CategoryController {
  getAll(req, res, next) {
    async.series({
      items: (cb) => {
        Category.find({}, cb);
      },
      totalCount: (cb) => {
        Category.count(cb);
      }
    }, (err, result) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.OK).send(result);
    });
  }

  getOne(req, res, next) {
    const categoryId = req.params.categoryId;
    Category.findById(categoryId, (err, result) => {
      if (err) {
        return next(err);
      } else {
        return res.status(constant.httpCode.OK).send(result);
      }
    })
  }

  saveCategory(req, res, next) {
    Category.create(req.body, (err, result) => {
      if (err) {
        return next(err);
      } else {
        return res.status(constant.httpCode.CREATED).send(result._id);
      }
    })
  }

  deleteCategory(req, res, next) {
    const category = req.params.categoryId;
    async.waterfall([
      (done) => {
        Item.find({category}, done);
      },
      (data, done) => {
        if (data) {
          done(true, null);
        } else {
          Category.findByIdAndRemove(category, done)
        }
      }], (err) => {
      if (err === true) {
        return res.sendStatus(constant.httpCode.BAD_REQUEST);
      }
      if (err) {
        return next(err);
      }
      return res.sendStatus(constant.httpCode.NO_CONTENT);
    });
  }

  modifyCategory(req, res, next) {
    const categoryId = req.params.categoryId;
    Category.findOneAndUpdate({'_id': categoryId}, req.body, (err, doc) => {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.sendStatus(constant.httpCode.NO_CONTENT);
    });
  }
}

module.exports = CategoryController;