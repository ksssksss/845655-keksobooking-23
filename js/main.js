function getRandomInteger (minNumber, maxNumber) {
  try {
    if ((minNumber >= 0) && (maxNumber >= 0)) {
      if (minNumber > maxNumber) {
        const temp = minNumber;
        minNumber = maxNumber;
        maxNumber = temp;
      }

      return Math.floor(minNumber + Math.random()*(maxNumber + 1 - minNumber));
    }

    throw new ReferenceError('Ошибка: отрицательный диапазон.');
  } catch(err) {
    // alert(err.message);
  }
}

function getRandomCoordinate (minNumber, maxNumber, decimalPlaces = 0) {
  try {
    if ((minNumber >= 0) && (maxNumber >= 0) && (minNumber <= 180) && ((maxNumber <= 180))) {
      if (minNumber > maxNumber) {
        const temp = minNumber;
        minNumber = maxNumber;
        maxNumber = temp;
      }

      return (minNumber + Math.random() * (maxNumber - minNumber)).toFixed(decimalPlaces);
    }

    throw new ReferenceError('Ошибка: диапазон должен быть в пределах [0, 180]');
  }
  catch (err) {
    // alert(err.message);
  }
}

getRandomInteger(10, 1);
getRandomCoordinate(10.2, 170);
