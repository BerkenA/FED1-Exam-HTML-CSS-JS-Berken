const userName = window.localStorage.getItem("User Storage")
const bearerToken = window.localStorage.getItem("Bearer Token")

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
                <div class="postCard">
                    <img src="${listItem.media.url}">
                    <span>${listItem.title}</span>
                    <span>${listItem.author.name}</span>
                    <span>${listItem.body}</span>
                    <a href="/post/edit.html?ID=${listItem.id}">edit blog post</a>
                    <button onclick="handleDelete('${listItem.id}')" class="deleteButton" data-postId="${listItem.id}">Delete</button>
                </div>
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