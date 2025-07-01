import {addLog, current}  from '../js/logic_logs.js';
import { hashPassword }  from '../js/auth.js';


// Lista de los usuarios
let index = localStorage.getItem('index')
let userData = JSON.parse(localStorage.getItem('users'));
console.log(userData);

// Obtener formulario

const form = document.getElementById('user-form');

function changePlaceholder() {
  document.getElementById('firstName').placeholder = userData[index].nombres;
  document.getElementById('lastName').placeholder = userData[index].apellidos;
  document.getElementById('email').placeholder = userData[index].email;
  document.getElementById('phone').placeholder = userData[index].telefono;
  document.getElementById('country').placeholder = userData[index].pais;
  document.getElementById('city').placeholder = userData[index].ciudad;
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

  // Si el usuario ingresó una nueva contraseña, la comparamos
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

  const fieldsToCompare = ['nombres', 'apellidos', 'email', 'telefono', 'pais', 'ciudad'];

  for (const field of fieldsToCompare) {
    if (user[field] && user[field] !== userData[index][field]) {
      userData[index][field] = user[field];
    }
  }

  localStorage.setItem('users', JSON.stringify(userData));
  changePlaceholder();
  addLog("Cambio en los datos de usuario", current());
  alert("Perfil cambiado correctamente.");
  form.reset();
  
});







