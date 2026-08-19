async function loadPosts() {

    const postsContainer = document.getElementById("postsContainer");

    if (!postsContainer) return;

    postsContainer.innerHTML = `
        <div class="loading">
            Loading posts...
        </div>
    `;

    const { data, error } = await supabaseClient
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {

        console.error("Error loading posts:", error);

        postsContainer.innerHTML = `
            <div class="empty-state">
                <h3>Unable to load posts</h3>
                <p>Please try again later.</p>
            </div>
        `;

        return;
    }

    if (!data || data.length === 0) {

        postsContainer.innerHTML = `
            <div class="empty-state">
                <h3>No Posts Yet</h3>
                <p>Be the first to share something with the campus.</p>
            </div>
        `;

        return;
    }

    postsContainer.innerHTML = data.map(post => `

        <article class="post-card">

            <div class="post-header">

                <div class="post-avatar">
                    U
                </div>

                <div>
                    <h3>${post.title || "Campus Post"}</h3>

                    <span>
                        ${post.created_at
            ? new Date(post.created_at).toLocaleDateString()
            : ""}
                    </span>
                </div>

            </div>

            <div class="post-body">

                <p>
                    ${post.content || post.description || ""}
                </p>

            </div>

            <div class="post-actions">

                <button class="post-action">
                    ❤️ Like
                </button>

                <button class="post-action">
                    💬 Comment
                </button>

            </div>

        </article>

    `).join("");
}

loadPosts();

const createPostForm = document.getElementById("createPostForm");

if (createPostForm) {

    createPostForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const title = document
            .getElementById("postTitle")
            .value
            .trim();

        const content = document
            .getElementById("postContent")
            .value
            .trim();

        if (!content) {

            alert("Please write something first.");

            return;
        }

        // Get logged-in user
        const {
            data: { user },
            error: userError
        } = await supabaseClient.auth.getUser();

        if (userError || !user) {

            alert("Please login first to create a post.");

            return;
        }

        const submitButton =
            createPostForm.querySelector(".create-post-submit");

        submitButton.disabled = true;

        submitButton.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Publishing...
        `;

        // Insert post into Supabase
        const { data, error } = await supabaseClient
            .from("posts")
            .insert({
                title: title || "Campus Post",
                content: content,
                user_id: user.id
            })
            .select()
            .single();

        if (error) {

            console.error("Create Post Error:", error);

            alert(
                "Post could not be published.\n\n" +
                error.message
            );

            submitButton.disabled = false;

            submitButton.innerHTML = `
                <i class="fa-solid fa-paper-plane"></i>
                Publish Post
            `;

            return;
        }

        console.log("Post Created:", data);

        alert("Post published successfully! 🎉");

        createPostForm.reset();

        postModal.classList.remove("active");

        submitButton.disabled = false;

        submitButton.innerHTML = `
            <i class="fa-solid fa-paper-plane"></i>
            Publish Post
        `;

        // Refresh posts
        loadPosts();

    });

}
const postModal = document.getElementById("postModal");

const openPostModal = document.getElementById("openPostModal");

const closePostModal = document.getElementById("closePostModal");


if (openPostModal) {

    openPostModal.addEventListener("click", () => {

        postModal.classList.add("active");

    });

}


if (closePostModal) {

    closePostModal.addEventListener("click", () => {

        postModal.classList.remove("active");

    });

}


if (postModal) {

    postModal.addEventListener("click", (e) => {

        if (e.target === postModal) {

            postModal.classList.remove("active");

        }

    });

}