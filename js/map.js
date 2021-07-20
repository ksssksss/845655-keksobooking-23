import {initAdFilters} from './form.js';
import {getCard} from './card.js';
import '../leaflet/leaflet-messagebox.js'; // Leaflet-плагин для отображения сообщений

const TOKYO_LAT = 35.681700;
const TOKYO_LNG = 139.753891;
const MAIN_MARKER_WIDTH = 52;
const MAIN_MARKER_HEIGHT = 52;
const MARKER_WIDTH = 40;
const MARKER_HEIGHT = 40;

const address = document.querySelector('#address');

// Иконка для главной метки
const mainMarkerIcon = L.icon(
  {
    iconUrl: 'img/main-pin.svg',
    iconSize: [MAIN_MARKER_HEIGHT, MAIN_MARKER_WIDTH],
    iconAnchor: [MAIN_MARKER_HEIGHT/2, MAIN_MARKER_WIDTH],
  },
);

// Иконка для метки похожего объявления
const markerIcon = L.icon(
  {
    iconUrl: 'img/pin.svg',
    iconSize: [MARKER_HEIGHT, MARKER_WIDTH],
    iconAnchor: [MARKER_HEIGHT/2, MARKER_WIDTH],
  },
);

// Главная метка
const mainMarker = L.marker(
  {
    lat: TOKYO_LAT,
    lng: TOKYO_LNG,
  },
  {
    draggable: true,
    icon: mainMarkerIcon,
  },
);

// Объявление карты c messagebox для отображения серверных ошибок
const map = L.map('map-canvas', { 'messagebox': true });

// Отображение сообщения на карте
function showMapMessage (message) {
  map.messagebox.show(message);
}

// Удаление сообщения на карте
function removeMapMessage () {
  map.messagebox.hide();
}

// Добавление слоя Mapbox Streets
function setTitleLayer() {
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
}

// Добавление главного маркера на карту и изменнение значений lat, lng при его перемещении
function addMainMarker() {
  mainMarker.on('move', (evt) => {
    const coordinates = evt.target.getLatLng();
    address.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
  });

  mainMarker.addTo(map);
}

// Перевод главного маркера в наальное состояние
function setMainMarkerDefault () {
  mainMarker.setLatLng(L.latLng(TOKYO_LAT, TOKYO_LNG));
}

// Добавление маркеров похожих объявлений на карту
function addMarkers(ads) {
  ads.forEach((ad) => {
    const marker = L.marker(
      {
        lat: ad.location.lat,
        lng: ad.location.lng,
      },
      {
        markerIcon,
      },
    );

    marker
      .addTo(map)
      .bindPopup(getCard(ad));
  });
}

// Инициализация карты и добавление всех меток
function initMap(ads) {
  setTitleLayer();
  map
    .on('load', () => {
      const mainCoordinates = mainMarker.getLatLng();
      initAdFilters();
      address.value = `${mainCoordinates.lat.toFixed(5)}, ${mainCoordinates.lng.toFixed(5)}`;
    })
    .setView([TOKYO_LAT, TOKYO_LNG], 13);

  addMainMarker();
  addMarkers(ads);
}

export {initMap, setMainMarkerDefault, showMapMessage, removeMapMessage};

