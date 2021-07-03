import {getAds} from './data.js';
import {getCard, renderCard} from './card.js';

const mapCanvas = document.querySelector('#map-canvas');
const dataForCards = getAds();

renderCard(mapCanvas, getCard(dataForCards[0]));
