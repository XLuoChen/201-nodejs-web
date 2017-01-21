import {Router} from 'express';
import ItemController from '../../controller/ItemController';


const router = Router();
const itemCtrl = new ItemController();

router.get('/', itemCtrl.getAll);
router.get('/:id', itemCtrl.getOne);
router.post('/', itemCtrl.saveItem);
router.delete('/:id', itemCtrl.deleteItem);
router.put('/:id', itemCtrl.modifyItem);

export default router;