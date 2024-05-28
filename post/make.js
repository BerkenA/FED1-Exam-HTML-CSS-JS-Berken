const logOutBtn = document.getElementById("logOut")
const logOutDesktopBtn = document.getElementById("logOutDesktop")
const userName = window.localStorage.getItem("User Storage")
const bearerToken = window.localStorage.getItem("Bearer Token")

if (!userName || !bearerToken) {
    window.alert('You must be logged in to view this page');
    window.location.href = '/account/login.html'; // Stop further execution of the function
}

function displayBlogList(){
    const blogList = document.querySelector(".blogList");
    fetch(`https://v2.api.noroff.dev/blog/posts/${userName}`)
    .then(response => {
        if(!response.ok){
            throw new Error("404 page was not found!");
        }
        return response.json();
    }).then(json => {
        const blogListData = json.data;
        for(let listItem of blogListData){
            const truncatedBody = listItem.body.length > 100 ? listItem.body.substring(0, 200) + '...' : listItem.body;
            blogList.innerHTML+=`
            <ul>
                <li class="postCard">
                    <li><img src="${listItem.media.url}" alt=""></li>
                    <li><h2>${listItem.title}</h2></li>
                    <li><h4>Written by: ${listItem.author.name}</h4></li>
                    <li>${truncatedBody}</li>
                    <li class="seperateMe">
                    <li><a href="/post/edit.html?ID=${listItem.id}">Edit blog post</a></li>
                    <li><button onclick="handleDelete('${listItem.id}')" class="deleteButton" data-postId="${listItem.id}">Delete</button></li>
                    <li><a href="/post/index.html?userId=${userName}&id=${listItem.id}
                    ">Go to post</a></li>
                    </li>
                </li>
            </ul>`
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
                "Content-Type": "application/json"
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
                window.location.href ='/post/make.html'
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

logOutBtn.addEventListener("click", logout) 
logOutDesktopBtn.addEventListener("click", logout) 

function logout(){
    window.localStorage.removeItem('User Storage')
    window.localStorage.removeItem('Bearer Token');
    alert("You have been logged out"); 
    window.location.href = '/account/login.html';
}

