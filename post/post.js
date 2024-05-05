const postForm = document.querySelector(".createBlogForm");
postForm.addEventListener("submit",submitBlogPost);

function submitBlogPost(event){
    event.preventDefault();
    const formData = new FormData(event.target)
    fetch("https://v2.api.noroff.dev/blog/posts/berate",{
        method: "POST",
        headers: {
            "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYmVyYXRlIiwiZW1haWwiOiJiZXJhdGUwMTI3NUBzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTcxMzUyNDEyMX0.QYtGuQiJAcv4l7_Rgsbf-8LdK1wur_htklgdgRkYY68",
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
}

