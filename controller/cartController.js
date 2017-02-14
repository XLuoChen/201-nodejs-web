const Cart = require('../models/cart');

class CartController {
  getAll(req, res, next) {
    Cart.find({}, (err, result) => {
      if (err) {
        return next(err);
      } else {
        res.json(result);
      }
    })
  }

  getOne(req, res, next) {
    const cartId = req.params.cartId;

    Cart.find({cartId}, (err, result) => {
      if (err) {
        return next(err);
      } else {
        res.json(result);
      }
    })
  }

  saveCart(req, res, next) {
    const cart = new Cart();
    cart.cartId = req.body.cartId;
    cart.items = req.body.items;

    Cart.create(cart, (err, result) => {
      if (err) {
        return next(err);
      } else {
        res.json(result);
      }
    });
  }

  deleteCart(req, res, next) {
    const cartId = req.params.cartId;
    Cart.remove({cartId}, (err, result) => {
      if (err) {
        return next(err);
      } else {
        res.send('deleted');
      }
    });
  }

  modifyCart(req, res, next) {
    const cartId = req.params.cartId;

    Cart.update({cartId}, {$set: {items: req.body.items}}, (err, result) => {
      if (err) {
        return next(err);
      } else {
        res.send('modified successfully!');
      }
    });
  }
}

module.exports = CartController;