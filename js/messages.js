const mainTag = document.querySelector('main');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

// Обработчик клавищи Esc
const isEscEvent = (evt) => {
  const keyEsc = evt.key === 'Escape' || evt.key === 'Esc';
  return keyEsc;
};

// Обработчик нажатия на сообщение
const onMessageClick = () => {
  removeMessage();
};

// Обработчик нажатия Esc при открытом сообщении
const onMessageEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    removeMessage();
  }
};

// Функции объявлены декларативно для создания их интерпретатором до выполнения кода

function removeMessage () {
  mainTag.removeChild(mainTag.lastChild);
  document.removeEventListener('click', onMessageClick);
  document.removeEventListener('keydown', onMessageEscKeydown);
}

function showMessage (status) {
  let element = errorTemplate.cloneNode(true);

  if (status) {
    element = successTemplate.cloneNode(true);
  }

  element.style.zIndex = 1000;
  mainTag.appendChild(element);
  document.addEventListener('click', onMessageClick, { once: true });
  document.addEventListener('keydown', onMessageEscKeydown, { once: true });
}

export {showMessage};
