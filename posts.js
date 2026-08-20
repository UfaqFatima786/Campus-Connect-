async function createNotification({
    userId,
    type,
    title,
    message
}) {

    if (!userId) {
        console.error(
            "Notification user ID missing"
        );
        return;
    }

    const {
        data,
        error
    } = await supabaseClient
        .from("notifications")
        .insert({
            user_id: userId,
            type: type,
            title: title,
            message: message,
            is_read: false
        })
        .select()
        .single();

    if (error) {

        console.error(
            "Notification creation error:",
            error
        );

        return;
    }

    console.log(
        "Notification created successfully:",
        data
    );
}

async function loadPosts() {

    const {
        data: { user: currentUser }
    } = await supabaseClient.auth.getUser();

    const postsContainer =
        document.getElementById("postsContainer");

    if (!postsContainer) return;

    postsContainer.innerHTML = `
        <div class="loading">
            Loading posts...
        </div>
    `;

    // =========================
    // LOAD POSTS
    // =========================

    const {
        data: posts,
        error
    } = await supabaseClient
        .from("posts")
        .select("*")
        .order("created_at", {
            ascending: false
        });

    if (error) {

        console.error(
            "Error loading posts:",
            error
        );

        postsContainer.innerHTML = `
            <div class="empty-state">
                <h3>Unable to load posts</h3>
                <p>Please try again later.</p>
            </div>
        `;

        return;
    }

    if (!posts || posts.length === 0) {

        postsContainer.innerHTML = `
            <div class="empty-state">
                <h3>No Posts Yet</h3>
                <p>
                    Be the first to share something
                    with the campus.
                </p>
            </div>
        `;

        return;
    }


    // =========================
    // GET USER IDS
    // =========================

    const userIds = [
        ...new Set(
            posts
                .map(post => post.user_id)
                .filter(Boolean)
        )
    ];


    // =========================
    // LOAD USERS FROM PROFILESS
    // =========================

    let profiles = [];

    if (userIds.length > 0) {

        const {
            data: profileData,
            error: profileError
        } = await supabaseClient
            .from("profiless")
            .select("id, name")
            .in("id", userIds);

        if (profileError) {

            console.error(
                "Profile Error:",
                profileError
            );

        } else {

            profiles = profileData || [];

        }
    }

    const profileMap = {};

    profiles.forEach(profile => {

        profileMap[profile.id] =
            profile;

    });


    postsContainer.innerHTML =
        posts.map(post => {

            const profile =
                profileMap[post.user_id];

            const userName =
                profile?.name || "User";

            const firstLetter =
                userName
                    .charAt(0)
                    .toUpperCase();


            return `

                <article
                    class="post-card"
                    data-post-id="${post.id}"
                >

                    <!-- POST HEADER -->
                    <div class="post-header">

                        <div class="post-user">

                            <div class="post-avatar">
                                ${firstLetter}
                            </div>

                            <div>

                                <h3>
                                    ${userName}
                                </h3>

                                <span>

                                    <i class="fa-regular fa-clock"></i>

                                    ${post.created_at
                    ? new Date(
                        post.created_at
                    ).toLocaleDateString()
                    : ""
                }

                                </span>

                            </div>

                        </div>


                        ${currentUser &&
                    currentUser.id === post.user_id
                    ? `

                                    <div class="post-owner-actions">

                                        <button
                                            class="post-edit-btn"
                                            data-id="${post.id}"
                                            title="Edit Post"
                                        >

                                            <i class="fa-solid fa-pen"></i>

                                        </button>


                                        <button
                                            class="post-delete-btn"
                                            data-id="${post.id}"
                                            title="Delete Post"
                                        >

                                            <i class="fa-solid fa-trash"></i>

                                        </button>

                                    </div>

                                `
                    : ""
                }

                    </div>


                    <!-- POST BODY -->
                    <div class="post-body">

                        <h3>
                            ${post.title || "Campus Post"}
                        </h3>

                        <p>
                            ${post.content || ""}
                        </p>

                    </div>


                    <!-- POST ACTIONS -->
                    <div class="post-actions">

                        <button
                            type="button"
                            class="post-action like-btn"
                            data-post-id="${post.id}"
                        >

                            <i class="fa-regular fa-heart"></i>

                            <span class="like-count">
                                0
                            </span>

                        </button>


                        <button
                            type="button"
                            class="post-action comment-btn"
                            data-post-id="${post.id}"
                        >

                            <i class="fa-regular fa-comment"></i>

                            <span class="comment-count">
                                0
                            </span>

                        </button>


                        <button
                            type="button"
                            class="post-action share-btn"
                            data-post-id="${post.id}"
                        >

                            <i class="fa-solid fa-share-nodes"></i>

                            Share

                        </button>

                    </div>


                    <!-- COMMENTS SECTION -->
                    <div
                        class="comments-section"
                        id="comments-${post.id}"
                        style="display:none;"
                    ></div>

                </article>

            `;

        }).join("");

    await initializePostInteractions(posts);

}
async function initializePostInteractions(posts) {

    const {
        data: { user }
    } = await supabaseClient.auth.getUser();


    for (const post of posts) {

        const likeBtn =
            document.querySelector(
                `.like-btn[data-post-id="${post.id}"]`
            );

        const commentBtn =
            document.querySelector(
                `.comment-btn[data-post-id="${post.id}"]`
            );


        if (!likeBtn || !commentBtn) {
            continue;
        }


        // =========================
        // GET COUNTS
        // =========================

        const counts =
            await getPostCounts(post.id);


        const likeCount =
            likeBtn.querySelector(
                ".like-count"
            );

        const commentCount =
            commentBtn.querySelector(
                ".comment-count"
            );


        if (likeCount) {

            likeCount.textContent =
                counts.likes;

        }


        if (commentCount) {

            commentCount.textContent =
                counts.comments;

        }


        // =========================
        // CHECK CURRENT USER LIKE
        // =========================

        if (user) {

            const {
                data: existingLike,
                error
            } = await supabaseClient
                .from("post_likes")
                .select("id")
                .eq(
                    "post_id",
                    post.id
                )
                .eq(
                    "user_id",
                    user.id
                )
                .maybeSingle();


            if (error) {

                console.error(
                    "Existing Like Error:",
                    error
                );

                continue;
            }


            if (existingLike) {

                likeBtn.classList.add(
                    "liked"
                );

                const icon =
                    likeBtn.querySelector("i");

                if (icon) {

                    icon.className =
                        "fa-solid fa-heart";

                }

            }

        }

    }

}
loadPosts();

const postModal =
    document.getElementById("postModal");

const openPostModal =
    document.getElementById("openPostModal");

const closePostModal =
    document.getElementById("closePostModal");

const createPostForm =
    document.getElementById("createPostForm");

if (openPostModal) {

    openPostModal.addEventListener(
        "click",
        () => {
            if (createPostForm) {

                createPostForm.reset();

                createPostForm.removeAttribute(
                    "data-editing-id"
                );

            }
            const submitButton =
                createPostForm?.querySelector(
                    ".create-post-submit"
                );

            if (submitButton) {

                submitButton.disabled = false;

                submitButton.innerHTML = `
                    <i class="fa-solid fa-paper-plane"></i>
                    Publish Post
                `;

            }


            // Open modal
            if (postModal) {

                postModal.classList.add(
                    "active"
                );

            }

        }
    );

}

if (closePostModal) {

    closePostModal.addEventListener(
        "click",
        () => {

            if (postModal) {

                postModal.classList.remove(
                    "active"
                );

            }


            if (createPostForm) {

                createPostForm.reset();

                createPostForm.removeAttribute(
                    "data-editing-id"
                );

            }

        }
    );

}

if (postModal) {

    postModal.addEventListener(
        "click",
        (e) => {
            if (e.target === postModal) {
                postModal.classList.remove(
                    "active"
                );
                if (createPostForm) {
                    createPostForm.reset();
                    createPostForm.removeAttribute(
                        "data-editing-id"
                    );
                }
            }
        }
    );
}

if (createPostForm) {

    createPostForm.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();
            const title =
                document
                    .getElementById("postTitle")
                    .value
                    .trim();


            const content =
                document
                    .getElementById("postContent")
                    .value
                    .trim();
            if (!content) {

                alert(
                    "Please write something first."
                );

                return;
            }
            const {
                data: { user },
                error: userError
            } = await supabaseClient.auth.getUser();


            if (userError || !user) {

                alert(
                    "Please login first to create a post."
                );

                return;
            }


            // Submit button
            const submitButton =
                createPostForm.querySelector(
                    ".create-post-submit"
                );


            if (submitButton) {

                submitButton.disabled = true;

                submitButton.innerHTML = `
                    <i class="fa-solid fa-spinner fa-spin"></i>
                    Saving...
                `;

            }
            const editingId =
                createPostForm.dataset.editingId;


            let data = null;
            let error = null;

            if (editingId) {

                const result =
                    await supabaseClient
                        .from("posts")
                        .update({
                            title:
                                title ||
                                "Campus Post",

                            content:
                                content
                        })
                        .eq(
                            "id",
                            editingId
                        )
                        .select()
                        .single();


                data = result.data;

                error = result.error;

            }

            else {

                const result =
                    await supabaseClient
                        .from("posts")
                        .insert({
                            title:
                                title ||
                                "Campus Post",

                            content:
                                content,

                            user_id:
                                user.id
                        })
                        .select()
                        .single();


                data = result.data;

                error = result.error;

            }

            if (error) {

                console.error(
                    "Post Save Error:",
                    error
                );


                alert(
                    "Post could not be saved.\n\n" +
                    error.message
                );


                if (submitButton) {

                    submitButton.disabled =
                        false;

                    submitButton.innerHTML = `
                        <i class="fa-solid fa-paper-plane"></i>
                        ${editingId
                            ? "Update Post"
                            : "Publish Post"
                        }
                    `;

                }

                return;
            }

            console.log(
                "Post Saved:",
                data
            );


            if (editingId) {

                alert(
                    "Post updated successfully! ✨"
                );

            } else {

                alert(
                    "Post published successfully! 🎉"
                );

            }
            createPostForm.reset();
            createPostForm.removeAttribute(
                "data-editing-id"
            );


            // Close modal
            if (postModal) {

                postModal.classList.remove(
                    "active"
                );

            }


            // Reset submit button
            if (submitButton) {

                submitButton.disabled =
                    false;

                submitButton.innerHTML = `
                    <i class="fa-solid fa-paper-plane"></i>
                    Publish Post
                `;

            }
            loadPosts();

        }
    );

}

document.addEventListener(
    "click",
    async function (e) {

        const editBtn =
            e.target.closest(
                ".post-edit-btn"
            );
        if (!editBtn) return;
        const postId =
            editBtn.dataset.id;


        if (!postId) return;

        const {
            data: post,
            error
        } = await supabaseClient
            .from("posts")
            .select("*")
            .eq(
                "id",
                postId
            )
            .single();


        if (error) {

            console.error(
                "Load Post Error:",
                error
            );


            alert(
                "Unable to load post."
            );

            return;
        }
        document
            .getElementById("postTitle")
            .value =
            post.title || "";


        document
            .getElementById("postContent")
            .value =
            post.content || "";
        createPostForm.dataset.editingId =
            post.id;

        const submitButton =
            createPostForm.querySelector(
                ".create-post-submit"
            );


        if (submitButton) {

            submitButton.disabled =
                false;

            submitButton.innerHTML = `
                <i class="fa-solid fa-pen"></i>
                Update Post
            `;

        }
        if (postModal) {

            postModal.classList.add(
                "active"
            );

        }

    }
);
document.addEventListener(
    "click",
    async function (e) {

        const deleteBtn =
            e.target.closest(
                ".post-delete-btn"
            );


        if (!deleteBtn) return;


        const postId =
            deleteBtn.dataset.id;


        if (!postId) return;
        const confirmDelete =
            confirm(
                "Are you sure you want to delete this post?"
            );

        if (!confirmDelete) return;
        deleteBtn.disabled = true;


        deleteBtn.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
        `;
        const {
            error
        } = await supabaseClient
            .from("posts")
            .delete()
            .eq(
                "id",
                postId
            );
        if (error) {

            console.error(
                "Delete Post Error:",
                error
            );


            alert(
                "Post could not be deleted.\n\n" +
                error.message
            );


            deleteBtn.disabled =
                false;

            deleteBtn.innerHTML = `
                <i class="fa-solid fa-trash"></i>
            `;

            return;
        }
        alert(
            "Post deleted successfully! "
        );
        loadPosts();

    }
);




document.addEventListener("click", async function (e) {

    const likeBtn = e.target.closest(".like-btn");

    if (!likeBtn) return;

    const postId = likeBtn.dataset.postId;

    if (!postId) return;

    likeBtn.disabled = true;

    try {

        await toggleLike(postId, likeBtn);

    } catch (error) {

        console.error(
            "Like notification error:",
            error
        );

    }

    likeBtn.disabled = false;

});

async function loadComments(
    postId,
    commentsSection
) {

    commentsSection.innerHTML = `
        <div class="comments-loading">
            Loading comments...
        </div>
    `;

    const {
        data: comments,
        error
    } = await supabaseClient
        .from("post_comments")
        .select("*")
        .eq("post_id", postId)
        .order("created_at", {
            ascending: true
        });

    if (error) {

        console.error(
            "Comments Error:",
            error
        );

        commentsSection.innerHTML = `
            <p>
                Unable to load comments.
            </p>
        `;

        return;
    }

    let commentsHTML = "";

    if (!comments || comments.length === 0) {

        commentsHTML = `
            <p class="no-comments">
                No comments yet. Be the first to comment!
            </p>
        `;

    } else {

        commentsHTML = comments.map(comment => {

            return `
                <div class="comment-item">

                    <div class="comment-avatar">
                        U
                    </div>

                    <div class="comment-content">

                        <strong>
                            Student
                        </strong>

                        <p>
                            ${comment.comment || comment.content || ""}
                        </p>

                        <small>
                            ${comment.created_at
                    ? new Date(
                        comment.created_at
                    ).toLocaleString()
                    : ""
                }
                        </small>

                    </div>

                </div>
            `;

        }).join("");
    }

    commentsSection.innerHTML = `

        <div class="comment-list">

            ${commentsHTML}

        </div>

        <form
            class="comment-form"
            data-post-id="${postId}"
        >

            <input
                type="text"
                class="comment-input"
                placeholder="Write a comment..."
                maxlength="500"
                required
            >

            <button type="submit">
                <i class="fa-solid fa-paper-plane"></i>
            </button>

        </form>

    `;
}

document.addEventListener(
    "submit",
    async function (e) {

        const commentForm =
            e.target.closest(".comment-form");

        if (!commentForm) return;

        e.preventDefault();

        const postId =
            commentForm.dataset.postId;

        const input =
            commentForm.querySelector(
                ".comment-input"
            );

        const commentText =
            input.value.trim();

        if (!commentText) return;

        const {
            data: { user },
            error: userError
        } = await supabaseClient.auth.getUser();

        if (userError || !user) {

            alert(
                "Please login to comment."
            );

            return;
        }

        const submitButton =
            commentForm.querySelector("button");

        submitButton.disabled = true;

        const { error } =
            await supabaseClient
                .from("post_comments")
                .insert({

                    post_id: postId,

                    user_id: user.id,

                    comment: commentText

                });

        if (error) {

            console.error(
                "Comment Error:",
                error
            );

            alert(
                "Unable to post comment.\n\n" +
                error.message
            );

            submitButton.disabled = false;

            return;
        }

        input.value = "";

        const commentsSection =
            document.getElementById(
                `comments-${postId}`
            );

        await loadComments(
            postId,
            commentsSection
        );

        const {
            count: commentCount,
            error: countError
        } = await supabaseClient
            .from("post_comments")
            .select("*", {
                count: "exact",
                head: true
            })
            .eq("post_id", postId);

        if (!countError) {

            const commentBtn =
                document.querySelector(
                    `.comment-btn[data-post-id="${postId}"]`
                );

            const countElement =
                commentBtn?.querySelector(".comment-count");

            if (countElement) {
                countElement.textContent =
                    commentCount || 0;
            }
        }

        submitButton.disabled = false;

    }
);

async function updateLikeCount(postId, likeBtn) {

    const { count, error } = await supabaseClient
        .from("post_likes")
        .select("*", {
            count: "exact",
            head: true
        })
        .eq("post_id", postId);

    if (error) {
        console.error("Like Count Error:", error);
        return;
    }

    const countElement =
        likeBtn.querySelector(".like-count");

    if (countElement) {
        countElement.textContent = count || 0;
    }
}

async function getPostCounts(postId) {

    const { count: likeCount } = await supabaseClient
        .from("post_likes")
        .select("*", {
            count: "exact",
            head: true
        })
        .eq("post_id", postId);

    const { count: commentCount } = await supabaseClient
        .from("post_comments")
        .select("*", {
            count: "exact",
            head: true
        })
        .eq("post_id", postId);

    return {
        likes: likeCount || 0,
        comments: commentCount || 0
    };
}

async function toggleLike(postId, likeBtn) {
    const {
        data: { user },
        error: userError
    } = await supabaseClient.auth.getUser();

    if (userError || !user) {

        alert("Please login first.");

        return;
    }

    const {
        data: post,
        error: postError
    } = await supabaseClient
        .from("posts")
        .select("user_id")
        .eq("id", postId)
        .single();

    if (postError || !post) {

        console.error(
            "Post owner error:",
            postError
        );

        return;
    }


    // ============================================
    // GET CURRENT USER NAME FROM PROFILESS
    // ============================================

    const {
        data: profile,
        error: profileError
    } = await supabaseClient
        .from("profiless")
        .select("name")
        .eq("id", user.id)
        .single();

    if (profileError) {

        console.error(
            "Profile error:",
            profileError
        );

    }

    const likerName =
        profile?.name || "Someone";


    // ============================================
    // CHECK EXISTING LIKE
    // ============================================

    const {
        data: existingLike,
        error: likeCheckError
    } = await supabaseClient
        .from("post_likes")
        .select("id")
        .eq("post_id", postId)
        .eq("user_id", user.id)
        .maybeSingle();

    if (likeCheckError) {

        console.error(
            "Like check error:",
            likeCheckError
        );

        return;
    }


    // ============================================
    // UNLIKE
    // ============================================

    if (existingLike) {

        const {
            error: unlikeError
        } = await supabaseClient
            .from("post_likes")
            .delete()
            .eq("id", existingLike.id);

        if (unlikeError) {

            console.error(
                "Unlike error:",
                unlikeError
            );

            return;
        }


        // Update UI

        if (likeBtn) {

            likeBtn.classList.remove("liked");

            const icon =
                likeBtn.querySelector("i");

            if (icon) {

                icon.className =
                    "fa-regular fa-heart";

            }

            await updateLikeCount(
                postId,
                likeBtn
            );

        }

        console.log("Post unliked.");

        return;
    }


    // ============================================
    // LIKE POST
    // ============================================

    const {
        error: likeError
    } = await supabaseClient
        .from("post_likes")
        .insert({
            post_id: postId,
            user_id: user.id
        });

    if (likeError) {

        console.error(
            "Like error:",
            likeError
        );

        alert(
            "Unable to like this post."
        );

        return;
    }

    if (likeBtn) {

        likeBtn.classList.add("liked");

        const icon =
            likeBtn.querySelector("i");

        if (icon) {

            icon.className =
                "fa-solid fa-heart";

        }

        await updateLikeCount(
            postId,
            likeBtn
        );

    }


    console.log("Post liked.");
    if (post.user_id === user.id) {

        console.log(
            "Own post liked — notification skipped."
        );

        return;
    }

    await createNotification({

        userId: post.user_id,

        type: "like",

        title:
            `${likerName} liked your post`,

        message:
            `❤️ ${likerName} liked your post.`

    });

}