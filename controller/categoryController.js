const Category = require('../models/category');
const Item = require('../models/item');

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
        let category;
        Category.find({id}, (err, result) => {
            if (err) {
                return next(err);
            } else {
                category = result[0].category;
            }

            Category.remove({id}, (err, result) => {
                if (err) {
                    return next(err);
                } else {
                    Item.find({category}, (err, result) => {
                        if (err) {
                            return next(err);
                        } else {
                            result.forEach(item => {
                                Item.remove({category}, (err, result) => {
                                    if (err) {
                                        return next(err);
                                    }
                                });
                            });
                        }
                    });
                    res.send('ok');
                }
            })
        });
    }

    modifyCategory(req, res, next) {
        const id = req.params.id;
        const newCategory = {category: req.body.category};
        let oldCategory;
        Category.find({id}, (err, result) => {
            if (err) {
                return next(err);
            } else {
                oldCategory = result[0].category;
            }
        });

        Category.update({id}, {$set: newCategory}, (err, result) => {
            if (err) {
                return next(err);
            } else {
                Item.find({category: oldCategory}, (err, result) => {
                    if (err) {
                        return next(err);
                    } else {
                        result.forEach(item => {
                            Item.update({category: oldCategory}, {$set: newCategory}, (err, result) => {
                                if (err) {
                                    return next(err);
                                }
                            });
                        });
                    }
                });

                res.send(result);
            }
        })
    }
}