import {addLog, current}  from '../js/logic_logs.js';

/**
 * Retrieves the list of users from localStorage.
 *
 * @returns {Array} An array of user objects stored in localStorage under the key "users".
 *                  Returns an empty array if no users are found.
 */
export function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}


/**
 * Hashes a plain text password using SHA-256 cryptographic algorithm.
 * 
 * This function converts a plain text password into a secure hash using the Web Crypto API.
 * The password is first encoded to UTF-8 bytes, then hashed using SHA-256, and finally
 * converted to a hexadecimal string representation for storage.
 * 
 * @async
 * @param {string} password - The plain text password to be hashed.
 * @returns {Promise<string>} A promise that resolves to a hexadecimal string representation
 *                           of the SHA-256 hash of the input password.
 * @throws {Error} Throws an error if the Web Crypto API is not available or if hashing fails.
 * 
 * @example
 * const hashedPassword = await hashPassword("mySecretPassword123");
 * console.log(hashedPassword); // "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3"
 */
export async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Checks if a user with the specified email exists in the users list.
 *
 * @param {string} email - The email address to check for existence.
 * @returns {boolean} True if a user with the given email exists, false otherwise.
 */
function emailExists(email) {
  const users = getUsers();
  return users.some(user => user.email.toLowerCase() === email.toLowerCase());
}

/**
 * Saves a new user to localStorage after performing validation and security processing.
 * 
 * This function validates that the email is unique, hashes the user's password for security,
 * and then stores the user in the localStorage users array. If the email already exists,
 * it displays an alert and returns false without saving the user.
 * 
 * @async
 * @param {Object} user - The user object to be saved.
 * 
 * @returns {Promise<boolean>} Returns true if the user was successfully saved, 
 *                            false if the email already exists.
 * 
 * @example
 * const newUser = {
 *   id: 1,
 *   firstName: "Juan",
 *   lastName: "Pérez",
 *   email: "juan@example.com",
 *   phone: "555-1234",
 *   country: "Colombia",
 *   city: "Bogotá",
 *   password: "myPassword123",
 *   logs: [],
 *   imgs: [],
 *   notes: []
 * }; 
 */
export async function saveUser(user) {
  //Check for duplicate email before saving
  if (emailExists(user.email)) {
    alert("Este email ya está registrado, por favor usa otro.")
    return false
  }
  else {
    user.password = await hashPassword(user.password);
    const users = getUsers();
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    return true
  }
}

/**
 * Attempts to log in a user by verifying the provided email and password against stored users in localStorage.
 * 
 * @async
 * @param {string} email - The user's email address.
 * @param {string} password - The user's plain text password.
 * @returns {Promise<boolean>} Returns true if login is successful, otherwise false.
 */
export async function login(email, password) {
  const hashedPassword = await hashPassword(password);
  if (!localStorage.getItem('users')) {
    
  }else{
    let usersList = JSON.parse(localStorage.getItem("users"));
    let flag = false;

    for (let index = 0; index < usersList.length; index++) {
      if (usersList[index].email === email) {
        if (usersList[index].password === hashedPassword) {
            let indicator = index;
            localStorage.setItem("index", indicator);
            addLog("Inicio de sesión", current());
            return true;
        }
      }
    }

    if (flag === false) {
      return false;
    }
  }
}

/**
 * Checks if the user is currently logged in by verifying the presence of the "loggedIn" item in localStorage.
 *
 * @returns {boolean} Returns true if the user is logged in, otherwise false.
 */
function isLoggedIn() {
  return !!localStorage.getItem("index");
}

/**
 * Redirects the user to the login page if they are not authenticated.
 * Checks the user's login status using the isLoggedIn() function.
 * If the user is not logged in, navigates to "../index.html".
 */
export function protectPage() {
  if (!isLoggedIn()) {
    window.location.href = "../../index.html";
  }
}

