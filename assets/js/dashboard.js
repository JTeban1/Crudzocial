document.addEventListener("DOMContentLoaded", () => {
  protectPage();
  const logoutBtn = document.getElementById("logout");
  logoutBtn.addEventListener("click", () => {
    logout();
    window.location.href = "../index.html";
  });
  const user = JSON.parse(localStorage.getItem("loggedIn"));
  document.getElementById("welcome").textContent = `Welcome, ${user.email}!`;
});
