const getRandomInteger = (minNumber, maxNumber) => {
  const a = Math.ceil(Math.min(Math.abs(minNumber), Math.abs(maxNumber)));
  const b = Math.floor(Math.max(Math.abs(minNumber), Math.abs(maxNumber)));
  return Math.floor(a + Math.random()*(b + 1 - a));
};

const getRandomFloat = (minNumber, maxNumber, decimalPlaces = 0) => {
  const a = Math.min(Math.abs(minNumber), Math.abs(maxNumber));
  const b = Math.max(Math.abs(minNumber), Math.abs(maxNumber));
  return (a + Math.random() * (b - a)).toFixed(decimalPlaces);
};

const getRandomArrayElement = (array) => {
  const randomElement = array[getRandomInteger(0, array.length-1)];
  return randomElement;
};

const getRandomArray = (array) => {
  const randomArray = array.filter(() => Math.random() > 0.5);
  return randomArray;
};

const makeUniqueRandomIntegerGenerator = (a, b) => {
  const previousValues = [];
  return () => {
    let currentValue = getRandomInteger(a, b);
    if (previousValues.length >= (b - a +1)) {
      throw new Error('Перебраны все числа из диапазона');
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(a, b);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

export {getRandomInteger, getRandomFloat, getRandomArrayElement, getRandomArray, makeUniqueRandomIntegerGenerator};
