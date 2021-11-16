const { Router } = require('express');
const _ = require('lodash');
const theDogApi = require('../apis/theDogApi');
const { Breed, Temperament } = require('../db.js');
const {
  formatApiBreed,
  formatApiBreeds,
  formatDbBreed,
  formatDbBreeds,
} = require('./formatFunctions');
const router = Router();

router.get('/', async (req, res) => {
  // Obtener y dar formato a las razas de la Api
  const { data } = await theDogApi.get('/breeds');
  const apiBreeds = formatApiBreeds(data);
  // Obtener y dar formato a las razas de la Db
  const dbData = await Breed.findAll({ include: Temperament });
  const dbBreeds = formatDbBreeds(dbData);
  // Concatenar todas las razas
  let allBreeds = apiBreeds.concat(dbBreeds);
  // Si existe un query name, filtrar por name
  const { name } = req.query;
  if (name) {
    allBreeds = allBreeds.filter((breed) =>
      breed.name.toUpperCase().includes(name.toUpperCase())
    );
    // Si no existe ninguna raza con ese nombre, enviar error
    if (!allBreeds.length)
      return res.status(400).json({ message: 'Breed not found' });
  }
  // Enviar las razas
  return res.json(allBreeds);
});

router.get('/:breedId', async (req, res) => {
  const breedId = req.params.breedId;
  // Buscar breed en la Api
  const { data } = await theDogApi.get('/breeds');
  const foundApiBreed = data.find((breed) => breed.id.toString() === breedId);
  // Si se encuentra en la Api, darle formato y enviarla
  if (foundApiBreed) {
    const apiBreed = formatApiBreed(foundApiBreed);
    return res.json(apiBreed);
  }
  // Buscar breed en la Db
  const foundDbBreed = await Breed.findOne({
    where: { id: breedId },
    include: Temperament,
  });
  // Si se encuentra en la Db, darle formato y enviarla
  if (foundDbBreed) {
    const dbBreed = formatDbBreed(foundDbBreed);
    return res.json(dbBreed);
  }
  // Si no se encuentra, enviar mensaje que lo indique
  res.json({ message: 'Breed does not exist' });
});

module.exports = router;
