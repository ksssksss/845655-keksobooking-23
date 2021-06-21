
const MAX_PRICE = 40000;
const MAX_ROOMS = 6;
const MAX_GUESTS = 20;
const MIN_LAT = 35.65000;
const MAX_LAT = 35.70000;
const MIN_LNG = 139.70000;
const MAX_LNG = 139.80000;
const COUNT_ADS = 10;
const BUILDING_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const CHECKIN_TIMES = [
  '12:00',
  '13:00',
  '14:00',
];
const CHECKOUT_TIMES = [
  '12:00',
  '13:00',
  '14:00',
];
const FEATURES_ARRAY = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const PHOTOS_ARRAY = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

// Массив для формирования адреса ихображения autor.avatar:
// по мере формирования адресов элементы объекта удаляются, с целью избежания повторов
const avatarsNumber = new Array(COUNT_ADS).fill(null).map((value, index) => (index + 1) < 10 ? '0' + (index + 1) : '' + (index + 1));

function getRandomInteger (minNumber, maxNumber) {
  const a = Math.ceil(Math.min(Math.abs(minNumber), Math.abs(maxNumber)));
  const b = Math.floor(Math.max(Math.abs(minNumber), Math.abs(maxNumber)));
  return Math.floor(a + Math.random()*(b + 1 - a));
}

function getRandomFloat (minNumber, maxNumber, decimalPlaces = 0) {
  const a = Math.min(Math.abs(minNumber), Math.abs(maxNumber));
  const b = Math.max(Math.abs(minNumber), Math.abs(maxNumber));
  return (a + Math.random() * (b - a)).toFixed(decimalPlaces);
}

function getRandomArrayElement (array) {
  return array[getRandomInteger(0, array.length-1)];
}

function getRandomArray (array) {
  // return new Array(getRandomInteger(1, array.length)).fill(null).map(() => getRandomArrayElement(array));
  return array.filter(() => Math.random() > 0.5);
}

function createRandomAd () {
  const locationLat = getRandomFloat(MIN_LAT, MAX_LAT, 6);
  const locationLng = getRandomFloat(MIN_LNG, MAX_LNG, 6);
  const result = {
    autor: {
      avatar: 'img/avatars/user' + avatarsNumber.splice(getRandomInteger(0, avatarsNumber.length-1), 1) + '.png',
    },

    location: {
      lat: locationLat,
      lng: locationLng,
    },

    offer: {
      title: 'Title',
      address: locationLat + ', ' + locationLng,
      price: getRandomInteger(3000, MAX_PRICE),
      type: getRandomArrayElement(BUILDING_TYPES),
      rooms: getRandomInteger(1, MAX_ROOMS),
      guests: getRandomInteger(1, MAX_GUESTS),
      checkin: getRandomArrayElement(CHECKIN_TIMES),
      checkout: getRandomArrayElement(CHECKOUT_TIMES),
      features: getRandomArray(FEATURES_ARRAY),
      description: 'Description',
      photos: getRandomArray(PHOTOS_ARRAY),
    },
  };

  result.offer.title = `${result.offer.type[0].toUpperCase() + result.offer.type.slice(1)} for ${result.offer.guests} guests`;
  return result;
}

const ads = new Array(COUNT_ADS).fill(null).map(() => createRandomAd());
