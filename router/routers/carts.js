import {Router} from 'express';
import CartController from '../../controller/cartController';

const router = new Router();
const cartCtrl = new CartController();

router.get('/', cartCtrl.getAll);
router.get('/:cartId', cartCtrl.getOne);
router.post('/', cartCtrl.saveCart);
router.delete('/:cartId', cartCtrl.deleteCart);
router.put('/:cartId', cartCtrl.modifyCart);

export default router;
