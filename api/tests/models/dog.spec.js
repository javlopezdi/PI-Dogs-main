const { Breed, conn } = require('../../src/db.js');

describe('Breed model', () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error('Unable to connect to the database:', err);
    })
  );
  describe('Validators', () => {
    beforeEach(() => Breed.sync({ force: true }));
    it('should create a new Breed if it has a valid name, height and weight', (done) => {
      Breed.create({
        name: 'Rapper Yorkie',
        height: '15 - 23',
        weight: '4 - 10',
      })
        .then(() => done())
        .catch(() => done(new Error('It requires a valid name')));
    });
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Breed.create({
          height: '15 - 23',
          weight: '4 - 10',
        })
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
    });
    describe('height', () => {
      it('should throw an error if height is null', () => {
        Breed.create({
          name: 'Rapper Yorkie',
          weight: '4 - 10',
        })
          .then(() => done(new Error('It requires a valid height')))
          .catch(() => done());
      });
    });
    describe('weight', () => {
      it('should throw an error if weight is null', () => {
        Breed.create({
          name: 'Rapper Yorkie',
          height: '15 - 23',
        })
          .then(() => done(new Error('It requires a valid weight')))
          .catch(() => done());
      });
    });
  });
});
