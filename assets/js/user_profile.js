import {addLog, current}  from '../js/logic_logs.js';
import { hashPassword, protectPage }  from '../js/auth.js';

protectPage();

let index = localStorage.getItem('index')
let userData = JSON.parse(localStorage.getItem('users'));

const form = document.getElementById('user-form');

function changePlaceholder() {
  document.getElementById('firstName').placeholder = userData[index].firstName;
  document.getElementById('lastName').placeholder = userData[index].lastName;
  document.getElementById('email').placeholder = userData[index].email;
  document.getElementById('phone').placeholder = userData[index].phone;
  document.getElementById('country').placeholder = userData[index].country;
  document.getElementById('city').placeholder = userData[index].city;
}

changePlaceholder()

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  const confirmado = confirm('¿Estás seguro de que deseas guardar los cambios?');

  if (!confirmado) {
    form.reset();
    return;
  }

  const formData = new FormData(this);
  const user = {};

  for (const [key, value] of formData.entries()) {    
    user[key] = value;
  }

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
  
  const fieldsToCompare = ['firstName', 'lastName', 'email', 'phone', 'country', 'city'];

  for (const field of fieldsToCompare) {
    if (user[field] !== userData[index][field]) {
      userData[index][field] = user[field];
    }
  }  

  localStorage.removeItem('users');
  localStorage.setItem('users', JSON.stringify(userData));
  
  changePlaceholder();
  addLog("Cambio en los datos de usuario", current());
  alert("Perfil cambiado correctamente.");
  form.reset();
  
});