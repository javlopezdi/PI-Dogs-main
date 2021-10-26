const { Router } = require('express');
const _ = require('lodash');
const theDogApi = require('../apis/theDogApi');
const router = Router();

router.get('/', async (req, res) => {
  const { name } = req.query;
  if (!name) {
    const { data } = await theDogApi.get('/breeds');
    return res.json(data);
  }
  const { data } = await theDogApi.get('/breeds/search', {
    params: { q: name },
  });
  res.json(data);
});

router.get('/:breedId', async (req, res) => {
  const breedId = Number(req.params.breedId);
  const { data } = await theDogApi.get('/breeds');
  const foundBreed = data.find((breed) => breed.id === breedId);
  if (foundBreed) {
    const filteredBreed = _.pick(foundBreed, [
      'height',
      'name',
      'temperament',
      'weight',
      'image',
      'life_span',
    ]);
    filteredBreed.height = filteredBreed.height.metric;
    filteredBreed.weight = filteredBreed.weight.metric;
    filteredBreed.image = filteredBreed.image.url;
    return res.json(filteredBreed);
  }
  res.json({ message: 'Breed not found' });
});

module.exports = router;
