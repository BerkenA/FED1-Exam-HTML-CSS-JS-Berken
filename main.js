const getToken = window.localStorage.getItem("Bearer Token");
const userId = window.localStorage.getItem("User Storage");
let carrrousellIndex = 0;
const leftButton = document.getElementById("carrousellLeft");
const rightButton = document.getElementById("carrousellRight");
let blogListData;
let caroussellListData;
const carrousellImageDiv = document.querySelector(".carrousellImage");
const blogList = document.querySelector(".blogList");
const prevPageButton = document.getElementById("prevPage");
const nextPageButton = document.getElementById("nextPage");
const pageIndicator = document.getElementById("pageIndicator");
let currentPage = 1;
const postsPerPage = 12;

function fetchBlogList() {
    fetch(`https://v2.api.noroff.dev/blog/posts/berate`)
        .then(response => {
            if (!response.ok) {
                throw new Error("404 page was not found!");
            }
            return response.json();
        }).then(json => {
            blogListData = json.data;
            caroussellPictures = blogListData.slice(0, Math.min(blogListData.length, 3));
            displayCaroussell();
            displayBlogList();
        }).catch(error => {
            alert('Oops, something went wrong, try logging in again');
        });
}

function displayBlogList() {
    blogList.innerHTML = '';
    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    const paginatedPosts = blogListData.slice(start, end);

    for (let listItem of paginatedPosts) {
        const truncatedBody = listItem.body.length > 100 ? listItem.body.substring(0, 200) + '...' : listItem.body;
        blogList.innerHTML += `
            <li>
                <a href="/post/index.html?id=${listItem.id}" aria-label="click here to go to the post">
                    <li><img src="${listItem.media.url}" alt="${listItem.media.alt}"></li>
                    <li><h2>${listItem.title}</h2></li>
                    <li><h4>Written by: ${listItem.author.name}</h4></li>
                    <li>${truncatedBody}</li>
                </a>
            </li>`;
    }

    updatePagination();
}

function updatePagination() {
    pageIndicator.textContent = `Page ${currentPage} of ${Math.ceil(blogListData.length / postsPerPage)}`;
    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage === Math.ceil(blogListData.length / postsPerPage);
}

function displayCaroussell() {
    const currentPicture = caroussellPictures[carrrousellIndex];
    carrousellImageDiv.innerHTML = `
    <img src="${caroussellPictures[carrrousellIndex].media.url} alt="${currentPicture.media.alt}">`;
}

function showNextPicture() {
    if (carrrousellIndex >= 2) {
        carrrousellIndex = 0;
    } else {
        carrrousellIndex++;
    }
    displayCaroussell();
}

function showPreviousPicture() {
    if (carrrousellIndex <= 0) {
        carrrousellIndex = 2;
    } else {
        carrrousellIndex--;
    }
    displayCaroussell();
}

function navigateToBlogPost() {
    window.location = `/post/index.html?userId=${userId}&id=${blogListData[carrrousellIndex].id}`;
}

leftButton.addEventListener('click', showPreviousPicture);
rightButton.addEventListener('click', showNextPicture);
carrousellImageDiv.addEventListener('click', navigateToBlogPost);

prevPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayBlogList();
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }
});

nextPageButton.addEventListener('click', () => {
    if (currentPage < Math.ceil(blogListData.length / postsPerPage)) {
        currentPage++;
        displayBlogList();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

fetchBlogList();
