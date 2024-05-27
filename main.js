const getToken = window.localStorage.getItem("Bearer Token")
const userId = window.localStorage.getItem("User Storage")
let carrrousellIndex = 0;
const leftButton = document.getElementById("carrousellLeft")
const rightButton = document.getElementById("carrousellRight")
let blogListData;
let caroussellListData;
const carrousellImageDiv = document.querySelector(".carrousellImage");

function fetchBlogList(){
    fetch(`https://v2.api.noroff.dev/blog/posts/${userId}`)
    .then(response => {
        if(!response.ok){
            throw new Error("404 page was not found!");
        }
        return response.json();
    }).then(json => {
        blogListData = json.data;
        carrousellPictures = blogListData.slice(0,Math.min(blogListData.length, 3));
        displayCaroussell();
        displayBlogList();
        }
    ).catch((error)=>{
        alert('Oops, something went wrong')
    })
};

function displayBlogList(){
    const blogList = document.querySelector(".blogList");
    blogList.innerHTML = '';
        for(let listItem of blogListData){
            const truncatedBody = listItem.body.length > 100 ? listItem.body.substring(0, 200) + '...' : listItem.body;
            blogList.innerHTML+=`
            <li>
                <a href="/post/index.html?userId=${userId}&id=${listItem.id}
                ">
                <li><img src="${listItem.media.url}"></li>
                <li><h2>${listItem.title}</h2></li>
                <li><h4>Written by: ${listItem.author.name}</h4></li>
                <li>${truncatedBody}</li>
                </a>
            </li>`
}}

function displayCaroussell(){
    carrousellImageDiv.innerHTML =`<img src="${carrousellPictures[carrrousellIndex].media.url}">`
}

function showNextPicture (){
    if(carrrousellIndex >= 2){
        carrrousellIndex = 0;
    } else {
        carrrousellIndex++
    }
    displayCaroussell();
}

function showPreviousPicture (){
    if(carrrousellIndex <= 0){
        carrrousellIndex = 2;
    } else {
        carrrousellIndex--
    }
    displayCaroussell();
}

function navigateToBlogPost(){
    window.location =`/post/index.html?userId=${userId}&id=${blogListData[carrrousellIndex].id}`
}

leftButton.addEventListener('click',showPreviousPicture);
rightButton.addEventListener('click',showNextPicture);
carrousellImageDiv.addEventListener('click',navigateToBlogPost)

fetchBlogList();
