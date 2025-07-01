export function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

export async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function saveUser(user) {
  user.password = await hashPassword(user.password);
  const users = getUsers();
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  return user.id;
}

/**
 * Authenticates a user by email and password.
 * 
 * @async
 * @param {string} email - The user's email address.
 * @param {string} password - The user's plain text password.
 * @returns {Promise<number|boolean>} The user's ID if authentication is successful, otherwise false.
 */
export async function login(email, password) {
  const hashedPassword = await hashPassword(password);
  if (!localStorage.getItem('users')) {
    
  }else{
    let usersList = JSON.parse(localStorage.getItem("users"));
    console.log(usersList);
    let flag = false;

    for (let index = 0; index < usersList.length; index++) {
      if (usersList[index].email === email) {
        if (usersList[index].password === hashedPassword) {
            let indicator = index;
            localStorage.setItem("index", indicator);
            return true;
        }
      }
    }

    if (flag === false) {
      return false;
    }
  }
  
}

// /**
//  * Logs out the current user by removing the "loggedIn" item from localStorage.
//  * This effectively ends the user's session on the client side.
//  */
// function logout() {
//   localStorage.removeItem("loggedIn");
// }

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

