
const bearerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYmVyYXRlIiwiZW1haWwiOiJiZXJhdGUwMTI3NUBzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTcxMzUyNDEyMX0.QYtGuQiJAcv4l7_Rgsbf-8LdK1wur_htklgdgRkYY68";
const userName = "berate"



function fetchBlogPosts() {
    fetch(`https://v2.api.noroff.dev/blog/posts/berate/`, {
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