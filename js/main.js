import {getAds} from './data.js';
import {getCards} from './card.js';

const mapCanvas = document.querySelector('#map-canvas');
const similarCards = getAds();
const cards = getCards(similarCards);

mapCanvas.appendChild(cards.children[0]);
