let index = localStorage.getItem('index');
let userData = JSON.parse(localStorage.getItem('users'));

export function current() {
    const currentDay = () => {
        const now = new Date();

        const day = now.getDate().toString().padStart(2, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const year = now.getFullYear();

        return `${day}/${month}/${year}`;
    };

    const currentHour = () => {
        const now = new Date();

        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');

        return `${hours}:${minutes}:${seconds}`;
    };
    return [currentDay(), currentHour()]
}

export function addLog(reason, time) {
    userData[index].logs.push({time: time, reason: reason})
    localStorage.setItem('users', JSON.stringify(userData)); 
}