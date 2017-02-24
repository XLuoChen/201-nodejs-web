const Item = require('../model/item');
const async = require('async');
const constant = require('../config/constant');

class ItemController {
  getAll(req, res, next) {
    async.series({
      items: (cb) => {
        Item.find({})
          .populate('category')
          .exec(cb);
      },
      totalCount: (cb) => {
        Item.count(cb);
      }
    }, (err, result) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.OK).send(result);
    });

  }

  getOne(req, res, next) {
    const itemId = req.params.itemId;
    Item.find({'_id': itemId}, (err, result) => {
      if (err) {
        return next(err);
      } else {
        return res.status(constant.httpCode.OK).send(result[0]);
      }
    })
  }

  saveItem(req, res, next) {
    Item.create(req.body, (err, doc) => {
      if (err) {
        next(err);
      } else {
        return res.status(constant.httpCode.CREATED).send({uri: `items/${doc._id}`});
      }
    })
  }

  deleteItem(req, res, next) {
    const itemId = req.params.itemId;

    Item.findByIdAndRemove(itemId, (err, doc) => {
      if (err) {
        next(err);
      }
      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      else {
        return res.sendStatus(constant.httpCode.NO_CONTENT);
      }
    })
  }

  modifyItem(req, res, next) {
    const itemId = req.params.itemId;
    Item.findOneAndUpdate({'_id': itemId}, req.body, (err, doc) => {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      else {
        return res.sendStatus(constant.httpCode.NO_CONTENT);
      }
    });
  }
}

module.exports = ItemController;