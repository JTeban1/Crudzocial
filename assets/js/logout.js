import {addLog, current}  from '../js/logic_logs.js';

const logoutNav = document.getElementById('logoutNav');
const logoutMenu = document.getElementById('logoutMenu');

logoutNav.addEventListener('click', function (e) {
    e.preventDefault();
    addLog("Cerraste sesión", current());
    localStorage.removeItem('index');
    window.location.href = "../../index.html";
})

if (logoutMenu) {
  logoutMenu.addEventListener('click', function (e) {
    e.preventDefault();
    addLog("Cerraste sesión", current());
    localStorage.removeItem('index');
    window.location.href = "../../index.html";
  });
}
