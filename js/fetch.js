import {showMapMessage} from '../js/map.js';

const URL_GET = 'https://23.javascript.pages.academy/keksobooking/data';
const URL_POST = 'https://23.javascript.pages.academy/keksobooking';

function getData () {
  return fetch(URL_GET)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((response) => response.json())
    .catch((err) => showMapMessage(`Ошибка сервера: ${err}. Данные не загрузились.`));
}

function sendData (body) {
  return fetch(URL_POST,
    {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
      body,
    },
  )
    .then((response) => response.ok ? Promise.resolve() : Promise.reject());
}

export {getData, sendData};
