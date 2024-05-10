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
                    <li><a href="${listItem.url}">Copy this link to share this blogpost</a></li>
                </ul>
            </li>`
            //remember to make a button inside the edit blog post
        }
    })
}

displayBlogList();




