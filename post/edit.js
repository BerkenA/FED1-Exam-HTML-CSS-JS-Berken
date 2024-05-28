const logOutBtn = document.getElementById("logOut")
const logOutDesktopBtn = document.getElementById("logOutDesktop")
const titleField = document.getElementById("title")
const bodyField = document.getElementById("body")
const imageField = document.getElementById("image")
const tagField = document.getElementById("tags")
const submitBtn = document.getElementById("submitButton")
const userId = window.localStorage.getItem("User Storage");
const bearerToken = window.localStorage.getItem("Bearer Token");

if (!userId || !bearerToken) {
    window.alert('You must be logged in to view this page');
    window.location.href = '/account/login.html'; // Stop further execution of the function
}

    // Function to fetch blog posts from the API
    async function fetchBlogPosts() {
        const stringParam = window.location.search
        const urlParam = new URLSearchParams(stringParam);
        const blogPostId = urlParam.get("ID")
        console.log(blogPostId)
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
            console.log(data)
            const fieldData = data.data
            titleField.value = fieldData.title
            bodyField.value = fieldData.body
            imageField.value = fieldData.media.url
            tagField.value = fieldData.tags
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
        
        // Rename variables to avoid conflict
        const editedTitle = titleField.value;
        const editedBody = bodyField.value;
        const editedImage = imageField.value;
        const editedTag = tagField.value;
        
        const requestBody = JSON.stringify({
            title: editedTitle,
            body: editedBody,
            media: {
                url: editedImage
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
                // Optionally, redirect to another page after successful update
                window.location.href = `/post/make.html`
            }
        })
        .catch(error => {
            console.error("Error updating post:", error.message);
        });
    }
    
    

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault(); // Prevents the default form submission behavior

    // Call the handleEdit function to update the blog post
    handleEdit();
}

// Add event listener to the form for the submit event
document.querySelector('.createBlogForm').addEventListener('submit', handleSubmit);

document.addEventListener("DOMContentLoaded", function() {
    // Call fetchBlogPosts function here
    fetchBlogPosts();
});

logOutBtn.addEventListener("click", logout) 
logOutDesktopBtn.addEventListener("click", logout) 

function logout(){
    window.localStorage.removeItem('User Storage')
    window.localStorage.removeItem('Bearer Token');
    alert("You have been logged out"); 
    window.location.href = '/account/login.html';
}
