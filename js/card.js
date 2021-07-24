const BUILDING_TYPES_RU = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const similarCardTemplate = document.querySelector('#card').content.querySelector('.popup');
const imgTemplate = similarCardTemplate.querySelector('.popup__photo');

// Создание преимуществ
const createFeatureList = (features) => {
  const fragment = document.createDocumentFragment();
  features.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.classList.add('popup__feature', `popup__feature--${item}`);
    fragment.appendChild(listItem);
  });
  return fragment;
};

// Создание изображений жилья
const createImgList = (imgUrls) => {
  const fragment = document.createDocumentFragment();
  imgUrls.forEach((img) => {
    const imgElement = imgTemplate.cloneNode(true);
    imgElement.src = img;
    fragment.appendChild(imgElement);
  });
  return fragment;
};


// Получение карточки объявления
const getCard = (adCard) => {
  const cardElement = similarCardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = adCard.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = adCard.offer.address;
  cardElement.querySelector('.popup__text--price').innerHTML = `${adCard.offer.price} <span>₽/ночь</span>`;
  cardElement.querySelector('.popup__type').textContent = BUILDING_TYPES_RU[adCard.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${adCard.offer.rooms} комнаты для ${adCard.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${adCard.offer.checkin}, выезд до ${adCard.offer.checkout}`;

  cardElement.querySelector('.popup__features').innerHTML = '';
  if (adCard.offer.features) {
    cardElement.querySelector('.popup__features').appendChild(createFeatureList(adCard.offer.features));
  }

  adCard.offer.description ? cardElement.querySelector('.popup__description').textContent = adCard.offer.description : cardElement.querySelector('.popup__description').remove();

  cardElement.querySelector('.popup__photo').remove();
  if (adCard.offer.photos) {
    cardElement.querySelector('.popup__photos').appendChild(createImgList(adCard.offer.photos));
  }

  cardElement.querySelector('.popup__avatar').src = adCard.author.avatar;

  return cardElement;
};

// Отрисовка одного объявления
const renderCard = (container, card) => container.appendChild(card);

// Отрисовка всех объявлений
const renderCards = (container, cardsData) => {
  cardsData.forEach((card) => {
    container.appendChild(card);
  });
};

export {getCard, renderCard, renderCards};


