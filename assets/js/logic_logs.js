/**
 * Returns the current date and time in a formatted string.
 *
 * @function
 * @returns {[string, string]} An array with two elements:
 * - The current date in the format "dd/mm/yyyy".
 * - The current time in the format "hh:mm:ss".
 */
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

    return [currentDay(), currentHour()];
}

/**
 * Adds a log entry to the currently selected user in localStorage.
 *
 * @function
 * @param {string} reason - The reason or description of the log entry.
 * @param {string} time - The time when the log was created, typically from `current()`.
 */
export function addLog(reason, time) {
    const index = localStorage.getItem('index');
    const userData = JSON.parse(localStorage.getItem('users'));
    userData[index].logs.push({ time: time, reason: reason });
    localStorage.setItem('users', JSON.stringify(userData)); 
}
