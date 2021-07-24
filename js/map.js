import {initAdFilters} from './form.js';
import {getCard} from './card.js';
import {getData} from './fetch.js';
import {getCurrentFilter, filterAll, mapFilters} from './filters.js';
import {debounce} from './utils/debounce.js';
import {uploadPreviews} from './file-reader.js';
import '../leaflet/leaflet-messagebox.js'; // Leaflet-плагин для отображения сообщений

const TOKYO_LAT = 35.681700;
const TOKYO_LNG = 139.753891;
const COORDINATE_DIGIT = 5;

const MAIN_MARKER_WIDTH = 52;
const MAIN_MARKER_HEIGHT = 52;
const MARKER_WIDTH = 40;
const MARKER_HEIGHT = 40;

const MAP_ZOOM = 13;

// Количество выводимых объявлений на карту
const AD_COUNT = 10;

// Задержка для устранения дребезга
const DEBOUNCE_DELAY = 500;

const address = document.querySelector('#address');
// const mapFilters = document.querySelector('.map__filters');

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
    address.value = `${coordinates.lat.toFixed(COORDINATE_DIGIT)}, ${coordinates.lng.toFixed(COORDINATE_DIGIT)}`;
  });

  mainMarker.addTo(map);
};

// Перевод главного маркера в начальное состояние
const setMainMarkerDefault = () => {
  mainMarker.setLatLng(L.latLng(TOKYO_LAT, TOKYO_LNG));
  const mainCoordinates = mainMarker.getLatLng();
  address.value = `${mainCoordinates.lat.toFixed(COORDINATE_DIGIT)}, ${mainCoordinates.lng.toFixed(COORDINATE_DIGIT)}`;
};

// Добавление маркеры отфильтрованных объявлений на карту
const addMarkers = (ads, filter) => {
  const filteredAds = [];

  if (markers.length) {
    removeMarkers(markers);
    markers = [];
  }

  for (let i = 0; i < ads.length; i++) {
    if (filterAll(ads[i], filter) && filteredAds.length < AD_COUNT) {
      filteredAds.push(ads[i]);
    }
  }

  filteredAds.forEach((ad) => {
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

// Устранение дребезга при изменении фильтра
const onFiltersChange = debounce(addMarkers, DEBOUNCE_DELAY);

// Действия при загрузке карты
const onLoadMap = () => {
  const mainCoordinates = mainMarker.getLatLng();
  addMainMarker();
  initAdFilters();
  uploadPreviews();
  address.value = `${mainCoordinates.lat.toFixed(COORDINATE_DIGIT)}, ${mainCoordinates.lng.toFixed(COORDINATE_DIGIT)}`;
  getData()
    .then((data) => {
      addMarkers(data, getCurrentFilter());
      mapFilters.addEventListener('change', (evt) => {
        onFiltersChange(data, getCurrentFilter(evt));
      });
    });
};

// Инициализация карты и добавление всех меток
const initMap = () => {
  map
    .on('load', onLoadMap)
    .setView([TOKYO_LAT, TOKYO_LNG], MAP_ZOOM);

  setTitleLayer();
};

export {initMap, setMainMarkerDefault, showMapMessage, removeMapMessage};

