import { addLog, current } from '../js/logic_logs.js';
import { hashPassword, protectPage } from '../js/auth.js';

/**
 * Protects the page from unauthorized access.
 * Typically checks if the user is authenticated; redirects if not.
 */
protectPage();

// Retrieve the current user's index and data from localStorage
let index = localStorage.getItem('index');
let userData = JSON.parse(localStorage.getItem('users'));

// Reference to the user profile form
const form = document.getElementById('user-form');

/**
 * Sets placeholder values in the form inputs
 * based on the currently stored user data.
 */
function changePlaceholder() {
  document.getElementById('firstName').placeholder = userData[index].firstName;
  document.getElementById('lastName').placeholder = userData[index].lastName;
  document.getElementById('email').placeholder = userData[index].email;
  document.getElementById('phone').placeholder = userData[index].phone;
  document.getElementById('country').placeholder = userData[index].country;
  document.getElementById('city').placeholder = userData[index].city;
}

// Initialize placeholders on page load
changePlaceholder();

/**
 * Handles the form submission for updating user profile data.
 * - Confirms the user action.
 * - Hashes passwords if provided and checks for equality.
 * - Updates only changed fields in localStorage.
 * - Logs the change and resets the form.
 */
form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const confirmed = confirm('¿Estás seguro de que deseas guardar los cambios?');

  if (!confirmed) {
    form.reset();
    return;
  }

  const formData = new FormData(this);
  const user = {};

  // Convert FormData to a plain object
  for (const [key, value] of formData.entries()) {
    user[key] = value;
  }

  // Handle password update, if provided
  if (user.password && user.confirmPass) {
    const passHash = await hashPassword(user.password);
    const confirmHash = await hashPassword(user.confirmPass);

    if (passHash === confirmHash) {
      userData[index].password = passHash;
    } else {
      alert('Las contraseñas no son iguales');
      return;
    }
  }

  // Update only the changed fields
  const fieldsToCompare = ['firstName', 'lastName', 'email', 'phone', 'country', 'city'];
  for (const field of fieldsToCompare) {
    if (user[field] && user[field] !== userData[index][field]) {
      userData[index][field] = user[field];
    }
  }

  // Save updated data in localStorage
  localStorage.setItem('users', JSON.stringify(userData));

  // Refresh placeholders and add log entry
  changePlaceholder();
  addLog("Cambio en los datos de usuario", current());

  alert("Perfil cambiado correctamente.");
  form.reset();
});
