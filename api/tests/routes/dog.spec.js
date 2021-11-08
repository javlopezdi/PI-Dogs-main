/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Breed, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Rapper Yorkie',
  height: '15 - 23',
  weight: '4 - 10',
};

describe('dogs routes', () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error('Unable to connect to the database:', err);
    })
  );
  beforeEach(() => Breed.sync({ force: true }).then(() => Breed.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () => agent.get('/dogs').expect(200));
    it('should get all breeds from the TheDogApi and the Database', () =>
      agent.get('/dogs').expect((res) => {
        expect(res.body).to.have.lengthOf(173);
      }));
  });
  describe('GET /dogs?name=german', () => {
    it('should get 200', () =>
      agent.get('/dogs').query({ name: 'german' }).expect(200));
    it('should get all german breeds from the TheDogApi and the Database', () =>
      agent
        .get('/dogs')
        .query({ name: 'german' })
        .expect((res) => {
          expect(
            res.body
              .map((b) => b.name.toUpperCase())
              .every((n) => n.includes('german'.toUpperCase()))
          ).to.be.true;
        }));
  });
});
