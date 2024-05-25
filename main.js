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
            blogList.innerHTML+=`
            <li>
                <ul>
                    <a href="/post/index.html">
                    <li><img src="${listItem.media.url}"></li>
                    <li>${listItem.title}</li>
                    <li>${listItem.author.name}</li>
                    <li>${listItem.body}</li>
                    <li>Copy this link to share this blogpost</li>
                    </a>
                </ul>
            </li>`
            //Hrefen må være til single post pagen din og ikke listitem.url da den ikke leder noe sted.
        }
    })
}

displayBlogList();
