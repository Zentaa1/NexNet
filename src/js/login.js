document.addEventListener('DOMContentLoaded', function () {
    const passwordInput = document.getElementById('LoginPassword');
    const togglePasswordBtn = document.getElementById('toggleLoginPassword');

    togglePasswordBtn.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePasswordBtn.textContent = type === 'password' ? 'Show' : 'Hide';
    });
});

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("registerButton").addEventListener("click", function() {
        document.getElementById("loginCard").style.display = "none";
        document.getElementById("registerCard").style.display = "block";
    });

    document.getElementById("backToLogin").addEventListener("click", function() {
        document.getElementById("loginCard").style.display = "block";
        document.getElementById("registerCard").style.display = "none";
    });
});
