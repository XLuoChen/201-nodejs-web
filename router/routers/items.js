const {Router}=require('express');
const ItemController = require('../../controller/item-controller');


const router = Router();
const itemCtrl = new ItemController();

router.get('/', itemCtrl.getAll);
router.get('/:itemId', itemCtrl.getOne);
router.post('/', itemCtrl.saveItem);
router.delete('/:itemId', itemCtrl.deleteItem);
router.put('/:itemId', itemCtrl.modifyItem);

module.exports = router;
