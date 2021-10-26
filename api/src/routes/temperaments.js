const { Router } = require('express');
const theDogApi = require('../apis/theDogApi');
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
  res.json(temperaments);
});

module.exports = router;
