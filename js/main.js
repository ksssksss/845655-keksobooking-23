import {initAdFilters} from './form.js';
import {initMap} from './map.js';
import {getData} from './fetch.js';
// import {showServerError} from './messages.js';


initAdFilters();

const dataForCards = getData();
dataForCards.then((data) => initMap(data));

