require('should');
const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);
const Item = require('../model/item');

describe('ItemController', () => {
  it('GET /items', (done) => {
    request
      .get('/items')
      .expect(200)
      .expect((res) => {
        res.body.totalCount.should.equal(3);
      })
      .end(done);
  });

  it('GET /items/:itemId', (done) => {
    request
      .get('/items/587f0f2586653d19297d40c2')
      .expect(200)
      .expect((res) => {
        res.body.should.eql({
          "_id": "587f0f2586653d19297d40c2",
          "name": "钢笔",
          "price": 12,
          "category": {
            "_id": "587f0f2586653d19297d40c8",
            "name": "drink",
            "__v": 0
          },
          "__v": 0
        });
      })
      .end(done);
  });

  it('POST /items', (done) => {
    const item = {
      name: 'pencil',
      price: 3,
      category: '587f0f2586653d19297d40c8'
    };

    request
      .post('/items')
      .send(item)
      .expect(201)
      .expect((res) => {
        Item.findOne(item, (err, doc) => {
          res.body.uri.should.equal(`items/${doc._id}`);
        });
      })
      .end(done);
  });

  it('PUT /items/:itemId', (done) => {
    const item = {
      name: 'eraser',
      price: 2,
      category: '587f0f2586653d19297d40c8'
    };
    request
      .put('/items/587f0f2586653d19297d40c2')
      .send(item)
      .expect(204)
      .end(done);
  });

  it('DELETE /items/:itemId', (done) => {
    request
      .delete('/items/587f0f2586653d19297d40c2')
      .expect(204)
      .end(done);
  });
});