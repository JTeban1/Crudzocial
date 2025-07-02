import { addLog, current } from '../js/logic_logs.js';

/**
 * Logout button in the navigation bar.
 * @type {HTMLElement}
 */
const logoutNav = document.getElementById('logoutNav');

/**
 * Logout button in the menu (if present).
 * @type {HTMLElement|null}
 */
const logoutMenu = document.getElementById('logoutMenu');

/**
 * Handles logout event from the navigation bar.
 * Logs the action, clears the user session, and redirects to the home page.
 */
logoutNav.addEventListener('click', function (e) {
  e.preventDefault(); // Prevent default link behavior
  addLog("Cerraste sesión", current()); // Log the logout action
  localStorage.removeItem('index'); // Clear session or user identifier
  window.location.href = "./index.html"; // Redirect to login/home page
});

/**
 * Handles logout event from the menu (if the element exists).
 * Logs the action, clears the user session, and redirects to the home page.
 */
if (logoutMenu) {
  logoutMenu.addEventListener('click', function (e) {
    e.preventDefault();
    addLog("Cerraste sesión", current());
    localStorage.removeItem('index');
    window.location.href = "./index.html";
  });
}
