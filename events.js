async function loadEvents() {
    const eventsContainer = document.getElementById("eventsContainer");
    if (!eventsContainer) return;
    eventsContainer.innerHTML = `
        <div class="loading">
            <i class="fa-solid fa-spinner fa-spin"></i>
            Loading events...
        </div>
    `;
    const { data, error } = await supabaseClient
        .from("events")
        .select(`
        *,
        event_registrations(count)
    `)
        .order("event_date", { ascending: true });
    if (error) {
        console.error("Error loading events:", error);
        eventsContainer.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-calendar-xmark"></i>
                <h3>Unable to load events</h3>
                <p>Please try again later.</p>
            </div>
        `;

        return;
    }
    if (!data || data.length === 0) {
        eventsContainer.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-calendar-xmark"></i>
                <h3>No Events Yet</h3>
                <p>There are no events available right now.</p>
            </div>
        `;
        return;
    }
    eventsContainer.innerHTML = data.map(event => {
        const joinedCount =
            event.event_registrations?.[0]?.count || 0;
        let day = "";
        let month = "";
        if (event.event_date) {
            const date = new Date(event.event_date);
            day = date.getDate();
            month = date.toLocaleString("en-US", {
                month: "short"
            }).toUpperCase();
        }
        return `
            <article class="event-card">
                <div 
                    class="event-image event-image-one"
                    ${event.image_url
                ? `style="background-image: url('${event.image_url}');"`
                : ""
            }
                >
                    <span class="event-category">
                        ${event.category || "Campus Event"}
                    </span>
                    <button class="heart-btn">
                        <i class="fa-regular fa-heart"></i>
                    </button>
                </div>
                <div class="event-card-content">
                    <div class="event-card-date">
                        <strong>${day}</strong>
                        <span>${month}</span>
                    </div>
                    <div class="event-card-info">
                        <h3>
                            ${event.title || "Untitled Event"}
                        </h3>
                        <p>
                            ${event.description || "No description available."}
                        </p>
                        <div class="event-meta">
                            <span>
                                <i class="fa-regular fa-clock"></i>
                                ${event.event_time || "Time TBA"}
                            </span>
                            <span>
                                <i class="fa-solid fa-location-dot"></i>
                                ${event.location || "Location TBA"}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="event-card-footer">
                    <div class="participants">
                        <div class="mini-avatar">
                             U
                        </div>
                        <div class="mini-avatar">
                             A
                        </div>
                        <div class="mini-avatar">
                             S
                        </div>
                       <span>
                              ${joinedCount} joined
                       </span>
                    </div>
                    <button 
                          class="join-btn"
                        data-event-id="${event.id}"
                        >
                        Join Event
                    </button>
                </div>
            </article>
        `;
    }).join("");
}

loadEvents();
const eventModal = document.getElementById("eventModal");
const createEventButton = document.querySelector(
    ".event-toolbar .gradient-btn"
);

const closeEventModal = document.getElementById(
    "closeEventModal"
);

if (createEventButton) {
    createEventButton.addEventListener(
        "click",
        () => {
            eventModal.classList.add("active");
        }
    );
}

if (closeEventModal) {
    closeEventModal.addEventListener(
        "click",
        () => {
            eventModal.classList.remove("active");
        }
    );
}

if (eventModal) {

    eventModal.addEventListener(
        "click",
        (e) => {

            if (e.target === eventModal) {

                eventModal.classList.remove(
                    "active"
                );

            }

        }
    );

}


const createEventForm = document.getElementById("createEventForm");

if (createEventForm) {

    createEventForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const submitButton = createEventForm.querySelector(
            ".modal-submit-btn"
        );
        const title = document.getElementById("eventTitle").value.trim();
        const category = document.getElementById("eventCategory").value;
        const location = document.getElementById("eventLocation").value.trim();
        const eventDate = document.getElementById("eventDate").value;
        const eventTime = document.getElementById("eventTime").value;
        const description = document.getElementById("eventDescription").value.trim();
        const {
            data: { user },
            error: userError
        } = await supabaseClient.auth.getUser();

        if (userError || !user) {

            alert("Please login first to create an event.");

            return;
        }
        submitButton.disabled = true;

        submitButton.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Creating Event...
        `;

        const { data, error } = await supabaseClient
            .from("events")
            .insert([
                {
                    title: title,
                    description: description,
                    category: category,
                    event_date: eventDate,
                    event_time: eventTime,
                    location: location,
                    created_by: user.id
                }
            ])
            .select()
            .single();


        if (error) {

            console.error("Create Event Error:", error);

            alert(
                "Event could not be created.\n\n" +
                error.message
            );

            submitButton.disabled = false;

            submitButton.innerHTML = `
                <i class="fa-solid fa-plus"></i>
                Create Event
            `;

            return;
        }

        alert("Event created successfully! 🎉");

        createEventForm.reset();

        eventModal.classList.remove("active");

        submitButton.disabled = false;

        submitButton.innerHTML = `
            <i class="fa-solid fa-plus"></i>
            Create Event
        `;

        loadEvents();

    });
}
document.addEventListener("click", async function (e) {

    const joinButton = e.target.closest(".join-btn");

    if (!joinButton) return;

    const eventId = joinButton.dataset.eventId;

    if (!eventId) {
        console.error("Event ID missing.");
        return;
    }

    const {
        data: { user },
        error: userError
    } = await supabaseClient.auth.getUser();

    if (userError || !user) {
        alert("Please login first to join this event.");
        return;
    }

    joinButton.disabled = true;
    joinButton.textContent = "Joining...";

    const { error } = await supabaseClient
        .from("event_registrations")
        .insert({
            event_id: eventId,
            user_id: user.id
        });

    if (error) {

        console.error("Event Registration Error:", error);

        joinButton.disabled = false;
        joinButton.textContent = "Join Event";

        if (error.code === "23505") {
            alert("You have already joined this event.");
        } else {
            alert("Unable to join event.\n\n" + error.message);
        }

        return;
    }

    alert("You joined the event successfully! 🎉");

    joinButton.textContent = "Joined ✓";
    joinButton.disabled = true;

});