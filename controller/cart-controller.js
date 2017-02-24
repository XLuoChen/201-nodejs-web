const Cart = require('../model/cart');
const async = require('async');
const constant = require('../config/constant');

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
      return res.status(constant.httpCode.OK).send(result);
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
        return res.status(constant.httpCode.OK).send(data);
      }
    })
  }

  saveCart(req, res, next) {

    Cart.create(req.body, (err, result) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.CREATED).send({uri: `carts/${result._id}`});
    });
  }

  deleteCart(req, res, next) {
    const cartId = req.params.cartId;
    Cart.findByIdAndRemove(cartId, (err, result) => {
      if (err) {
        return next(err);
      }
      if (!result) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.sendStatus(constant.httpCode.NO_CONTENT);
    });
  }

  modifyCart(req, res, next) {
    const cartId = req.params.cartId;
    console.log(req.body)
    Cart.findOneAndUpdate(cartId, req.body, (err, result) => {
      if (err) {
        return next(err);
      }
      if (!result) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.sendStatus(constant.httpCode.NO_CONTENT);
    });
  }
}

module.exports = CartController;