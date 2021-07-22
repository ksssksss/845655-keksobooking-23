import {getRandomInteger, getRandomFloat, getRandomArrayElement, getRandomArray, makeUniqueRandomIntegerGenerator} from './util.js';

const COUNT_ADS = 10;
const MAX_PRICE = 40000;
const MAX_ROOMS = 6;
const MAX_GUESTS = 20;
const MIN_LAT = 35.65000;
const MAX_LAT = 35.70000;
const MIN_LNG = 139.70000;
const MAX_LNG = 139.80000;
const BUILDING_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
const CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
const FEATURES_ARRAY = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS_ARRAY = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const getUniqueAvatarNumber = makeUniqueRandomIntegerGenerator(1, COUNT_ADS);

// Создание рандомного объявления
const createRandomAd = () => {
  const locationLat = getRandomFloat(MIN_LAT, MAX_LAT, 6);
  const locationLng = getRandomFloat(MIN_LNG, MAX_LNG, 6);
  const avatarNumber = getUniqueAvatarNumber();

  const result = {
    author: {
      avatar: `img/avatars/user${avatarNumber < 10 ? `0${avatarNumber}` : avatarNumber}.png`,
    },

    location: {
      lat: locationLat,
      lng: locationLng,
    },

    offer: {
      title: 'Title',
      address: `${locationLat}, ${locationLng}`,
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
};

// Получение рандомных объявлений
const getAds = (countAds = COUNT_ADS) => {
  const ads = new Array(countAds).fill(null).map(() => createRandomAd());
  return ads;
};

export {getAds};
