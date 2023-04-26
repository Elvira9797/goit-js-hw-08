import throttle from 'lodash.throttle';
const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('[name="email"]'),
  message: document.querySelector('[name="message"]'),
};

populateEmailAndTextarea();

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

function onFormInput() {
  const formElements = refs.form.elements;
  const dataForm = {
    email: formElements.email.value,
    message: formElements.message.value,
  };

  saveDataToLocalStorage(dataForm);
}

function onFormSubmit(event) {
  event.preventDefault();

  const formElements = event.target.elements;

  console.log({
    email: formElements.email.value,
    message: formElements.message.value,
  });

  event.target.reset();
  removeDataFromLocaleStorage();
}

function saveDataToLocalStorage(dataForm) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataForm));
}

function removeDataFromLocaleStorage() {
  localStorage.removeItem(STORAGE_KEY);
}

function populateEmailAndTextarea() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    const parcedObj = JSON.parse(savedData);
    refs.email.value = parcedObj.email;
    refs.message.value = parcedObj.message;
  }
}
