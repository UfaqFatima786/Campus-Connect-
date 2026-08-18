async function loadStudyPartners() {

    const partnersContainer =
        document.getElementById("partnersContainer");

    if (!partnersContainer) return;

    partnersContainer.innerHTML = `
        <div class="loading">
            Loading study partners...
        </div>
    `;

    const {
        data: partners,
        error
    } = await supabaseClient
        .from("study_partners")
        .select("*")
        .order("created_at", {
            ascending: false
        });

    if (error) {

        console.error(
            "Study Partners Error:",
            error
        );
        partnersContainer.innerHTML = `
            <div class="empty-state">

                <h3>
                    Unable to load study partners
                </h3>

                <p>
                    Please try again later.
                </p>

            </div>
        `;

        return;
    }


    // No partners

    if (!partners || partners.length === 0) {

        partnersContainer.innerHTML = `
            <div class="empty-state">

                <h3>
                    No Study Partners Yet
                </h3>

                <p>
                    No students have created a study partner profile yet.
                </p>

            </div>
        `;

        return;
    }


    // =========================================
    // CREATE PARTNER CARDS
    // =========================================

    partnersContainer.innerHTML = partners.map(
        partner => {


            // -----------------------------
            // SUBJECTS
            // -----------------------------

            const subjectsHTML =
                partner.subjects &&
                    partner.subjects.length

                    ? partner.subjects.map(
                        subject => `
                            <span>
                                ${subject}
                            </span>
                        `
                    ).join("")

                    : `
                        <span>
                            No subjects
                        </span>
                    `;


            // -----------------------------
            // SKILLS
            // -----------------------------

            const skillsHTML =
                partner.skills &&
                    partner.skills.length

                    ? partner.skills.map(
                        skill => `
                            <span>
                                ${skill}
                            </span>
                        `
                    ).join("")

                    : `
                        <span>
                            No skills
                        </span>
                    `;


            // -----------------------------
            // AVATAR
            // -----------------------------
            const avatarLetter =
                partner.name
                    ? partner.name
                        .trim()
                        .charAt(0)
                        .toUpperCase()
                    : "S";


            // -----------------------------
            // AVAILABILITY CLASS
            // -----------------------------

            let availabilityClass =
                "available";

            const availability =
                partner.availability || "";


            if (
                availability
                    .toLowerCase()
                    .includes("busy")
            ) {

                availabilityClass = "busy";

            }


            // -----------------------------
            // CARD
            // -----------------------------

            return `

                <article
                    class="partner-card"
                    data-partner-id="${partner.id}"
                >


                    <div class="partner-top">

                       <div class="partner-avatar purple-avatar">

    ${partner.profile_picture
                    ? `
                <img
                    src="${partner.profile_picture}"
                    alt="${partner.name || "Study Partner"}"
                    class="partner-profile-image"
                >
            `
                    : `
                ${avatarLetter}
            `
                }

</div>


                        <span
                            class="availability ${availabilityClass}"
                        >

                            <i class="fa-solid fa-circle"></i>

                            ${partner.availability ||
                "Availability not set"
                }

                        </span>

                    </div>
                <h3>
                       ${partner.name || "Study Partner"}
                </h3>
                    <p class="partner-role">

                        ${partner.experience_level ||
                "Student"
                }

                    </p>


                    <p class="partner-intro">

                        ${partner.introduction ||
                "No introduction provided."
                }

                    </p>


                    <!-- SUBJECTS -->

                    <div class="partner-section">

                        <span class="partner-label">
                            SUBJECTS
                        </span>


                        <div class="partner-tags">

                            ${subjectsHTML}

                        </div>

                    </div>


                    <!-- SKILLS -->

                    <div class="partner-section">

                        <span class="partner-label">
                            SKILLS
                        </span>


                        <div class="partner-tags purple-tags">

                            ${skillsHTML}

                        </div>

                    </div>


                    <!-- FOOTER -->

                    <div class="partner-footer">

                        <span>

                            <i class="fa-solid fa-chart-simple"></i>

                            ${partner.experience_level ||
                "Not specified"
                }

                        </span>


                        <button
                            type="button"
                            class="connect-btn"
                            data-partner-id="${partner.id}"
                        >

                            Connect

                        </button>

                    </div>


                </article>

            `;

        }
    ).join("");
}

function filterStudyPartners() {

    const searchInput =
        document.querySelector(".search-box input");

    const filters =
        document.querySelectorAll(".filter-select");

    const subjectFilter = filters[0];
    const skillFilter = filters[1];
    const experienceFilter = filters[2];


    const searchValue =
        searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";


    const subjectValue =
        subjectFilter
            ? subjectFilter.value
            : "All Subjects";


    const skillValue =
        skillFilter
            ? skillFilter.value
            : "All Skills";


    const experienceValue =
        experienceFilter
            ? experienceFilter.value
            : "Experience Level";


    const cards =
        document.querySelectorAll(".partner-card");


    cards.forEach(card => {

        const text =
            card.innerText.toLowerCase();


        const matchesSearch =
            !searchValue ||
            text.includes(searchValue);


        const matchesSubject =
            subjectValue === "All Subjects" ||
            text.includes(
                subjectValue.toLowerCase()
            );


        const matchesSkill =
            skillValue === "All Skills" ||
            text.includes(
                skillValue.toLowerCase()
            );


        const matchesExperience =
            experienceValue === "Experience Level" ||
            text.includes(
                experienceValue.toLowerCase()
            );


        if (
            matchesSearch &&
            matchesSubject &&
            matchesSkill &&
            matchesExperience
        ) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

}


// =========================================
// SEARCH EVENTS
// =========================================

document.addEventListener(
    "input",
    function (e) {

        if (
            e.target.matches(
                ".search-box input"
            )
        ) {

            filterStudyPartners();

        }

    }
);



// =========================================
// FILTER EVENTS
// =========================================

document.addEventListener(
    "change",
    function (e) {

        if (
            e.target.matches(
                ".filter-select"
            )
        ) {

            filterStudyPartners();

        }

    }
);



// =========================================
// CONNECT BUTTON
// =========================================

document.addEventListener(
    "click",
    function (e) {

        const connectButton =
            e.target.closest(
                ".connect-btn"
            );


        if (!connectButton) return;


        alert(
            "Please login to connect with this study partner."
        );

    }
);



loadStudyPartners();
const addProfileBtn =
    document.getElementById("addProfileBtn");

const profileModal =
    document.getElementById("profileModal");

const closeProfileModal =
    document.getElementById("closeProfileModal");

const studyPartnerForm =
    document.getElementById("studyPartnerForm");


// OPEN MODAL

if (addProfileBtn) {

    addProfileBtn.addEventListener(
        "click",
        function () {

            profileModal.classList.add("show");

        }
    );

}


// CLOSE MODAL

if (closeProfileModal) {

    closeProfileModal.addEventListener(
        "click",
        function () {

            profileModal.classList.remove("show");

        }
    );

}

if (profileModal) {

    profileModal.addEventListener(
        "click",
        function (e) {

            if (e.target === profileModal) {

                profileModal.classList.remove("show");

            }

        }
    );

}

// =========================================
// CREATE STUDY PARTNER PROFILE
// =========================================

if (studyPartnerForm) {

    studyPartnerForm.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();


            const name =
                document.getElementById(
                    "partnerName"
                ).value.trim();


            const profilePicture =
                document.getElementById(
                    "partnerPicture"
                ).value.trim();


            const subjects =
                document.getElementById(
                    "partnerSubjects"
                ).value
                    .split(",")
                    .map(item => item.trim())
                    .filter(Boolean);


            const skills =
                document.getElementById(
                    "partnerSkills"
                ).value
                    .split(",")
                    .map(item => item.trim())
                    .filter(Boolean);


            const experience =
                document.getElementById(
                    "partnerExperience"
                ).value;


            const availability =
                document.getElementById(
                    "partnerAvailability"
                ).value.trim();


            const introduction =
                document.getElementById(
                    "partnerIntroduction"
                ).value.trim();


            // INSERT INTO SUPABASE

            const {
                data,
                error
            } = await supabaseClient
                .from("study_partners")
                .insert([

                    {
                        // user_id: null,
                        name: name,
                        profile_picture:
                            profilePicture || null,
                        subjects: subjects,
                        skills: skills,
                        experience_level:
                            experience,
                        availability:
                            availability,
                        introduction:
                            introduction
                    }

                ])
                .select();


            if (error) {

                console.error(
                    "Create Study Partner Error:",
                    error
                );

                alert(
                    "Unable to create profile: " +
                    error.message
                );

                return;

            }


            alert(
                "Study partner profile created successfully!"
            );


            // RESET FORM

            studyPartnerForm.reset();


            // CLOSE MODAL

            profileModal.classList.remove(
                "show"
            );


            // RELOAD CARDS

            loadStudyPartners();

        }
    );

}