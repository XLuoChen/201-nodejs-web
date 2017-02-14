const {Router}=require('express');
const categoryController = require('../../controller/categoryController');

const router = Router();
const categoryCtrl = new categoryController();

router.get('/', categoryCtrl.getAll);
router.get('/:categoryId', categoryCtrl.getOne);
router.post('/', categoryCtrl.saveCategory);
router.delete('/:categoryId', categoryCtrl.deleteCategory);
router.put('/:categoryId', categoryCtrl.modifyCategory);

module.exports = router;
