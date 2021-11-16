const { Router } = require('express');
const theDogApi = require('../apis/theDogApi');
const { Temperament } = require('../db.js');
const router = Router();

const getTemperaments = (data) => {
  const temperaments = [];
  for (const breed of data) {
    if (breed.temperament) {
      const breedTemperaments = breed.temperament.split(', ');
      breedTemperaments.forEach((t) => {
        if (!temperaments.includes(t)) temperaments.push(t);
      });
    }
  }
  return temperaments;
};

router.get('/', async (req, res) => {
  const { data } = await theDogApi.get('/breeds');
  const temperaments = getTemperaments(data);
  for (const temperament of temperaments) {
    await Temperament.findOrCreate({ where: { name: temperament } });
  }
  const savedTemperaments = await Temperament.findAll();
  const temperamentNames = savedTemperaments
    .map((t) => t.name)
    .sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
  res.json(temperamentNames);
});

module.exports = router;
