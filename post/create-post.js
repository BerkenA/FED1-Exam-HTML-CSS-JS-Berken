const logOutBtn = document.getElementById("logOut")
const logOutDesktopBtn = document.getElementById("logOutDesktop")
const postForm = document.querySelector(".createBlogForm");
postForm.addEventListener("submit", submitBlogPost);
const bearerToken = window.localStorage.getItem("Bearer Token");
const userName = window.localStorage.getItem("User Storage");
const imgPreview = document.getElementById("imagePreview"); 
const imgInput = document.getElementById("image");

//If statement to check that the bearer token and username is in the local storage. If not redirect to login
if (!userName || !bearerToken) {
    window.alert('You must be logged in to view this page');
    window.location.href = '/account/login.html';
}

//Function for previewing image
function previewImage(){
    imgPreview.innerHTML = `
    <label for="preview">
    Image preview:
    </label>
    <img src="${imgInput.value}" id="preview" alt="preview" style="width: 100%">`

    if (imgInput.value.length > 13){
    imgPreview.style.display = "flex";
    }
    else{
        imgPreview.style.display = "none";
    }
}

//Eventlistener to preview image
imgInput.addEventListener('input', previewImage);

//Function to create a new blog post
function submitBlogPost(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    if (!formData.get("title") || !formData.get("body") || !formData.get("tags") || !formData.get("image")) {
        alert("Please fill out all fields");
        return;
    }
    
    fetch(`https://v2.api.noroff.dev/blog/posts/${userName}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ` + bearerToken,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "title": formData.get("title"),
            "body": formData.get("body"),
            "tags": [formData.get("tags")],
            "media": {
                "url": formData.get("image"),
                "alt": formData.get("altText")
            }
        })
    })
    .then(response => {
        if (response.ok) {
            alert("Post created successfully!");
            window.location.href = "/post/make.html"
        } else {
            alert("Failed to create post. Please try again.");
        }
    })
    .catch(error => {
        alert("An error occurred while creating the post. Please try again later.");
        console.error("Error creating blog post:", error);
    });
}

//Eventlisteners for logging out
logOutBtn.addEventListener("click", logout) 
logOutDesktopBtn.addEventListener("click", logout) 

//Function for logging out
function logout(){
    window.localStorage.removeItem('User Storage')
    window.localStorage.removeItem('Bearer Token');
    alert("You have been logged out"); 
    window.location.href = '/account/login.html';
}

