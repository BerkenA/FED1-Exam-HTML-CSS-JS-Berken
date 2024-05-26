const getToken = window.localStorage.getItem("Bearer Token")
const userId = window.localStorage.getItem("User Storage")
let carrrousellIndex = 0;
const leftButton = document.getElementById("carrousellLeft")
const rightButton = document.getElementById("carrousellRight")
let blogListData;

function fetchBlogList(){
    fetch(`https://v2.api.noroff.dev/blog/posts/${userId}`)
    .then(response => {
        if(!response.ok){
            throw new Error("404 page was not found!");
        }
        return response.json();
    }).then(json => {
        blogListData = json.data;
        displayCaroussell();
        displayBlogList();
            //Hrefen må være til single post pagen din og ikke listitem.url da den ikke leder noe sted.
        }
    )};

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
    const carrousellPictures = blogListData.slice(0,3);
    const carrousellImageDiv = document.querySelector(".carrousellImage");
    console.log(carrrousellIndex);
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

leftButton.addEventListener('click',showPreviousPicture);
rightButton.addEventListener('click',showNextPicture);



fetchBlogList();
