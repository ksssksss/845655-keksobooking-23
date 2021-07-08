const adForm = document.querySelector('.ad-form');
const filters = document.querySelector('.map__filters');

const title = adForm.querySelector('#title');
const price = adForm.querySelector('#price');
const type = adForm.querySelector('#type');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const capacityOptions = capacity.querySelectorAll('option');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const TYPE_MIN_PRICE = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const ROOM_CAPACITY = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
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

const capacityOptionsDisabled = (roomValue) => {
  capacityOptions.forEach((option) => {
    option.setAttribute('disabled', 'disabled');
  });

  ROOM_CAPACITY[roomValue].forEach((capacityAmount) => {
    capacityOptions.forEach((option) => {
      if (+option.value === capacityAmount) {
        option.removeAttribute('disabled');
        option.setAttribute('selected', 'selected');}
    });
  });
};

const capacityValidityChecks = () => {
  const roomValue = +roomNumber.value;
  const capacityValue = +capacity.value;

  capacityOptionsDisabled(roomValue);

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
  capacityValidityChecks(); // на всякий случай валидируем
});

roomNumber.addEventListener('change', () => {
  capacityValidityChecks();
});

timeIn.addEventListener('change', (evt) => {
  timeOut.value = evt.target.value;
});

timeOut.addEventListener('change', (evt) => {
  timeIn.value = evt.target.value;
});

export {initAdFilters};

