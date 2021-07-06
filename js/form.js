const adForm = document.querySelector('.ad-form');
const filters = document.querySelector('.map__filters');

function initForms (...forms) {
  return function () {
    forms.forEach((form) => {
      const elementsForm =  form.children;
      form.classList.toggle(`${form.classList.item(0)}--disabled`);

      for (const element of elementsForm) {
        element.toggleAttribute('disabled');
      }
    });
  };
}

const initAdFilters = initForms(adForm, filters);

export {initAdFilters};
