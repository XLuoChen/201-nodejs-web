const Category = require('../models/category');
const Item = require('../models/item');
const async = require('async');

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
      return res.status(200).send(result);
    });
  }

  getOne(req, res, next) {
    const categoryId = req.params.categoryId;
    Category.findById(categoryId, (err, result) => {
      if (err) {
        return next(err);
      } else {
        return res.status(200).send(result);
      }
    })
  }

  saveCategory(req, res, next) {
    Category.create(req.body, (err, result) => {
      if (err) {
        return next(err);
      } else {
        return res.status(201).send(result._id);
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
          Category.findOneAndRemove({'_id': category}, done)
        }
      }], (err) => {
      if (err === true) {
        return res.sendStatus(403);
      }
      if (err) {
        return next(err);
      }
      return res.sendStatus(204);
    });
  }

  modifyCategory(req, res, next) {
    const categoryId = req.params.categoryId;
    Category.findOneAndUpdate({'_id': categoryId}, req.body, (err, doc) => {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(404);
      }
      return res.sendStatus(204);
    });
  }
}

module.exports = CategoryController;