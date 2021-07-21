import {showMapMessage} from '../js/map.js';

const URL_GET = 'https://23.javascript.pages.academy/keksobooking/data';
const URL_POST = 'https://23.javascript.pages.academy/keksobooking';

const getData = () => {
  const data = fetch(URL_GET)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((response) => response.json())
    .catch((err) => showMapMessage(`Ошибка сервера: ${err}. Данные не загрузились.`));
  return data;
};

const sendData = (body) => {
  const data = fetch(URL_POST,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => response.ok ? Promise.resolve() : Promise.reject());
  return data;
};

export {getData, sendData};
