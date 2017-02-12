const Item = require('../models/item');

export default class ItemController {
  getAll(req, res, next) {
    Item.find({}, (err, result) => {
      if (err) {
        return next(err);
      } else {
        res.send(result);
      }
    });
  }

  getOne(req, res, next) {
    const newItem = new Item();
    newItem.itemId = req.params.itemId;
    Item.find({'_id': newItem.itemId}, (err, result) => {
      if (err) {
        return next(err);
      } else {
        res.send(result);
      }
    })
  }

  saveItem(req, res, next) {
    const newItem = new Item();
    newItem.itemId = req.body.itemId;
    newItem.name = req.body.name;
    newItem.category = req.body.category;

    Item.create({name: newItem.name, category: newItem.category}, (err, result) => {
      if (err) {
        next(err);
      } else {
        res.send('ok');
      }
    })
  }

  deleteItem(req, res, next) {
    const newItem = new Item();
    newItem.itemId = req.params.itemId;

    Item.remove({'_id': newItem.itemId}, (err, result) => {
      if (err) {
        next(err);
      } else {
        res.send('ok');
      }
    })
  }

  modifyItem(req, res, next) {
    const newItem = new Item();
    newItem.itemId = req.params.itemId;
    newItem.name = req.body.name;
    newItem.category = req.body.category;

    Item.update({'_id': newItem.itemId}, {
      $set: {
        name: newItem.name,
        category: newItem.category
      }
    }, (err, result) => {
      if (err) {
        next(err);
      } else {
        res.send(result);
      }
    })
  }
}
