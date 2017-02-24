require('should');
const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

const Category = require('../model/category');

describe('CategoryController', () => {
  it('GET /categories', (done) => {
    request
      .get('/categories')
      .expect(200)
      .expect((res) => {
        res.body.totalCount.should.equal(2);
      })
      .end(done);
  });

  it('GET /categories/:category', (done) => {
    request
      .get('/categories/587f0f2586653d19297d40c8')
      .expect(200)
      .expect((res) => {
        res.body.should.eql({
          "_id": "587f0f2586653d19297d40c8",
          "name": "文具",
          "__v": 0
        });
      })
      .end(done);
  });

  it('POST /categories', (done) => {
    const categories = {
      name: 'food'
    };

    request
      .post('/categories')
      .send(categories)
      .expect(201)
      .expect((res) => {
        Category.findOne(categories, (err, doc) => {
          res.body.uri.should.equal(`categories/${doc._id}`);
        });
      })
      .end(done);
  });

  it('DELETE /categories/:category', (done) => {
    request
      .delete('/categories/587f0f2586653d19297d40c8')
      .expect(400)
      .end(done);
  });

  it('PUT /categories/:category', (done) => {
    const category = {
      name: 'drink'
    };

    request
      .put('/categories/587f0f2586653d19297d40c8')
      .send(category)
      .expect(204)
      .end(done);
  });
});