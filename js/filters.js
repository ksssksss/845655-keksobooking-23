const mapFilters = document.querySelector('.map__filters');

const PRICE_VALUE = {
  LOW: 10000,
  HIGH: 50000,
};

const selectedFilter = {
  type: 'any',
  price: 'any',
  rooms: 'any',
  guests: 'any',
  features: [],
};

const filterByType = (data, filterType) => filterType === 'any' || data.offer.type === filterType;
const filterByRooms = (data, filterRooms) => filterRooms === 'any' || data.offer.rooms === +filterRooms;
const filterByGuests = (data, filterGuests) => filterGuests === 'any' || data.offer.guests === +filterGuests;
const filterByPrice = (data, filterPrice) => {
  switch (filterPrice) {
    case 'any':
      return true;
    case 'middle':
      return data.offer.price >= PRICE_VALUE.LOW && data.offer.price <= PRICE_VALUE.HIGH;
    case 'low':
      return data.offer.price < PRICE_VALUE.LOW;
    case 'high':
      return data.offer.price > PRICE_VALUE.HIGH;
  }
};

const filterAll = (data, filter) => {
  const currentFilter = filterByType(data, filter.type) && filterByPrice(data, filter.price) && filterByRooms(data, filter.rooms) &&
  filterByGuests(data, filter.guests);
  return currentFilter;
};

const resetFilters = () => {
  selectedFilter.type = 'any';
  selectedFilter.price = 'any';
  selectedFilter.rooms = 'any';
  selectedFilter.guests = 'any';
  selectedFilter.features = [];
  mapFilters.reset();
};

const getCurrentFilter = (changeFilter) => {
  if (changeFilter) {
    switch(changeFilter.target.id) {
      case 'housing-type':
        selectedFilter.type = changeFilter.target.value;
        break;
      case 'housing-price':
        selectedFilter.price = changeFilter.target.value;
        break;
      case 'housing-rooms':
        selectedFilter.rooms = changeFilter.target.value;
        break;
      case 'housing-guests':
        selectedFilter.guests = changeFilter.target.value;
        break;
      default:
        if (selectedFilter.features.includes(changeFilter.target.value)) {
          const index = selectedFilter.features.findIndex((value) => value === changeFilter.target.value);
          selectedFilter.features.splice(index, 1);
        } else {
          selectedFilter.features.push(changeFilter.target.value);
        }
        break;
    }
  }
  return selectedFilter;
};

export {getCurrentFilter, resetFilters, filterAll};
