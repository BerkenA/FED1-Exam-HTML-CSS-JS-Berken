const userName = "berate"
const bearerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYmVyYXRlIiwiZW1haWwiOiJiZXJhdGUwMTI3NUBzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTcxMzUyNDEyMX0.QYtGuQiJAcv4l7_Rgsbf-8LdK1wur_htklgdgRkYY68";

function displayBlogList(){
    const blogList = document.querySelector(".blogList");
    fetch("https://v2.api.noroff.dev/blog/posts/berate")
    .then(response => {
        if(!response.ok){
            throw new Error("404 page was not found!");
        }
        return response.json();
    }).then(json => {
        const blogListData = json.data;
        for(let listItem of blogListData){
            console.log(listItem.title)
            blogList.innerHTML+=`
            <li>
                <ul>
                    <li><img src="${listItem.media.url}"></li>
                    <li>${listItem.title}</li>
                    <li>${listItem.name}</li>
                    <li>${listItem.body}</li>
                    <li>${listItem.url}</li>
                    <li><a href="/post/edit.html?ID=${listItem.id}">edit blog post</a></li>
                    <button onclick="handleDelete('${listItem.id}')" class="deleteButton" data-postId="${listItem.id}">Delete</button>
                    <li><a href="${listItem.url}">Copy this link to share this blogpost</a></li>
                </ul>
            </li>`
        }
        

    })
}


displayBlogList();

function handleDelete(postId) {
    const confirmDelete = confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
        fetch(`https://v2.api.noroff.dev/blog/posts/${userName}/${postId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${bearerToken}`,
                "Content-Type": "application/json" // Add content type header
            },
            body: JSON.stringify({}) // Send an empty body
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to delete post");
            }
            // Find the parent <li> element and remove it
            const listItem = document.querySelector(`button[data-postId="${postId}"]`).closest('li');
            if (listItem) {
                listItem.remove();
                alert("Post deleted successfully");
            } else {
                console.error("Error deleting post: Try again later");
            }
        })
        .catch(error => {
            console.error("Error deleting post:", error.message);
        });
    }
            // Attach event listeners for delete buttons after blog list is loaded
            const deleteButtons = document.querySelectorAll('.deleteButton');
            deleteButtons.forEach(button => {
                button.addEventListener('click', handleDelete);
            });
}
