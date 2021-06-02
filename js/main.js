function getRandomInteger (minNumber, maxNumber) {
  if (minNumber < 0 || maxNumber < 0) {
    throw new ReferenceError('Ошибка: отрицательный диапазон.');
  }
  if (minNumber > maxNumber) {
    const temp = minNumber;
    minNumber = maxNumber;
    maxNumber = temp;
  }
  return Math.floor(minNumber + Math.random()*(maxNumber + 1 - minNumber));
}

function getRandomFloat (minNumber, maxNumber, decimalPlaces = 0) {
  if (minNumber < 0 || maxNumber <0) {
    throw new ReferenceError('Ошибка: отрицательный диапазон.');
  }
  if (minNumber > maxNumber) {
    const temp = minNumber;
    minNumber = maxNumber;
    maxNumber = temp;
  }
  return (minNumber + Math.random() * (maxNumber - minNumber)).toFixed(decimalPlaces);
}

getRandomInteger(1, 12);
getRandomFloat(10.2, 170, 4);
