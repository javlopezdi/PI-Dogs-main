module.exports = {
  formatApiBreeds(apiBreeds) {
    return apiBreeds.map((breed) => {
      return {
        id: breed.id,
        name: breed.name,
        weight: breed.weight.metric,
        image: breed.image.url,
        temperament: breed.temperament,
      };
    });
  },

  formatDbBreeds(dbBreeds) {
    return dbBreeds.map((breed) => {
      return {
        id: breed.id,
        name: breed.name,
        weight: breed.weight,
        image: breed.image,
        temperament: breed.temperaments.map((b) => b.name).join(', '),
      };
    });
  },

  formatApiBreed({ id, name, weight, height, life_span, image, temperament }) {
    return {
      id,
      name,
      weight: weight.metric,
      height: height.metric,
      lifeSpan: life_span,
      image: image.url,
      temperament,
    };
  },

  formatDbBreed({ id, name, weight, height, lifeSpan, image, temperaments }) {
    return {
      id,
      name,
      weight,
      height,
      lifeSpan,
      image,
      temperament: temperaments.map((t) => t.name).join(', '),
    };
  },
};
