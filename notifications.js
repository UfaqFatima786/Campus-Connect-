let currentUser = null;
let allNotifications = [];
let currentFilter = "all";
async function getCurrentUser() {

    const {
        data: { user },
        error
    } = await supabaseClient.auth.getUser();

    if (error) {
        console.error("Authentication error:", error);
        return null;
    }

    return user;
}
async function loadUserProfile() {

    if (!currentUser) return;

    const { data, error } = await supabaseClient
        .from("profiless")
        .select("name")
        .eq("id", currentUser.id)
        .single();

    if (error) {
        console.error("Profile error:", error);
        return;
    }

    if (data) {

        const name = data.name || "Student";

        const navName =
            document.getElementById("navUserName");

        if (navName) {
            navName.textContent = name;
        }

        const avatar =
            document.getElementById("userAvatar");

        if (avatar) {
            avatar.textContent = getInitials(name);
        }
    }
}

function getInitials(name) {

    return name
        .split(" ")
        .map(word => word.charAt(0))
        .join("")
        .substring(0, 2)
        .toUpperCase();
}

async function loadNotifications() {

    const list =
        document.getElementById("notificationList");

    if (!list) return;

    list.innerHTML = `
        <div class="loading-state">
            <i class="fa-solid fa-spinner fa-spin"></i>
            <p>Loading notifications...</p>
        </div>
    `;

    currentUser = await getCurrentUser();

    if (!currentUser) {

        showEmptyState(
            "Please login to view your notifications."
        );

        return;
    }


    const {
        data,
        error
    } = await supabaseClient

        .from("notifications")

        .select("*")

        .eq("user_id", currentUser.id)

        .order("created_at", {
            ascending: false
        });


    if (error) {

        console.error(
            "Notifications error:",
            error
        );

        list.innerHTML = `
            <div class="loading-state">

                <i class="fa-solid fa-triangle-exclamation"></i>

                <p>
                    Unable to load notifications.
                </p>

            </div>
        `;

        return;
    }


    allNotifications = data || [];

    updateStats();

    renderNotifications();
}


// ==========================================
// UPDATE STATS
// ==========================================

function updateStats() {

    const total =
        allNotifications.length;

    const unread =
        allNotifications.filter(
            notification =>
                notification.is_read === false
        ).length;


    const totalElement =
        document.getElementById(
            "totalNotifications"
        );

    const unreadElement =
        document.getElementById(
            "unreadNotifications"
        );

    const latestElement =
        document.getElementById(
            "latestActivity"
        );


    if (totalElement) {
        totalElement.textContent = total;
    }


    if (unreadElement) {
        unreadElement.textContent = unread;
    }


    if (latestElement) {

        if (allNotifications.length > 0) {

            latestElement.textContent =
                formatShortTime(
                    allNotifications[0].created_at
                );

        } else {

            latestElement.textContent = "—";
        }
    }


    const dot =
        document.getElementById(
            "notificationDot"
        );


    if (dot) {

        dot.style.display =
            unread > 0
                ? "block"
                : "none";
    }
}


// ==========================================
// RENDER NOTIFICATIONS
// ==========================================

function renderNotifications() {

    const list =
        document.getElementById(
            "notificationList"
        );

    if (!list) return;


    let notifications =
        [...allNotifications];


    if (currentFilter === "unread") {

        notifications =
            notifications.filter(
                notification =>
                    notification.is_read === false
            );
    }


    if (notifications.length === 0) {

        list.style.display = "none";

        document.getElementById(
            "emptyState"
        ).style.display = "block";

        return;
    }


    document.getElementById(
        "emptyState"
    ).style.display = "none";


    list.style.display = "block";


    list.innerHTML =
        notifications
            .map(notification =>
                createNotification(notification)
            )
            .join("");
}

function createNotification(notification) {

    const icon =
        getNotificationIcon(
            notification.type
        );
    const time =
        formatNotificationTime(
            notification.created_at
        );


    return `

        <div
            class="notification-item
            ${notification.is_read ? "" : "unread"}"

            data-id="${notification.id}"

            onclick="
                markAsRead('${notification.id}')
            "
        >

            <div
                class="notification-icon
                ${icon.className}"
            >

                <i class="${icon.icon}"></i>

            </div>


            <div class="notification-content">

                <h4>
                    ${escapeHTML(
                        notification.title ||
                        notification.message ||
                        "New notification"
                    )}
                </h4>


                ${
                    notification.message
                        ? `
                            <p class="notification-message">
                                ${escapeHTML(
                                    notification.message
                                )}
                            </p>
                          `
                        : ""
                }


                <p>
                    ${time}
                </p>

            </div>

        </div>
    `;
}


// ==========================================
// NOTIFICATION ICON
// ==========================================

function getNotificationIcon(type) {

    switch (type) {

        case "like":

            return {
                icon: "fa-solid fa-heart",
                className: "like-icon"
            };


        case "comment":

            return {
                icon: "fa-solid fa-comment",
                className: "comment-icon"
            };


        case "event":

            return {
                icon: "fa-solid fa-user-plus",
                className: "event-icon"
            };


        case "announcement":

            return {
                icon: "fa-solid fa-bullhorn",
                className: "announce-icon"
            };


        default:

            return {
                icon: "fa-regular fa-bell",
                className: "comment-icon"
            };
    }
}


// ==========================================
// MARK ONE AS READ
// ==========================================

async function markAsRead(id) {

    const notification =
        allNotifications.find(
            item => item.id === id
        );


    if (!notification) return;


    if (notification.is_read) return;


    const { error } =
        await supabaseClient

            .from("notifications")

            .update({
                is_read: true
            })

            .eq("id", id);


    if (error) {

        console.error(
            "Mark read error:",
            error
        );

        return;
    }


    notification.is_read = true;

    updateStats();

    renderNotifications();
}


// ==========================================
// MARK ALL AS READ
// ==========================================

async function markAllAsRead() {

    if (!currentUser) return;


    const unread =
        allNotifications.filter(
            notification =>
                notification.is_read === false
        );


    if (unread.length === 0) return;


    const { error } =
        await supabaseClient

            .from("notifications")

            .update({
                is_read: true
            })

            .eq(
                "user_id",
                currentUser.id
            )

            .eq(
                "is_read",
                false
            );


    if (error) {

        console.error(
            "Mark all read error:",
            error
        );

        return;
    }


    allNotifications =
        allNotifications.map(
            notification => ({
                ...notification,
                is_read: true
            })
        );


    updateStats();

    renderNotifications();
}


// ==========================================
// TIME FORMAT
// ==========================================

function formatNotificationTime(
    dateString
) {

    const date =
        new Date(dateString);

    const now =
        new Date();

    const seconds =
        Math.floor(
            (now - date) / 1000
        );


    if (seconds < 60) {
        return "Just now";
    }


    if (seconds < 3600) {

        const minutes =
            Math.floor(seconds / 60);

        return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    }


    if (seconds < 86400) {

        const hours =
            Math.floor(seconds / 3600);

        return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    }


    if (seconds < 604800) {

        const days =
            Math.floor(seconds / 86400);

        return `${days} day${days !== 1 ? "s" : ""} ago`;
    }


    return date.toLocaleDateString(
        "en-US",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );
}


// ==========================================
// SHORT TIME
// ==========================================

function formatShortTime(dateString) {

    const date =
        new Date(dateString);

    const now =
        new Date();

    const seconds =
        Math.floor(
            (now - date) / 1000
        );


    if (seconds < 60) {
        return "Now";
    }


    if (seconds < 3600) {
        return `${Math.floor(seconds / 60)}m`;
    }


    if (seconds < 86400) {
        return `${Math.floor(seconds / 3600)}h`;
    }


    return `${Math.floor(seconds / 86400)}d`;
}


// ==========================================
// ESCAPE HTML
// ==========================================

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }


    return String(value)

        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


// ==========================================
// FILTER BUTTONS
// ==========================================

document
    .querySelectorAll(".filter-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".filter-btn"
                    )
                    .forEach(btn =>
                        btn.classList.remove(
                            "active"
                        )
                    );


                button.classList.add("active");


                currentFilter =
                    button.dataset.filter;


                renderNotifications();
            }
        );

    });


// ==========================================
// MARK ALL BUTTON
// ==========================================

const markAllButton =
    document.getElementById(
        "markAllRead"
    );


if (markAllButton) {

    markAllButton.addEventListener(
        "click",
        markAllAsRead
    );
}


// ==========================================
// EMPTY STATE
// ==========================================

function showEmptyState(message) {

    const list =
        document.getElementById(
            "notificationList"
        );


    if (list) {
        list.style.display = "none";
    }


    const empty =
        document.getElementById(
            "emptyState"
        );


    if (empty) {

        empty.style.display = "block";


        const paragraph =
            empty.querySelector("p");


        if (paragraph) {
            paragraph.textContent = message;
        }
    }
}

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await loadNotifications();

        await loadUserProfile();

    }
);