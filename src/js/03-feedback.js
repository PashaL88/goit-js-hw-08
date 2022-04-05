import throttle from 'lodash.throttle';

const contactFormEl = document.querySelector('.feedback-form');
const LOCAL_STORAGE_KEY = 'feedback-form-state';

const contactFormSaves = form => {
  const contactFormElements = form.elements;
  const contactDataFromLocalStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

  if (!contactDataFromLocalStorage) {
    return;
  }

  const keys = Object.keys(contactDataFromLocalStorage);
  for (const key of keys) {
    contactFormElements[key].value = contactDataFromLocalStorage[key];
  }
};

const onContactFormElementChange = event => {
  const { target } = event;
  const contactFormElementName = target.name;
  const contactFormElementValue = target.value;

  const formDataFromLocalStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};

  formDataFromLocalStorage[contactFormElementName] = contactFormElementValue;

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formDataFromLocalStorage));
};

const onContactFOrmSubmit = event => {
  event.preventDefault();
  event.target.reset();
  console.log(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)));
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};

contactFormEl.addEventListener('change', throttle(onContactFormElementChange, 500));
contactFormEl.addEventListener('submit', onContactFOrmSubmit);
contactFormSaves(contactFormEl);
