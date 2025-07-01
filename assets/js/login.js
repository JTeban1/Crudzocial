document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("loginForm").addEventListener("submit", async e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const userId = await login(email, password);
    if (userId) { // Changed from checking just true/false
      window.location.href = "pages/dashboard.html";
    } else {
      alert("Invalid credentials.");
    }
  });
});