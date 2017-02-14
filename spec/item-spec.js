require('should');
const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);
const Item = require('../models/item');
const refresh = require('../tool/refreshMongo');

describe('ItemController',()=>{
  beforeEach(()=>{
    refresh();
  });

  it('GET /items',(done)=>{
    request
      .get('/items')
      .expect(200)
      .expect((res) => {
        res.body.totalCount.should.equal(3);
      })
      .end(done);
  });
});