const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

const showError = function (element, message) {
  const formControl = element.parentElement;
  formControl.classList.add('error');
  formControl.classList.remove('success');
  formControl.querySelector('small').innerText = message;
};

const showSuccess = function (element) {
  const formControl = element.parentElement;
  formControl.classList.remove('error');
  formControl.classList.add('success');
};

const getElementName = function (element) {
  return element.id.at(0).toUpperCase() + element.id.slice(1);
};

const validateEmail = email => {
  const re = String(email.value.trim())
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

  if (re) {
    showSuccess(email);
  } else {
    showError(email, 'Enter valid email');
  }
};

const checkRequired = function (inputs) {
  inputs.forEach(input => {
    if (input.value.trim().length === 0) {
      showError(input, 'This field is required');
    } else {
      showSuccess(input);
    }
  });
};

const checkLength = function (input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getElementName(input)} must be more than ${min} characters`,
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getElementName(input)} must be at most ${max} characters`,
    );
  } else {
    showSuccess(input);
  }
};

const checkMatch = function (input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, `${getElementName(input2)} doesnot match`);
  }
};

form.addEventListener('submit', function (e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 6, 32);
  checkLength(password, 8, 32);
  validateEmail(email);
  checkMatch(password, password2);
});
