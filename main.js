const getToken = window.localStorage.getItem("Bearer Token")
const userId = window.localStorage.getItem("User Storage")

function displayBlogList(){
    const blogList = document.querySelector(".blogList");
    fetch(`https://v2.api.noroff.dev/blog/posts/${userId}`)
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
                    <li>${listItem.author.name}</li>
                    <li>${listItem.body}</li>
                    <li><a href="${listItem.url}">Copy this link to share this blogpost</a></li>
                </ul>
            </li>`
            //Hrefen må være til single post pagen din og ikke listitem.url da den ikke leder noe sted.
        }
    })
}

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
            <a href="${post.url}">Link to Post</a>`;
    } catch (error) {
        console.error('Failed to fetch post:', error);
        singlePostDiv.innerHTML = `<p>Failed to load post. Please try again later.</p>`;
    }
}

displayBlogList();
