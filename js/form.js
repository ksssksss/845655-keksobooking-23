const adForm = document.querySelector('.ad-form');
const filters = document.querySelector('.map__filters');

function initForms () {
  const forms = arguments;
  return function () {
    for (let i = 0; i < forms.length; i++) {
      const elementsForm =  forms[i].children;
      forms[i].classList.toggle(`${forms[i].classList.item(0)}--disabled`);

      for (const element of elementsForm) {
        element.toggleAttribute('disabled');
      }
    }
  };
}

const initAdFilters = initForms(adForm, filters);

export {initAdFilters};
