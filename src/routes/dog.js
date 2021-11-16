const { Router } = require('express');
const { Op } = require('sequelize');
const { Breed, Temperament } = require('../db.js');
const router = Router();

router.post('/', async (req, res) => {
  const { name, height, weight, lifeSpan, image, temperament } = req.body;
  const foundBreed = await Breed.findOne({ where: { name } });
  if (foundBreed) throw new Error('Breed already exists');
  const newBreed = await Breed.create({
    name,
    height,
    weight,
    lifeSpan,
    image,
  });
  const foundTemperaments = await Temperament.findAll({
    where: { name: { [Op.in]: temperament } },
  });
  await newBreed.addTemperaments(foundTemperaments);
  const formatedBreed = {
    id: newBreed.id,
    name,
    weight,
    image,
    temperament: temperament.join(', '),
  };
  console.log(formatedBreed);
  res.json(formatedBreed);
});

module.exports = router;
