const Item = require('../models/item');
const async = require('async');

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
      return res.status(200).send(result);
    });

  }

  getOne(req, res, next) {
    const itemId = req.params.itemId;
    Item.find({'_id': itemId}, (err, result) => {
      if (err) {
        return next(err);
      } else {
        return res.send(result[0]);
      }
    })
  }

  saveItem(req, res, next) {
    Item.create(req.body, (err, doc) => {
      if (err) {
        next(err);
      } else {
        return res.status(201).send({uri: `items/${doc._id}`});
      }
    })
  }

  deleteItem(req, res, next) {
    const itemId = req.params.itemId;

    Item.findOneAndRemove({'_id': itemId}, (err, doc) => {
      if (err) {
        next(err);
      }
      if (!doc) {
        return res.sendStatus(404);
      }
      else {
        return res.sendStatus(204);
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
        return res.sendStatus(404);
      }
      else {
        return res.sendStatus(204);
      }
    });
  }
}

module.exports = ItemController;