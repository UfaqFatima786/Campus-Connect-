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