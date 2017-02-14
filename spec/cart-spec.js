require('should');
const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

const refresh = require('../tool/refreshMongo');
const Cart = require('../models/cart');

describe('CartController', () => {
  beforeEach(() => {
    refresh();
  });

  it('/GET /carts', (done) => {
    request
      .get('/carts')
      .expect(200)
      .expect((res) => {
        res.body.totalCount.should.equal(1);
        res.body.items.length.should.equal(1);
      })
      .end(done);
  });

  it('GET /carts/:cartId', (done) => {
    request
      .get('/carts/587f0f2586653d19297d40c6')
      .expect(200)
      .expect((res) => {
        res.body.should.eql({
          "_id": "587f0f2586653d19297d40c6",
          "__v": 0,
          "items": [{
            "uri": "items/587f0f2586653d19297d40c2",
            "count": 1
          }, {
            "uri": "items/587f0f2586653d19297d40c3",
            "count": 1
          }, {
            "uri": "items/587f0f2586653d19297d40c4",
            "count": 1
          }]
        });
      })
      .end(done);
  });

  it('POST /carts', (done) => {
    const cart = {
      userId: '2',
      items: [
        {
          count: 4,
          item: '587f0f2586653d19297d40c2'
        }
      ]
    };

    request
      .post('/carts')
      .send(cart)
      .expect(201)
      .expect((res) => {
        Cart.findOne(cart, (err, doc) => {
          res.body.uri.should.equal(doc._id);
        });
      })
      .end(done);
  });

  it('DELETE /carts/:cartId', (done) => {
    request
      .delete('/carts/587f0f2586653d19297d40c6')
      .expect(204)
      .end(done);
  });

  it('PUT /carts/:cartId', (done) => {
    const cart = {
      userId: '9',
      items: [
        {
          count: 4,
          item: '587f0f2586653d19297d40c2'
        }
      ]
    };

    request
      .put('/carts/587f0f2586653d19297d40c6')
      .send(cart)
      .expect(204)
      .end(done);
  });
});