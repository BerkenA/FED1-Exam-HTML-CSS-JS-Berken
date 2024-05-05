fetchBlog();

async function fetchBlog(){
    const displayData = document.getElementById(`postContainer`);
    displayData.innerHTML = `<p>Loading page...</p>`;
    const container = await fetch ("https://v2.api.noroff.dev/auth/register");
    blogList = await container.json();
    displayData.innerHTML = "";
    renderBlog(blogList);
}
fetchBlog();

function renderBlog(blogs){
    const displayData = document.getElementById(`postContainer`);
    displayData.innerHTML = "";
    blogs.forEach(post => {
        if(blogs){
            
        }
    });
}
