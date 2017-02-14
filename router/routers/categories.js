const {Router}=require('express');
const categoryController = require('../../controller/categoryController');

const router = Router();
const categoryCtrl = new categoryController();

router.get('/', categoryCtrl.getAll);
router.get('/:id', categoryCtrl.getOne);
router.post('/', categoryCtrl.saveCategory);
router.delete('/:id', categoryCtrl.deleteCategory);
router.put('/:id', categoryCtrl.modifyCategory);

module.exports = router;
