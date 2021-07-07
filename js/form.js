const adForm = document.querySelector('.ad-form');
const filters = document.querySelector('.map__filters');

const title = adForm.querySelector('#title');
const price = adForm.querySelector('#price');
const type = adForm.querySelector('#type');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const TYPE_MIN_PRICE = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

function initForms (...forms) {
  return function () {
    forms.forEach((form) => {
      const elementsForm =  form.children;
      form.classList.toggle(`${form.classList.item(0)}--disabled`);

      for (const element of elementsForm) {
        element.toggleAttribute('disabled');
      }
    });
  };
}

const initAdFilters = initForms(adForm, filters);

const capacityValidityChecks = () => {
  const roomValue = +roomNumber.value;
  const capacityValue = +capacity.value;

  if (roomValue === 1 && capacityValue !== 1) {
    capacity.setCustomValidity('Вместимость одной комнаты: 1 гость');
  } else if (roomValue === 2 && capacityValue !== 1 && capacityValue !== 2) {
    capacity.setCustomValidity('Вместимость двух комнат: 1 или 2 гостя');
  } else if (roomValue === 3 && capacityValue === 0) {
    capacity.setCustomValidity('Вместимость трех комнат: 1, 2 или 3 гостя');
  } else if (roomValue === 100 && capacityValue !== 0) {
    capacity.setCustomValidity('Сто комнат не предназначены для гостей. Возможен выбор: не для гостей');
  } else {
    capacity.setCustomValidity('');
  }
};

title.addEventListener('input', () => {
  const titleValue = title.value.length;

  if (titleValue < MIN_TITLE_LENGTH) {
    title.setCustomValidity(`Должно быть больше ${MIN_TITLE_LENGTH} символов. Сейчас ${titleValue} сиволов.`);
  } else if (titleValue > MAX_TITLE_LENGTH) {
    title.setCustomValidity(`Должно быть меньше ${MAX_TITLE_LENGTH} символов. Сейчас ${titleValue} сиволов.`);
  } else {
    title.setCustomValidity('');
  }
});

type.addEventListener('change', () => {
  const typeValue = type.value;

  price.setAttribute('min', TYPE_MIN_PRICE[typeValue]);
  price.setAttribute('placeholder', TYPE_MIN_PRICE[typeValue]);
});

price.addEventListener('input', () => {
  const priceValue = +price.value;

  if (priceValue < price.getAttribute('min')) {
    price.setCustomValidity(`Стоимость должна быть больше ${price.getAttribute('min')}`);
  } else if (priceValue > price.getAttribute('max')) {
    price.setCustomValidity(`Стоимость должна быть меньше ${price.getAttribute('max')}`);
  } else {
    price.setCustomValidity('');
  }
});

capacity.addEventListener('change', () => {
  capacityValidityChecks();
});

roomNumber.addEventListener('change', () => {
  capacityValidityChecks();
});

export {initAdFilters};

