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
            blogList.innerHTML+=`
            <li>
                <ul>
                    <li><img src="${listItem.media.url}"></li>
                    <li>${listItem.title}</li>
                    <li>${listItem.name}</li>
                    <li>${listItem.body}</li>
                    <li>${listItem.url}</li>
                    <li>${listItem.id}</li>
                    <li><a href="${listItem.url}">Copy this link to share this blogpost</a></li>
                </ul>
            </li>`
            
        }
    })
}

displayBlogList();


































































































async function fetchBlog(){
    const displayData = document.getElementById(`postContainer`);
    displayData.innerHTML = `<p>Loading page...</p>`;
    const container = await fetch ("https://v2.api.noroff.dev/blog/posts/berate");
    blogList = await container.json();
    displayData.innerHTML = "";
    renderBlog(blogList);
}


function renderBlog(blogs){
    const displayData = document.getElementById(`postContainer`);
    displayData.innerHTML = "";
    blogs.forEach(post => {
        if(blogs){
            
        }
    });
}



function printOddNumbersUpToN(n){
    for(let i = 0; i < n; i++){
        if(i % 2===1){
            console.log(i)
        }
    }
}
