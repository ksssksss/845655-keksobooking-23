// Рассчет весов преимуществ для объявления
const getFeaturesRank = (ad, {features}) => {
  const adFeatures = ad.offer.features;
  let rank = 0;

  if (!adFeatures) { // если у Объявления нет удобств
    return rank;
  }

  for (let i = 0; i < adFeatures.length; i++) {
    if (features.includes(adFeatures[i])) { // если у у Объявления есть желаемые удобства +3
      rank += 3;
    }
    rank += 1; // если есть удобство, но оно не выбрано пользователем, то все равно +1
  }
  return rank;
};

// Функция сортировки по весу преимущества
function compareFeatures (filter) {
  return function (a, b) {
    const rankA = getFeaturesRank(a, filter);
    const rankB = getFeaturesRank(b, filter);
    return rankB - rankA;
  };
}

export {compareFeatures};
