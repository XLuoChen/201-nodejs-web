import {Router} from 'express';
import ItemController from '../../controller/ItemController';


const router = Router();
const itemCtrl = new ItemController();

router.get('/', itemCtrl.getAll);
router.get('/:itemId', itemCtrl.getOne);
router.post('/', itemCtrl.saveItem);
router.delete('/:itemId', itemCtrl.deleteItem);
router.put('/:itemId', itemCtrl.modifyItem);

export default router;