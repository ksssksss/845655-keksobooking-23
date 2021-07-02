const BUILDING_TYPES_RU = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

function getCards (similarCards) {
  const similarCard = document.querySelector('#card').content.querySelector('.popup');
  const imgTemplate = similarCard.querySelector('.popup__photo');
  const fragment = document.createDocumentFragment();

  similarCards.forEach((adCard) => {
    const cardElement = similarCard.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = adCard.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = adCard.offer.address;
    cardElement.querySelector('.popup__text--price').innerHTML = `${adCard.offer.price} <span>₽/ночь</span>`;
    cardElement.querySelector('.popup__type').textContent = BUILDING_TYPES_RU[adCard.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = `${adCard.offer.rooms} комнаты для ${adCard.offer.guests} гостей`;
    cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${adCard.offer.checkin}, выезд до ${adCard.offer.checkout}`;

    const featuresClassList = cardElement.querySelectorAll('.popup__feature');
    const currentFeaturesClass = adCard.offer.features.map((item) => `popup__feature--${item}`);
    featuresClassList.forEach((item) => {
      if (!currentFeaturesClass.includes(item.classList[1])) {
        item.remove();
      }
    });

    adCard.offer.description ? cardElement.querySelector('.popup__description').textContent = adCard.offer.description : cardElement.querySelector('.popup__description').remove();

    cardElement.querySelector('.popup__photo').remove();
    if (adCard.offer.photos) {
      const imgFragment = document.createDocumentFragment();
      adCard.offer.photos.forEach((img) => {
        const imgElement = imgTemplate.cloneNode(true);
        imgElement.src = img;
        imgElement.alt = BUILDING_TYPES_RU[adCard.offer.type];
        imgFragment.appendChild(imgElement);
      });
      cardElement.querySelector('.popup__photos').appendChild(imgFragment);
    }

    cardElement.querySelector('.popup__avatar').src = adCard.author.avatar;

    fragment.appendChild(cardElement);
  });

  return fragment;
}

export {getCards};


