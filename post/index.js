// Function to extract query parameters from URL
document.addEventListener('DOMContentLoaded', () => {
    // Function to extract query parameters from URL
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }})

// Function to fetch and display a single post by ID
async function fetchPostById(postId) {
    const apiUrl = `https://v2.api.noroff.dev/blog/posts/${postId}`;
    const singlePostDiv = document.querySelector(".singlePost");

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error fetching post: ${response.statusText}`);
        }
        const post = await response.json();

        singlePostDiv.innerHTML = `
            <h2>${post.title}</h2>
            <p>By ${post.author.name}</p>
            <img src="${post.media.url}" alt="${post.title}">
            <p>${post.body}</p>
            <div>Tags: ${post.tags}</div>
            <a href="${post.url}">Link to Post</a>
        `;
    } catch (error) {
        console.error('Failed to fetch post:', error);
        singlePostDiv.innerHTML = `<p>Failed to load post. Please try again later.</p>`;
    }
}

// Get the post ID from the URL and fetch the post
const postId = getQueryParam('id');
if (postId) {
    fetchPostById(postId);
} else {
    document.querySelector('.singlePost').innerHTML = `<p>No post ID provided in URL.</p>`;
}
