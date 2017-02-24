const {Router} = require('express');
const CartController = require('../../controller/cart-controller');

const router = Router();
const cartCtrl = new CartController();

router.get('/', cartCtrl.getAll);
router.get('/:cartId', cartCtrl.getOne);
router.post('/', cartCtrl.saveCart);
router.delete('/:cartId', cartCtrl.deleteCart);
router.put('/:cartId', cartCtrl.modifyCart);

module.exports = router;
