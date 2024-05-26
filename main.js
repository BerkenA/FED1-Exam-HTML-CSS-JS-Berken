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
        if (!getToken || !userId) {
            window.alert("You must be logged in to view this page.");
            window.location.href = '/account/login.html';
        }
    })
};

function displayBlogList(){
    const blogList = document.querySelector(".blogList");
    blogList.innerHTML = '';
        for(let listItem of blogListData){
            blogList.innerHTML+=`
            <li>
                <ul>
                    <a href="/post/index.html?userId=${userId}&id=${listItem.id}
                    ">
                    <li><img src="${listItem.media.url}"></li>
                    <li>${listItem.title}</li>
                    <li>${listItem.author.name}</li>
                    <li>${listItem.body}</li>
                    </a>
                </ul>
            </li>`
}}

function displayCaroussell(){
    console.log(carrrousellIndex);
    carrousellImageDiv.innerHTML =`<img src="${carrousellPictures[carrrousellIndex].media.url}">`
}

function showNextPicture (){
    if(carrrousellIndex >= Math.min(carrousellPictures, 2)){
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
