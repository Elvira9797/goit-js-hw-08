import throttle from 'lodash.throttle';
const STORAGE_KEY = 'feedback-form-state';
const formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('[name="email"]'),
  message: document.querySelector('[name="message"]'),
};

populateEmailAndTextarea();

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

function onFormInput(event) {
  formData[event.target.name] = event.target.value;
  saveDataToLocalStorage(formData);
}

function onFormSubmit(event) {
  event.preventDefault();

  const parcedData = getDatafromLocalStorage();
  if (!parcedData) {
    return;
  }
  console.log(parcedData);

  event.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function saveDataToLocalStorage(formData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateEmailAndTextarea() {
  const parsedData = getDatafromLocalStorage();

  if (!parsedData) {
    return;
  }

  refs.email.value = parsedData.email;
  refs.message.value = parsedData.message;
}

function getDatafromLocalStorage() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    return JSON.parse(savedData);
  }
}
