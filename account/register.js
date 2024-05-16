const registrationForm = document.getElementById('registrationForm');

function createUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;

    const postData = {
        "name": name,
        "email": email,
        "password": password
    };

    fetch('https://v2.api.noroff.dev/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
    .then(response => {
        if (!response.ok) {
            window.alert("Registration failed");
        } else return response.json(); // Parse response JSON

    })
    .then(json => {
        console.log('Response JSON:', json);
        window.alert("Registration successful");
        // Redirect to the login page
        window.location.href = '/account/login.html'; // Adjust path as needed
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        alert('An error occurred during registration');
    });
}

registrationForm.addEventListener('submit', function(event) {
    event.preventDefault();
    createUser();
});

