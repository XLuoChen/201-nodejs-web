const Cart = require('../models/cart');
const async = require('async');

const loadItemUri = function (items) {
  return items.map(({count, item}) => {
    return {uri: `items/${item}`, count};
  });
};

class CartController {
  getAll(req, res, next) {
    async.series({
      items: (cb) => {
        Cart.find({}, (err, doc) => {
          if (err) {
            return next(err);
          }
          const carts = doc.map(item => {
            return item.toJSON();
          });
          cb(null, carts);
        })
      },
      totalCount: (cb) => {
        Cart.count(cb);
      }
    }, (err, result) => {
      if (err) {
        return next(err);
      }
      return res.status(200).send(result);
    })
  }

  getOne(req, res, next) {
    const cartId = req.params.cartId;

    Cart.findById(cartId, (err, doc) => {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(404);
      }
      else {
        const data = doc.toJSON();
        data.items = loadItemUri(data.items);
        return res.status(200).send(data);
      }
    })
  }

  saveCart(req, res, next) {

    Cart.create(req.body, (err, result) => {
      if (err) {
        return next(err);
      } else {
        return res.status(201).send({uri: `carts/${result._id}`});
      }
    });
  }

  deleteCart(req, res, next) {
    const cartId = req.params.cartId;
    Cart.findOneAndRemove({'_id': cartId}, (err, result) => {
      if (err) {
        return next(err);
      }
      if (!result) {
        return res.sendStatus(404);
      }
      else {
        return res.sendStatus(204);
      }
    });
  }

  modifyCart(req, res, next) {
    const cartId = req.params.cartId;

    Cart.update({'_id': cartId}, {$set: req.body}, (err, result) => {
      if (err) {
        return next(err);
      }
      if (!result) {
        return res.sendStatus(404);
      }
      else {
        return res.sendStatus(204);
      }
    });
  }
}

module.exports = CartController;