import throttle from 'lodash.throttle';
const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
};

populateEmailAndTextarea();

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

let formData = {};

function onFormInput(event) {
  formData[event.target.name] = event.target.value.trim();

  saveDataToLocalStorage(formData);
}

function onFormSubmit(event) {
  event.preventDefault();

  console.log(getDataFromLocalStorage());

  event.target.reset();
  removeDataFromLocaleStorage();
}

function saveDataToLocalStorage(formData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function removeDataFromLocaleStorage() {
  localStorage.removeItem(STORAGE_KEY);
}

function getDataFromLocalStorage() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      return JSON.parse(savedData);
    } else {
      return {};
    }
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}

function populateEmailAndTextarea() {
  const parsedData = getDataFromLocalStorage();

  Object.entries(parsedData).forEach(
    ([key, value]) => (refs.form[key].value = value)
  );
}
