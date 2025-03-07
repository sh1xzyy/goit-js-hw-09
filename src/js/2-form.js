const refs = {
  form: document.querySelector('.feedback-form'),
};

let formData = { email: '', message: '' };

const saveFormData = data => {
  try {
    localStorage.setItem('feedback-form-state', JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

const loadFormData = () => {
  try {
    return JSON.parse(localStorage.getItem('feedback-form-state'));
  } catch (error) {
    console.log(error);
  }
};

const onLoadFormField = formFields => {
  const formDataFromLS = loadFormData();

  if (!formDataFromLS) return;

  formData = formDataFromLS;

  const formDataKeys = Object.keys(formDataFromLS);
  formDataKeys.forEach(key => (formFields[key].value = formData[key]));
};
onLoadFormField(refs.form);

const onFormFieldInput = ({ target }) => {
  formData[target.name] = target.value.trim();
  saveFormData(formData);
};

const onFormSubmit = event => {
  event.preventDefault();
  const { email, message } = event.target;

  if (!email.value.trim() || !message.value.trim())
    return alert('Fill please all fields');

  console.log(formData);
  localStorage.removeItem('feedback-form-state');
  event.currentTarget.reset();
};

refs.form.addEventListener('input', onFormFieldInput);
refs.form.addEventListener('submit', onFormSubmit);
