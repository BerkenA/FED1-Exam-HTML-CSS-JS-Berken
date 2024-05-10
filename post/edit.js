const titleField = document.getElementById("title")
const bodyField = document.getElementById("body")
const imageField = document.getElementById("image")
const tagField = document.getElementById("tag")
const submitBtn = document.getElementById("submitButton")



function getParam(parameter) {
    const urlParam = new URLSearchParams(window.location.search);
    return urlParam.get(parameter);
}

const blogPostId = getParam("ID")
console.log(blogPostId)
    
    const bearerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYmVyYXRlIiwiZW1haWwiOiJiZXJhdGUwMTI3NUBzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTcxMzUyNDEyMX0.QYtGuQiJAcv4l7_Rgsbf-8LdK1wur_htklgdgRkYY68";


    // Function to fetch blog posts from the API
    function fetchBlogPosts() {
        fetch(`https://v2.api.noroff.dev/blog/posts/berate/${blogPostId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${bearerToken}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch blog posts");
            }
            return response.json();
        })
        .then(data => { 
            const fieldData = data.data
            console.log(fieldData)
            function populateFields(){
                titleField.value = fieldData.title
                bodyField.value = fieldData.body
                imageField.value = fieldData.media.url
            }
            populateFields()
        })
        .catch(error => {
            console.error("Error fetching blog posts:", error.message);
        });
    }

    

    // Function to handle edit button click
    function handleEdit(event) {
        const postId = event.target.dataset.postId;
        const userId = "berate";
        window.location.href = `edit.html?id=${postId}&user=${userId}`;
        // Fetch the existing post data first to populate the form for editing
        fetch(`https://v2.api.noroff.dev/blog/posts/${userId}/${postId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${bearerToken}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch post data for editing");
            }
            return response.json();
        });

        // Send the PUT request to update the post
        fetch(`https://v2.api.noroff.dev/blog/posts/${userId}/${postId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${bearerToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedPostData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to update the post");
            } else {
                alert("Post updated successfully");
            }
            editForm.style.display = "none";
            postContent.innerHTML = `
                    <h2>${updatedPostData.title}</h2>
                    <img src="${updatedPostData.image}" alt="Image">
                    <p>${updatedPostData.body}</p>
                `;
            event.target.style.display = "block";
        })
        .catch(error => {
            console.error("Error updating post:", error.message);
        });
    }

    submitBtn.onclick = function editPost() {
        fetch(`https://v2.api.noroff.dev/blog/posts/${userName}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${bearerToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "title": formData.get("title"),
                "body": formData.get("body"),
                "tags": [formData.get("tags")],
                "media": {
                    "url": formData.get("image"),
                    "alt": "test"
                }
            })
        });
    };
    
    


    /*My function for deleting
    FLYTT TIL POST/INDEX

    function handleDelete(event) {
        const postId = event.target.dataset.postId;
        const confirmDelete = confirm("Are you sure you want to delete this post?");
        if (confirmDelete) {
            fetch(`https://v2.api.noroff.dev/blog/posts/berate/${postId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${bearerToken}`
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to delete post");
                }
                event.target.parentElement.remove();
                alert("Post deleted successfully");
            })
            .catch(error => {
                console.error("Error deleting post:", error.message);
            });
        }
    }
    */

    fetchBlogPosts();
