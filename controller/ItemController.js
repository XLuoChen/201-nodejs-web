const Item = require('../models/item');

export default class ItemController {
    getAll(req, res, next) {
        Item.find({}, (err, result) => {
            if (err) {
                return next(err);
            } else {
                res.send(result);
            }
        });
    }

    getOne(req, res, next) {
        const newItem = new Item();
        newItem.id = req.params.id;
        Item.find({id: newItem.id}, (err, result) => {
            if (err) {
                return next(err);
            } else {
                res.send(result);
            }
        })
    }

    saveItem(req, res, next) {
        const newItem = new Item();
        newItem.id = req.body.id;
        newItem.name = req.body.name;
        newItem.category = req.body.category;

        Item.create({id: newItem.id, name: newItem.name, category: newItem.category}, (err, result) => {
            if (err) {
                next(err);
            } else {
                res.send('ok');
            }
        })
    }

    deleteItem(req, res, next) {
        const newItem = new Item();
        newItem.id = req.params.id;

        Item.remove({id: newItem.id}, (err, result) => {
            if (err) {
                next(err);
            } else {
                res.send('ok');
            }
        })
    }

    modifyItem(req, res, next) {
        const newItem = new Item();
        newItem.id = req.params.id;
        newItem.name = req.body.name;
        newItem.category = req.body.category;

        Item.update({id: newItem.id}, {$set: {name: newItem.name, category: newItem.category}}, (err, result) => {
            if (err) {
                next(err);
            } else {
                res.send(result);
            }
        })
    }
}
