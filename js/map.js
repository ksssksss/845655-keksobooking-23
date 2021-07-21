import {initAdFilters} from './form.js';
import {getCard} from './card.js';
import {getData} from './fetch.js';
import {getCurrentFilter, filterAll} from './filters.js';
import {debounce} from './utils/debounce.js';
import {compareFeatures} from './sort.js';
import {uploadPreviews} from './file-reader.js';
import '../leaflet/leaflet-messagebox.js'; // Leaflet-плагин для отображения сообщений

const TOKYO_LAT = 35.681700;
const TOKYO_LNG = 139.753891;
const MAIN_MARKER_WIDTH = 52;
const MAIN_MARKER_HEIGHT = 52;
const MARKER_WIDTH = 40;
const MARKER_HEIGHT = 40;

const address = document.querySelector('#address');
const mapFilters = document.querySelector('.map__filters');

// Контейнер все маркеров объявлений
let markers = [];

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
const showMapMessage = (message) => {
  map.messagebox.show(message);
};

// Удаление сообщения на карте
const removeMapMessage = () => {
  map.messagebox.hide();
};

// Удаление всех маркеров объявлений
const removeMarkers = (allMarkers) => {
  allMarkers.forEach((marker) => marker.remove());
};

// Добавление слоя Mapbox Streets
const setTitleLayer = () => {
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

// Добавление главного маркера на карту и изменнение значений lat, lng при его перемещении
const addMainMarker = () => {
  mainMarker.on('move', (evt) => {
    const coordinates = evt.target.getLatLng();
    address.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
  });

  mainMarker.addTo(map);
};

// Перевод главного маркера в начальное состояние
const setMainMarkerDefault = () => {
  mainMarker.setLatLng(L.latLng(TOKYO_LAT, TOKYO_LNG));
  const mainCoordinates = mainMarker.getLatLng();
  address.value = `${mainCoordinates.lat.toFixed(5)}, ${mainCoordinates.lng.toFixed(5)}`;
};

// Добавление маркеры отфильтрованных объявлений на карту
const addMarkers = (ads, filter) => {
  const compareFeaturesFilter = compareFeatures(filter);

  if (markers.length) {
    removeMarkers(markers);
    markers = [];
  }

  ads
    .slice()
    .filter((ad) => filterAll(ad, filter))
    .sort(compareFeaturesFilter)
    .slice(0, 10)
    .forEach((ad) => {
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
      markers.push(marker);
    });
};

// Действия при загрузке карты
const onLoadMap = () => {
  const mainCoordinates = mainMarker.getLatLng();
  addMainMarker();
  initAdFilters();
  uploadPreviews();
  address.value = `${mainCoordinates.lat.toFixed(5)}, ${mainCoordinates.lng.toFixed(5)}`;
  getData()
    .then((data) => {
      addMarkers(data, getCurrentFilter());
      mapFilters.addEventListener('change', (evt) => {
        debounce(addMarkers(data, getCurrentFilter(evt)), 500);
      });
    });
};

// Инициализация карты и добавление всех меток
const initMap = () => {
  map
    .on('load', onLoadMap)
    .setView([TOKYO_LAT, TOKYO_LNG], 13);

  setTitleLayer();
};

export {initMap, setMainMarkerDefault, showMapMessage, removeMapMessage};

