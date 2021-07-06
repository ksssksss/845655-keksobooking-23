import {getAds} from './data.js';
import {initAdFilters} from './form.js';
import {getCard, renderCard} from './card.js';

const mapCanvas = document.querySelector('#map-canvas');
const dataForCards = getAds();

initAdFilters();
renderCard(mapCanvas, getCard(dataForCards[0]));
