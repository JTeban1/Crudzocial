import { protectPage }  from './auth.js';

protectPage();

let userData = JSON.parse(localStorage.getItem('users'));
let index = localStorage.getItem('index');

const tableBody = document.querySelector("#logsTable tbody");
console.log(userData[index].logs)

for (const key of Object.values(userData[index].logs)) {
    
    const newRow = document.createElement("tr");
    const date = document.createElement("td");
    const hour = document.createElement("td");
    const reason = document.createElement("td");

    date.textContent = key.time[0];
    hour.textContent = key.time[1];
    reason.textContent = key.reason;
    

    newRow.appendChild(date);
    newRow.appendChild(hour);
    newRow.appendChild(reason);
    tableBody.appendChild(newRow);
}
