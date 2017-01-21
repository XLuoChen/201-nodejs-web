const Category = require('../models/category');

export default class categoryController {
    getAll(req, res, next) {
        Category.find({}, (err, result) => {
            if (err) {
                return next(err);
            } else {
                res.json(result);
            }
        })
    }

    getOne(req, res, next) {
        const id = req.params.id;
        Category.find({id}, (err, result) => {
            if (err) {
                return next(err);
            } else {
                res.json(result);
            }
        })
    }

    saveCategory(req, res, next) {
        const category = {id: req.body.id, category: req.body.category};
        Category.create(category, (err, result) => {
            if (err) {
                return next(err);
            } else {
                res.send('create successfully!');
            }
        })
    }

    deleteCategory(req, res, next) {
        const id = req.params.id;
        Category.remove({id}, (err, result) => {
            if (err) {
                return next(err);
            } else {
                res.send('ok');
            }
        })
    }

    modifyCategory(req, res, next) {
        const id = req.params.id;
        const newCategory = {category: req.body.category};

        Category.update({id}, {$set: newCategory}, (err, result) => {
            if (err) {
                return next(err);
            } else {
                res.send(result);
            }
        })
    }
}