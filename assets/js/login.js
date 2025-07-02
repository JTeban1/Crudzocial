import { login } from '../js/auth.js';

/**
 * Attaches event listeners and handles login form submission after DOM content is loaded.
 */
document.addEventListener("DOMContentLoaded", () => {
  
  /**
   * Handles the login form submission.
   * @param {Event} e - The form submit event.
   */
  document.getElementById("loginForm").addEventListener("submit", async e => {
    e.preventDefault(); // Prevent default form submission behavior

    const email = e.target.email.value;       // Retrieve email from form input
    const password = e.target.password.value; // Retrieve password from form input

    /**
     * Attempts to log in the user using provided credentials.
     * @type {string|null} userId - The returned user ID if login is successful, otherwise null.
     */
    const userId = await login(email, password);

    if (userId) {
      // Redirect to menu page on successful login
      window.location.href = "pages/menu.html";
    } else {
      // Show alert if login fails
      alert("Invalid email or password.");
    }
  });
});
