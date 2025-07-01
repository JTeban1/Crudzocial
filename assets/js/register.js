import { getUsers, saveUser }  from '../js/auth.js';

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("registerForm").addEventListener("submit", handleRegistration);
});

/**
 * Handles the user registration form submission.
 * Prevents the default form submission, validates passwords,
 * creates a user object from the form, and registers the user asynchronously.
 *
 * @param {Event} e - The form submission event.
 * @returns {Promise<void>}
 */
async function handleRegistration(e) {
  e.preventDefault();
  const form = e.target;
  
  if (!validatePasswords(form)) return;
  
  const user = createUserObject(form);
  await registerUser(user);
}

/**
 * Validates that the password and confirm password fields in a form match.
 *
 * @param {HTMLFormElement} form - The form element containing password fields.
 * @returns {boolean} Returns true if passwords match, otherwise false.
 */
function validatePasswords(form) {
  const password = form.password.value;
  const confirmPassword = form.confirmPassword.value;
  
  if (password !== confirmPassword) {
    alert("Las contraseñas no son iguales.");
    return false;
  }
  return true;
}

/**
 * Creates a new user object from the provided form data.
 *
 * @param {HTMLFormElement} form - The form element containing user input fields.
 * @returns {Object} The newly created user object with properties: id, nombres, apellidos, email, telefono, pais, ciudad, and password.
 */
function createUserObject(form) {
  const users = getUsers();
  const nextId = users.length > 0 ? Math.max(...users.map(u => u.id || 0)) + 1 : 1;
  
  return {
    id: nextId,
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    email: form.email.value,
    phone: form.phone.value,
    country: form.country.value,
    city: form.city.value,
    password: form.password.value,
    logs: [],
    imgs: [],
    notes: []
  };
}

/**
 * Registers a new user by saving their information and redirecting to the login page upon success.
 *
 * @async
 * @function
 * @param {Object} user - The user object containing registration details.
 * @returns {Promise<void>} Resolves when the registration process is complete.
 */
async function registerUser(user) {
  await saveUser(user);
  alert("Registro realizado correctamente, ¡ya puedes iniciar sesión!");
  window.location.href = "../index.html";
}