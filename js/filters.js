const PRICE_VALUE = {
  LOW: 10000,
  HIGH: 50000,
};

const FILTER_FIELDS = {
  TYPE: 'housing-type',
  PRICE: 'housing-price',
  ROOMS: 'housing-rooms',
  GUESTS: 'housing-guests',
  FEATURES: 'housing-features',
};

const FILTER_VALUE = {
  ANY: 'any',
  MIDDLE: 'middle',
  LOW: 'low',
  HIGH: 'high',
};

const mapFilters = document.querySelector('.map__filters');

// Контейнер для выбранного фильтра
const selectedFilter = {
  type: FILTER_VALUE.ANY,
  price: FILTER_VALUE.ANY,
  rooms: FILTER_VALUE.ANY,
  guests: FILTER_VALUE.ANY,
  features: [],
};

const filterByType = (data, filterType) => filterType === FILTER_VALUE.ANY || data.offer.type === filterType;
const filterByRooms = (data, filterRooms) => filterRooms === FILTER_VALUE.ANY || data.offer.rooms === +filterRooms;
const filterByGuests = (data, filterGuests) => filterGuests === FILTER_VALUE.ANY || data.offer.guests === +filterGuests;
const filterByPrice = (data, filterPrice) => {
  switch (filterPrice) {
    case FILTER_VALUE.ANY:
      return true;
    case FILTER_VALUE.MIDDLE:
      return data.offer.price >= PRICE_VALUE.LOW && data.offer.price <= PRICE_VALUE.HIGH;
    case FILTER_VALUE.LOW:
      return data.offer.price < PRICE_VALUE.LOW;
    case FILTER_VALUE.HIGH:
      return data.offer.price > PRICE_VALUE.HIGH;
  }
};

// Фильтрация объявлений по преимуществам
const filterByFeatures = (data, filterFeatures) => {
  // console.log(filterFeatures);
  if (data.offer.features) {
    for (let i = 0; i < filterFeatures.length; i++) {
      if(!data.offer.features.includes(filterFeatures[i])) {
        return false;
      }
    }
    return true;
  } else if (filterFeatures.length === 0) {
    return true;
  }
  return false;
};

// Фильтрация объявлений по всем критериям
const filterAll = (data, filter) => {
  const currentFilter = filterByType(data, filter.type) && filterByPrice(data, filter.price) && filterByRooms(data, filter.rooms) &&
  filterByGuests(data, filter.guests) && filterByFeatures(data, filter.features);
  return currentFilter;
};

// Сброс фильтра
const resetFilters = () => {
  selectedFilter.type = FILTER_VALUE.ANY;
  selectedFilter.price = FILTER_VALUE.ANY;
  selectedFilter.rooms = FILTER_VALUE.ANY;
  selectedFilter.guests = FILTER_VALUE.ANY;
  selectedFilter.features = [];
  mapFilters.reset();
};

// Получение текущего фильтра
const getCurrentFilter = (changeFilter) => {
  if (changeFilter) {
    switch(changeFilter.target.id) {
      case FILTER_FIELDS.TYPE:
        selectedFilter.type = changeFilter.target.value;
        break;
      case FILTER_FIELDS.PRICE:
        selectedFilter.price = changeFilter.target.value;
        break;
      case FILTER_FIELDS.ROOMS:
        selectedFilter.rooms = changeFilter.target.value;
        break;
      case FILTER_FIELDS.GUESTS:
        selectedFilter.guests = changeFilter.target.value;
        break;
      default:
        if (changeFilter.target.value) {
          if (selectedFilter.features.includes(changeFilter.target.value)) {
            const index = selectedFilter.features.findIndex((value) => value === changeFilter.target.value);
            selectedFilter.features.splice(index, 1);
          } else {
            selectedFilter.features.push(changeFilter.target.value);
          }
        }
        break;
    }
  }
  return selectedFilter;
};

export {getCurrentFilter, resetFilters, filterAll, mapFilters};
