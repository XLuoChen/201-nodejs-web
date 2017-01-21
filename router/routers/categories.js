import {Router} from 'express';
import categoryController from '../../controller/categoryController';

const router = new Router();
const categoryCtrl = new categoryController();

router.get('/', categoryCtrl.getAll);
router.get('/:id', categoryCtrl.getOne);
router.post('/', categoryCtrl.saveCategory);
router.delete('/:id', categoryCtrl.deleteCategory);
router.put('/:id', categoryCtrl.modifyCategory);

export default router;
