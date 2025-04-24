function learnMore() {
    alert("Welcome to the Galactic Empire Database! Soon you can explore empires, species, and planets.");
}
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === "admin" && password === "password") {
        alert("Login successful! Welcome, " + username);
        window.location.href = "index.html"; // Redirect to home page after login
    } else {
        alert("Incorrect username or password. Try again.");
    }
}
