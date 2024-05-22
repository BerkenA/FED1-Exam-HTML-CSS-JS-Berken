const emailLogIn = document.getElementById('email');
const password = document.getElementById('password');
const submitBtn = document.getElementById("submit");
const registBtn = document.getElementById("registerButton")
const getToken = window.localStorage.getItem("Bearer Token")
const userId = window.localStorage.getItem("User Storage")


// Function for logging in
function fetchLogin() {
    let passwordValue = password.value;
    let emailValue = emailLogIn.value;
    const postData = {
        "email": emailValue,
        "password": passwordValue
    };

    fetch('https://v2.api.noroff.dev/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
    .then(response => {
        if (!response.ok) {
            window.alert("error");
            throw new Error('Network response was not ok.');
        }
        return response.json();
    })
    .then(json => {
        const fetchResult = json.data;
        const bearerToken = fetchResult.accessToken
        const userToken = fetchResult.name
        window.localStorage.setItem("Bearer Token", bearerToken)
        window.localStorage.setItem("User Storage", userToken)
        window.location.href=`/post/index.html`
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        alert('An error occurred while logging in');
    });
};

// Event listener for pressing Enter key in password field
password.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        fetchLogin();
    }
});

// Event listener for clicking the submit button
submitBtn.onclick = function() {
    fetchLogin();
};

registBtn.onclick = function(){
    window.location.href =`/account/register.html`
}
