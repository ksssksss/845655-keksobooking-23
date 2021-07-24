import {sendData} from './fetch.js';
import {showMessage} from './messages.js';
import {setMainMarkerDefault} from './map.js';
import {resetFilters, mapFilters} from './filters.js';
import {removePreviews} from './file-reader.js';


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

const ROOM_NUMBER = {
  ONE_ROOM: 1,
  TWO_ROOMS: 2,
  THREE_ROOMS: 3,
  ONE_HUNDRED_ROOMS: 100,
};

const CAPACITY_VALUE = {
  ONE_GUEST: 1,
  TWO_GUESTS: 2,
  NOT_FOR_GUESTS: 0,
};

const adForm = document.querySelector('.ad-form');
const resetButton = adForm.querySelector('.ad-form__reset');

const title = adForm.querySelector('#title');
const price = adForm.querySelector('#price');
const type = adForm.querySelector('#type');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const capacityOptions = capacity.querySelectorAll('option');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

// Валидация заголовка объявления
const onTitleInput = () => {
  const titleValue = title.value.length;

  if (titleValue < MIN_TITLE_LENGTH) {
    title.setCustomValidity(`Должно быть больше ${MIN_TITLE_LENGTH} символов. Сейчас ${titleValue} сиволов.`);
  } else if (titleValue > MAX_TITLE_LENGTH) {
    title.setCustomValidity(`Должно быть меньше ${MAX_TITLE_LENGTH} символов. Сейчас ${titleValue} сиволов.`);
  } else {
    title.setCustomValidity('');
  }
};

// Валидация типа жилья
const onTypeChange = () => {
  const typeValue = type.value;
  price.setAttribute('min', TYPE_MIN_PRICE[typeValue]);
  price.setAttribute('placeholder', TYPE_MIN_PRICE[typeValue]);
};

// Валидация стоимости жилья
const onPriceInput = () => {
  const priceValue = +price.value;

  if (priceValue < price.getAttribute('min')) {
    price.setCustomValidity(`Стоимость должна быть больше ${price.getAttribute('min')}`);
  } else if (priceValue > price.getAttribute('max')) {
    price.setCustomValidity(`Стоимость должна быть меньше ${price.getAttribute('max')}`);
  } else {
    price.setCustomValidity('');
  }
};

// Наложение ограничений по вместимости жилья
const setCapacityDisabled = (roomValue) => {
  capacityOptions.forEach((option) => {
    option.setAttribute('disabled', 'disabled');
  });

  ROOM_CAPACITY[roomValue].forEach((capacityAmount) => {
    capacityOptions.forEach((option) => {
      if (+option.value === capacityAmount) {
        option.removeAttribute('disabled');
      }
    });
  });
};

// Валидации количества гостей
const validateCapacity = () => {
  const roomValue = +roomNumber.value;
  const capacityValue = +capacity.value;

  setCapacityDisabled(roomValue);

  if (roomValue === ROOM_NUMBER.ONE_ROOM && capacityValue !== CAPACITY_VALUE.ONE_GUEST) {
    capacity.setCustomValidity('Вместимость одной комнаты: 1 гость');
  } else if (roomValue === ROOM_NUMBER.TWO_ROOMS && capacityValue !== CAPACITY_VALUE.ONE_GUEST && capacityValue !== CAPACITY_VALUE.TWO_GUESTS) {
    capacity.setCustomValidity('Вместимость двух комнат: 1 или 2 гостя');
  } else if (roomValue === ROOM_NUMBER.THREE_ROOMS && capacityValue === CAPACITY_VALUE.NOT_FOR_GUESTS) {
    capacity.setCustomValidity('Вместимость трех комнат: 1, 2 или 3 гостя');
  } else if (roomValue === ROOM_NUMBER.ONE_HUNDRED_ROOMS && capacityValue !== CAPACITY_VALUE.NOT_FOR_GUESTS) {
    capacity.setCustomValidity('Сто комнат не предназначены для гостей. Возможен выбор: не для гостей');
  } else {
    capacity.setCustomValidity('');
  }
};

const onCapacityChange = () => {
  validateCapacity();
};

const onRoomNumberChange = () => {
  capacity.value = ROOM_CAPACITY[roomNumber.value][0];
  validateCapacity();
};

const onTimeInChange = (evt) => {
  timeOut.value = evt.target.value;
};

const onTimeOutChange = (evt) => {
  timeIn.value = evt.target.value;
};

// Сброс формы
const resetForm = () => {
  adForm.reset();
  resetFilters();
  removePreviews();
  // сами генерируем событие, чтобы поменялась отрисовка объявлений
  mapFilters.dispatchEvent(new Event('change'));
  setMainMarkerDefault();
};

const submitSuccess = () => {
  showMessage(true);
  resetForm();
};

const submitError = () => {
  showMessage(false);
};

// Обработчик при отправке формы
const onAdFormSubmit = (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);

  sendData(formData)
    .then(() => submitSuccess())
    .catch(() => submitError());
};

// Обработчик при сбросе формы
const onResetButtonClick = (evt) => {
  evt.preventDefault();
  resetForm();
};

// Добавление всех обработчиков
const addFormListeners = () => {
  title.addEventListener('input', onTitleInput);
  type.addEventListener('change', onTypeChange);
  price.addEventListener('input', onPriceInput);
  capacity.addEventListener('change', onCapacityChange); // на всякий случай валидируем
  roomNumber.addEventListener('change', onRoomNumberChange);
  timeIn.addEventListener('change', onTimeInChange);
  timeOut.addEventListener('change', onTimeOutChange);
  adForm.addEventListener('submit', onAdFormSubmit);
  resetButton.addEventListener('click', onResetButtonClick);
};

// Удаление всех обработчиков
const removeFormListeners = () => {
  title.removeEventListener('input', onTitleInput);
  price.removeEventListener('input', onPriceInput);
  capacity.removeEventListener('change', onCapacityChange); // на всякий случай валидируем
  roomNumber.removeEventListener('change', onRoomNumberChange);
  timeIn.removeEventListener('change', onTimeInChange);
  timeOut.removeEventListener('change', onTimeOutChange);
  adForm.removeEventListener('submit', onAdFormSubmit);
  resetButton.removeEventListener('click', onResetButtonClick);
};

// Инициализация форм
function initForms (...forms) {
  return function () {
    forms.forEach((form) => {
      const elementsForm =  form.children;
      form.classList.toggle(`${form.classList.item(0)}--disabled`);

      for (const element of elementsForm) {
        element.toggleAttribute('disabled');
      }

      // Добавление или удаление обработчиков событий для валидации формы
      if (form.classList.contains(`${form.classList.item(0)}--disabled`)) {
        removeFormListeners();
      }
      addFormListeners();
    });
  };
}

// Инициализация форм отпарвки объявления и фильтра
const initAdFilters = initForms(adForm, mapFilters);

export {initAdFilters};

