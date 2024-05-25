const registrationForm = document.getElementById('registrationForm');

function createUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;


    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
    "name": name,
    "email": email,
    "password": password
    });

    const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    fetch("https://v2.api.noroff.dev/auth/register", requestOptions)
    .then(response =>{
        if(!response.ok){
            return response.json().then(errorResponse => {
                throw new Error(errorResponse.errors[0].message);
            });
        };
        return response.json
    })
    .then((result) => {
        window.alert("Registration was successful");
        window.location.href = '/account/login.html';
    })
    .catch((error) => {
        console.error(error);
        window.alert("Oops, there was an error: " , error)
    }
    )}

registrationForm.addEventListener('submit', function(event) {
    event.preventDefault();
    createUser();
});