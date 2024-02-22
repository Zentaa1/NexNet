import { NN_BASE, NN_AUTH, NN_REGISTER } from './api/constants.js'; 
import { registerUser } from './api/registerUser.js'; 

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("registerForm").addEventListener("submit", async function(event) {
       event.preventDefault();
       
       const username = document.getElementById("registerName").value;
       const email = document.getElementById("registerMail").value;
       const password = document.getElementById("registerPassword").value;

       try {
        const response = await registerUser(username, email, password);

        console.log('registration successful', response);
        alert('Registration successful!');
       
       } catch (error) {
        console.error('There was a problem with registration', error.message);
        alert('Registration failed. Please try again or contact Marius')
       }
    });
});