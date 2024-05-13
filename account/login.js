const emailLogIn = document.getElementById('email');
const password = document.getElementById('password');
const getToken = window.localStorage.getItem("Bearer Token")
const userId = window.localStorage.getItem("User Storage")
const timeDate = new Date();
const minutes = timeDate.getMinutes();

console.log(minutes)

const submitBtn = document.getElementById("submit");
submitBtn.onclick = function fetchLogin() {
    let passwordValue = password.value;
    let emailValue = emailLogIn.value;
    const postData = {
        "email": emailValue,
        "password": passwordValue
    };

    console.log(postData);
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
        console.log(fetchResult);
        const bearerToken = fetchResult.accessToken
        const userToken = fetchResult.name
        window.localStorage.setItem("Bearer Token", bearerToken)
        window.localStorage.setItem("User Storage", userToken)
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        alert('An error occurred while logging in');
    });
};
