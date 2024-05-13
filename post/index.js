const bearerToken = window.localStorage.getItem("Bearer Token")
const userName = window.localStorage.getItem("User Storage")



function fetchBlogPosts() {
    fetch(`https://v2.api.noroff.dev/blog/posts/${userName}/`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${bearerToken}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch blog posts");
        }
        return response.json();
    })
    .then(data => {
        if (!Array.isArray(data.data)) {
            throw new Error("Blog posts data is not an array");
        }

        // Attach event listeners to edit and delete buttons
        const editButtons = document.querySelectorAll(".editBtn");
        editButtons.forEach(button => {
            button.addEventListener("click", handleEdit);
        });

        const deleteButtons = document.querySelectorAll(".deleteBtn");
        deleteButtons.forEach(button => {
            button.addEventListener("click", handleDelete);
        });
    })
    .catch(error => {
        console.error("Error fetching blog posts:", error.message);
    });
}

fetchBlogPosts();