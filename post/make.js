const logOutBtn = document.getElementById("logOut");
const logOutDesktopBtn = document.getElementById("logOutDesktop");
const userName = window.localStorage.getItem("User Storage");
const bearerToken = window.localStorage.getItem("Bearer Token");

//If statement to check that the bearer token and username is in the local storage. If not redirect to login
if (!userName || !bearerToken) {
    window.alert('You must be logged in to view this page');
    window.location.href = '/account/login.html';
}

const blogList = document.querySelector(".blogList");
const prevPageButton = document.getElementById("prevPage");
const nextPageButton = document.getElementById("nextPage");
const pageIndicator = document.getElementById("pageIndicator");
let currentPage = 1;
const postsPerPage = 12;
let blogListData = [];

//Function for fetching the bloglist
function fetchBlogList() {
    fetch(`https://v2.api.noroff.dev/blog/posts/${userName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("404 page was not found!");
            }
            return response.json();
        }).then(json => {
            blogListData = json.data;
            displayBlogList();
        }).catch(error => {
            alert('Oops, something went wrong, try logging in again');
        });
}

//Function for displaying the bloglist
function displayBlogList() {
    blogList.innerHTML = '';
    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    const paginatedPosts = blogListData.slice(start, end);

    for (let listItem of paginatedPosts) {
        const truncatedBody = listItem.body.length > 100 ? listItem.body.substring(0, 200) + '...' : listItem.body;
        blogList.innerHTML += `
            <ul>
                <li class="postCard">
                    <li><img src="${listItem.media.url}" alt="${listItem.media.alt}"></li>
                    <li><h2>${listItem.title}</h2></li>
                    <li><h4>Written by: ${listItem.author.name}</h4></li>
                    <li>${truncatedBody}</li>
                    <li class="seperateMe">
                        <li><a href="/post/edit.html?ID=${listItem.id}">Edit blog post</a></li>
                        <li><button onclick="handleDelete('${listItem.id}')" class="deleteButton" data-postId="${listItem.id}">Delete</button></li>
                        <li><a href="/post/index.html?userId=${userName}&id=${listItem.id}">Go to post</a></li>
                    </li>
                </li>
            </ul>`;
    }

    updatePagination();
}

//Function for pagination
function updatePagination() {
    pageIndicator.textContent = `Page ${currentPage} of ${Math.ceil(blogListData.length / postsPerPage)}`;
    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage === Math.ceil(blogListData.length / postsPerPage);
}

//Function for deleting posts
function handleDelete(postId) {
    const confirmDelete = confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
        fetch(`https://v2.api.noroff.dev/blog/posts/${userName}/${postId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${bearerToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({})
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to delete post");
                }
                const listItem = document.querySelector(`button[data-postId="${postId}"]`).closest('li');
                if (listItem) {
                    listItem.remove();
                    alert("Post deleted successfully");
                    fetchBlogList(); // Refresh the list after deletion
                } else {
                    console.error("Error deleting post: Try again later");
                }
            })
            .catch(error => {
                console.error("Error deleting post:", error.message);
            });
    }
}

//Eventlisteners for logging out
logOutBtn.addEventListener("click", logout);
logOutDesktopBtn.addEventListener("click", logout);

//Function for logging out
function logout() {
    window.localStorage.removeItem('User Storage');
    window.localStorage.removeItem('Bearer Token');
    alert("You have been logged out");
    window.location.href = '/account/login.html';
}

//Eventlistener for pagination
prevPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayBlogList();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

//Eventlistener for pagination
nextPageButton.addEventListener('click', () => {
    if (currentPage < Math.ceil(blogListData.length / postsPerPage)) {
        currentPage++;
        displayBlogList();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

fetchBlogList();
