const logOutBtn = document.getElementById("logOut")
const logOutDesktopBtn = document.getElementById("logOutDesktop")
const titleField = document.getElementById("title")
const bodyField = document.getElementById("body")
const imageField = document.getElementById("image")
const tagField = document.getElementById("tags")
const submitBtn = document.getElementById("submitButton")
const userId = window.localStorage.getItem("User Storage");
const bearerToken = window.localStorage.getItem("Bearer Token");
const imgPreview = document.getElementById("imagePreview"); 
const imgInput = document.getElementById("image");
const altInput = document.getElementById("altText")



//If statement to check that the bearer token and username is in the local storage. If not redirect to login
if (!userId || !bearerToken) {
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

//Eventlistener to trigger image preview
imgInput.addEventListener('input', previewImage);


// Function to fetch blog posts
    async function fetchBlogPosts() {
        const stringParam = window.location.search
        const urlParam = new URLSearchParams(stringParam);
        const blogPostId = urlParam.get("ID")
        fetch(`https://v2.api.noroff.dev/blog/posts/${userId}/${blogPostId}`, {
            method: "GET"
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch blog post");
            }
            return response.json();
        })
        .then(data => {
            const fieldData = data.data
            titleField.value = fieldData.title
            bodyField.value = fieldData.body
            imageField.value = fieldData.media.url
            tagField.value = fieldData.tags
            altInput.value = fieldData.media.alt
            previewImage()
        })
        .catch(error => {
            console.error("Error fetching blog post:", error.message);
        });
    }

    

// Function to handle edit button click
    function handleEdit() {
        const stringParam = window.location.search;
        const urlParam = new URLSearchParams(stringParam);
        const postId = urlParam.get("ID");
        const editedTitle = titleField.value;
        const editedBody = bodyField.value;
        const editedImage = imageField.value;
        const editedTag = tagField.value;
        const altText = altInput.value;
        
        const requestBody = JSON.stringify({
            title: editedTitle,
            body: editedBody,
            tags: [editedTag],
            media: {
                url: editedImage,
                alt: altText
            }
        });
    
        fetch(`https://v2.api.noroff.dev/blog/posts/${userId}/${postId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${bearerToken}`,
                "Content-Type": "application/json"
            },
            body: requestBody
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to update the post");
            } else {
                alert("Post updated successfully");
                window.location.href = `/post/make.html`
            }
        })
        .catch(error => {
            console.error("Error updating post:", error.message);
        });
    }
    
    

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault();
    handleEdit();
}

//Eventlistener to update blog post
document.querySelector('.createBlogForm').addEventListener('submit', handleSubmit);

document.addEventListener("DOMContentLoaded", function() {
    fetchBlogPosts();
});

logOutBtn.addEventListener("click", logout) 
logOutDesktopBtn.addEventListener("click", logout) 

//Function for logging out
function logout(){
    window.localStorage.removeItem('User Storage')
    window.localStorage.removeItem('Bearer Token');
    alert("You have been logged out"); 
    window.location.href = '/account/login.html';
}

