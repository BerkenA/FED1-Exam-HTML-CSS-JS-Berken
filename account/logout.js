let inactivityTimer;

// Function to handle logout
function logout() {
    localStorage.removeItem('authToken');
    window.location.href = '/account/login-register.html';
    alert("You have been logged out due to inactivity"); 
}

// Function to reset the inactivity timer
function resetTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(logout, 30 * 60 * 1000);
}

// Event listeners to track user activity
document.addEventListener('mousemove', resetTimer);
document.addEventListener('mousedown', resetTimer);
document.addEventListener('keypress', resetTimer);
document.addEventListener('touchstart', resetTimer);
document.addEventListener('scroll', resetTimer);

resetTimer();
