import {getAds} from './data.js';
import {initAdFilters} from './form.js';
import {initMap} from './map.js';

const dataForCards = getAds();

initAdFilters();
initMap(dataForCards);
