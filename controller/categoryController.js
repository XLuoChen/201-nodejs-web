const Category = require('../models/category');
const Item = require('../models/item');
const async = require('async');

class CategoryController {
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
    console.log(id);
    Category.find({'_id': id}, (err, result) => {
      if (err) {
        return next(err);
      } else {
        res.json(result);
      }
    })
  }

  saveCategory(req, res, next) {
    const category = {category: req.body.category};
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
    async.waterfall([
      (done) => {
        Category.findOne(id, (err, result) => {
          if (err) {
            done(err, null);
          } else {
            done(null, result[0].category);
          }
        });
      },
      (category, done) => {
        Category.remove({category}, (err, result) => {
          if (err) {
            done(err, null);
          } else {
            done(null, category);
          }
        })
      },
      (category, done) => {
        Item.find({category}, (err, result) => {
          if (err) {
            done(err, null);
          } else {
            result.forEach(item => {
              Item.remove({category}, (err, result) => {
                if (err) {
                  return next(err);
                }
              });
            });
            done(null, null);
          }
        });
      },
      (done) => {
        res.send('deleted');
      }
    ]);
  }

  modifyCategory(req, res, next) {
    const id = req.params.id;
    const newCategory = {category: req.body.category};
    let oldCategory;

    async.waterfall([
      (done) => {
        Category.find({'_id': id}, (err, result) => {
          if (err) {
            done(err, null);
          } else {
            oldCategory = result[0].category;
            done(null, oldCategory);
          }
        });
      },
      (oldCategory, done) => {
        Category.update({id}, {$set: newCategory}, (err, result) => {
          if (err) {
            done(err, null);
          } else {
            done(null, oldCategory);
          }
        })
      },
      (oldCategory, done) => {
        Item.find({category: oldCategory}, (err, result) => {
          if (err) {
            done(err, null);
          } else {
            result.forEach(item => {
              Item.update({category: oldCategory}, {$set: newCategory}, (err, result) => {
                if (err) {
                  return next(err);
                }
              });
            });
            done(null, null);
          }
        });
      },
      (done) => {
        res.send('mondified successfully!');
      }
    ]);
  }
}

module.exports = CategoryController;