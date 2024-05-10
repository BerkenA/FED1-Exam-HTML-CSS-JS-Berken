const postForm = document.querySelector(".createBlogForm");
postForm.addEventListener("submit", submitBlogPost);
const bearerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYmVyYXRlIiwiZW1haWwiOiJiZXJhdGUwMTI3NUBzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTcxMzUyNDEyMX0.QYtGuQiJAcv4l7_Rgsbf-8LdK1wur_htklgdgRkYY68";
const userName = "berate"


function submitBlogPost(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    if (!formData.get("title") || !formData.get("body") || !formData.get("tags") || !formData.get("image")) {
        alert("Please fill out all fields");
        return;
    }
    
    fetch(`https://v2.api.noroff.dev/blog/posts/${userName}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ` + bearerToken,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "title": formData.get("title"),
            "body": formData.get("body"),
            "tags": [formData.get("tags")],
            "media": {
                "url": formData.get("image"),
                "alt": "test"
            }
        })
    })
    .then(response => {
        if (response.ok) {
            alert("Post created successfully!");
        } else {
            alert("Failed to create post. Please try again.");
        }
    })
    .catch(error => {
        alert("An error occurred while creating the post. Please try again later.");
        console.error("Error creating blog post:", error);
    });
}