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
    alert("Passwords do not match.");
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
    nombres: form.nombres.value,
    apellidos: form.apellidos.value,
    email: form.email.value,
    telefono: form.telefono.value,
    pais: form.pais.value,
    ciudad: form.ciudad.value,
    password: form.password.value
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
  alert("Registration successful! You can now log in.");
  window.location.href = "../index.html";
}