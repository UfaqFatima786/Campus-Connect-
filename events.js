// async function loadEvents() {

//     const eventsContainer = document.getElementById("eventsContainer");

//     if (!eventsContainer) return;

//     eventsContainer.innerHTML = `
//         <div class="loading">
//             Loading events...
//         </div>
//     `;

//     const { data, error } = await supabaseClient
//         .from("events")
//         .select("*")
//         .order("event_date", { ascending: true });

//     if (error) {
//         console.error("Error loading events:", error);

//         eventsContainer.innerHTML = `
//             <div class="empty-state">
//                 <h3>Unable to load events</h3>
//                 <p>Please try again later.</p>
//             </div>
//         `;

//         return;
//     }

//     if (!data || data.length === 0) {
//         eventsContainer.innerHTML = `
//             <div class="empty-state">
//                 <h3>No Events Yet</h3>
//                 <p>There are no events available right now.</p>
//             </div>
//         `;

//         return;
//     }

//     eventsContainer.innerHTML = data.map(event => `
        
//         <div class="event-card">

//             ${
//                 event.image_url
//                     ? `<img src="${event.image_url}" alt="${event.title}">`
//                     : ""
//             }

//             <div class="event-content">

//                 <span class="event-category">
//                     ${event.category || "Campus Event"}
//                 </span>

//                 <h3>${event.title}</h3>

//                 <p>
//                     ${event.description || "No description available."}
//                 </p>

//                 <div class="event-info">

//                     <span>📅 ${event.event_date || ""}</span>

//                     <span>⏰ ${event.event_time || ""}</span>

//                     <span>📍 ${event.location || ""}</span>

//                 </div>

//             </div>

//         </div>

//     `).join("");
// }

// loadEvents();

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
        .select("*")
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

        // Format date
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
                            0 joined
                        </span>

                    </div>


                    <button class="join-btn">
                        Join Event
                    </button>

                </div>

            </article>

        `;

    }).join("");
}


loadEvents();



// =========================================
// CREATE EVENT MODAL
// =========================================

const eventModal = document.getElementById("eventModal");

const createEventButton = document.querySelector(
    ".event-toolbar .gradient-btn"
);

const closeEventModal = document.getElementById(
    "closeEventModal"
);


// OPEN MODAL

if (createEventButton) {

    createEventButton.addEventListener(
        "click",
        () => {

            eventModal.classList.add("active");

        }
    );

}


// CLOSE MODAL

if (closeEventModal) {

    closeEventModal.addEventListener(
        "click",
        () => {

            eventModal.classList.remove("active");

        }
    );

}


// CLOSE WHEN CLICKING OUTSIDE

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


// =========================================
// CREATE EVENT
// =========================================

const createEventForm = document.getElementById("createEventForm");

if (createEventForm) {

    createEventForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const submitButton = createEventForm.querySelector(
            ".modal-submit-btn"
        );

        // Get form values
        const title = document.getElementById("eventTitle").value.trim();
        const category = document.getElementById("eventCategory").value;
        const location = document.getElementById("eventLocation").value.trim();
        const eventDate = document.getElementById("eventDate").value;
        const eventTime = document.getElementById("eventTime").value;
        const description = document.getElementById("eventDescription").value.trim();

        // Check login
        const {
            data: { user },
            error: userError
        } = await supabaseClient.auth.getUser();

        if (userError || !user) {

            alert("Please login first to create an event.");

            return;
        }

        // Button loading
        submitButton.disabled = true;

        submitButton.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Creating Event...
        `;


        // Insert event
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


        // Success
        alert("Event created successfully! 🎉");

        // Reset form
        createEventForm.reset();

        // Close modal
        eventModal.classList.remove("active");

        // Restore button
        submitButton.disabled = false;

        submitButton.innerHTML = `
            <i class="fa-solid fa-plus"></i>
            Create Event
        `;

        // Reload events
        loadEvents();

    });
}