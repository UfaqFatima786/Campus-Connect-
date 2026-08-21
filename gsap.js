
// gsap.registerPlugin(ScrollTrigger);

// document.addEventListener("mousemove", function (e) {
//     gsap.to("#pointer", {
//         x: e.clientX - 20,
//         y: e.clientY - 20,
//         duration: 0.3,
//         ease: "power3.out"
//     });
// });

// document.addEventListener("DOMContentLoaded", () => {

//     gsap.set(".logo", {
//         opacity: 0,
//         y: -25
//     });

//     gsap.set(".nav-links a", {
//         opacity: 0,
//         y: -20
//     });

//     gsap.set(".nav-actions", {
//         opacity: 0,
//         x: 25
//     });

//     const tl = gsap.timeline();

//     tl.to(".logo", {
//         opacity: 1,
//         y: 0,
//         duration: 0.8,
//         ease: "power3.out"
//     });

//     tl.to({}, {
//         duration: 2
//     });
//     tl.to(".nav-links a", {
//         opacity: 1,
//         y: 0,
//         duration: 0.4,
//         ease: "power3.out",
//         stagger: 0.45
//     });
//     tl.to(".nav-actions", {
//         opacity: 1,
//         x: 0,
//         duration: 0.6,
//         ease: "power3.out"
//     });

// });
document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // GSAP PAGE ANIMATION
    // ==========================================

    gsap.set([
        ".logo",
        ".nav-links a",
        ".nav-actions",
        ".welcome-content",
        ".welcome-visual",
        ".stat-card",
        ".dashboard-card",
        ".announcement-card",
        ".footer"
    ], {
        opacity: 0
    });


    // ==========================================
    // MAIN TIMELINE
    // ==========================================

    const tl = gsap.timeline({
        defaults: {
            ease: "power3.out"
        }
    });


    // ------------------------------------------
    // 1. LOGO
    // ------------------------------------------

    tl.fromTo(".logo",
        {
            opacity: 0,
            y: -25
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.8
        }
    );


    // Small pause
    tl.to({}, {
        duration: 0.4
    });


    // ------------------------------------------
    // 2. NAVIGATION LINKS
    // ------------------------------------------

    tl.fromTo(".nav-links a",
        {
            opacity: 0,
            y: -18
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.12
        }
    );


    tl.fromTo(".nav-actions",
        {
            opacity: 0,
            x: 25
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.7
        },
        "-=0.25"
    );


    // ------------------------------------------
    // 4. WELCOME CONTENT
    // ------------------------------------------

    tl.fromTo(".welcome-content",
        {
            opacity: 0,
            x: -40
        },
        {
            opacity: 1,
            x: 0,
            duration: 1
        }
    );


    // ------------------------------------------
    // 5. WELCOME VISUAL
    // ------------------------------------------

    tl.fromTo(".welcome-visual",
        {
            opacity: 0,
            scale: 0.85,
            x: 40
        },
        {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 1
        },
        "-=0.7"
    );


    // ------------------------------------------
    // 6. QUICK ACTION BUTTONS
    // ------------------------------------------

    tl.fromTo(".quick-actions a",
        {
            opacity: 0,
            y: 20,
            scale: 0.95
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            stagger: 0.15
        },
        "-=0.4"
    );


    // ------------------------------------------
    // 7. STATS CARDS
    // ------------------------------------------

    tl.fromTo(".stat-card",
        {
            opacity: 0,
            y: 35,
            scale: 0.96
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.12
        },
        "-=0.3"
    );


    // ------------------------------------------
    // 8. DASHBOARD CARDS
    // ------------------------------------------

    tl.fromTo(".dashboard-card",
        {
            opacity: 0,
            y: 35
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.15
        },
        "-=0.25"
    );


    // ------------------------------------------
    // 9. EVENT ITEMS
    // ------------------------------------------

    tl.fromTo(".event-item",
        {
            opacity: 0,
            x: -25
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.12
        },
        "-=0.35"
    );


    // ------------------------------------------
    // 10. NOTIFICATION ITEMS
    // ------------------------------------------

    tl.fromTo(".notification-item",
        {
            opacity: 0,
            x: 25
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.12
        },
        "-=0.4"
    );


    // ------------------------------------------
    // 11. ANNOUNCEMENT
    // ------------------------------------------

    tl.fromTo(".announcement-card",
        {
            opacity: 0,
            y: 30,
            scale: 0.98
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8
        },
        "-=0.2"
    );


    // ------------------------------------------
    // 12. FOOTER
    // ------------------------------------------

    tl.fromTo(".footer",
        {
            opacity: 0,
            y: 15
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.6
        }
    );


    // ==========================================
    // HERO FLOATING ANIMATION
    // ==========================================

    gsap.to(".hero-icon", {
        y: -12,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });


    // ==========================================
    // FLOATING CIRCLES
    // ==========================================

    gsap.to(".circle-one", {
        y: -18,
        x: 10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });


    gsap.to(".circle-two", {
        y: 15,
        x: -12,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });


    // ==========================================
    // BACKGROUND GLOW
    // ==========================================

    gsap.to(".glow-one", {
        x: 40,
        y: 30,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });


    gsap.to(".glow-two", {
        x: -35,
        y: -25,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });


    // ==========================================
    // CARD HOVER EFFECT
    // ==========================================

    const cards = document.querySelectorAll(
        ".stat-card, .dashboard-card, .announcement-card"
    );

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            gsap.to(card, {
                y: -6,
                scale: 1.015,
                duration: 0.3,
                ease: "power2.out"
            });

        });


        card.addEventListener("mouseleave", () => {

            gsap.to(card, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });

        });

    });


    // ==========================================
    // BUTTON HOVER
    // ==========================================

    const buttons = document.querySelectorAll(
        ".gradient-btn, .outline-btn, .small-action, .announcement-btn, .view-link"
    );

    buttons.forEach(button => {

        button.addEventListener("mouseenter", () => {

            gsap.to(button, {
                y: -3,
                scale: 1.04,
                duration: 0.25,
                ease: "power2.out"
            });

        });


        button.addEventListener("mouseleave", () => {

            gsap.to(button, {
                y: 0,
                scale: 1,
                duration: 0.25,
                ease: "power2.out"
            });

        });

    });


    // ==========================================
    // CUSTOM PINK CURSOR
    // ==========================================

    const pointer = document.getElementById("pointer");

    if (pointer && window.innerWidth > 768) {

        gsap.set(pointer, {
            opacity: 0,
            scale: 0
        });


        window.addEventListener("mousemove", (e) => {

            gsap.to(pointer, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.22,
                ease: "power3.out"
            });

            gsap.to(pointer, {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: "back.out(1.7)"
            });

        });


        // Cursor hover
        const interactiveElements = document.querySelectorAll(
            "a, button, .stat-card, .dashboard-card"
        );


        interactiveElements.forEach(element => {

            element.addEventListener("mouseenter", () => {

                gsap.to(pointer, {
                    scale: 1.7,
                    duration: 0.3,
                    ease: "power2.out"
                });

            });


            element.addEventListener("mouseleave", () => {

                gsap.to(pointer, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });

            });

        });

    }

});

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // INITIAL STATES
    // ==========================================

    gsap.set(".logo", {
        opacity: 0,
        y: -25
    });

    gsap.set(".nav-links a", {
        opacity: 0,
        y: -18
    });

    gsap.set(".nav-actions", {
        opacity: 0,
        x: 25
    });

    gsap.set(".page-heading", {
        opacity: 0,
        y: 30
    });

    gsap.set(".event-toolbar", {
        opacity: 0,
        y: 25
    });

    gsap.set(".events-grid", {
        opacity: 0
    });

    gsap.set(".footer", {
        opacity: 0,
        y: 20
    });


    // ==========================================
    // MAIN TIMELINE
    // ==========================================

    const tl = gsap.timeline({
        defaults: {
            ease: "power3.out"
        }
    });


    // ==========================================
    // 1. LOGO
    // ==========================================

    tl.to(".logo", {
        opacity: 1,
        y: 0,
        duration: 0.8
    });


    // ==========================================
    // 2. NAVBAR
    // ==========================================

    tl.to(".nav-links a", {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.12
    }, "-=0.25");


    // ==========================================
    // 3. RIGHT NAV ACTIONS
    // ==========================================

    tl.to(".nav-actions", {
        opacity: 1,
        x: 0,
        duration: 0.7
    }, "-=0.3");


    // ==========================================
    // 4. PAGE HEADING
    // ==========================================

    tl.to(".page-heading", {
        opacity: 1,
        y: 0,
        duration: 0.8
    });


    // ==========================================
    // 5. TOOLBAR
    // ==========================================

    tl.to(".event-toolbar", {
        opacity: 1,
        y: 0,
        duration: 0.7
    }, "-=0.45");


    // ==========================================
    // 6. SEARCH / FILTER / BUTTON
    // ==========================================

    tl.fromTo(
        ".search-box, .filter-select, .event-toolbar .gradient-btn",
        {
            opacity: 0,
            y: 15
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.12
        },
        "-=0.35"
    );


    // ==========================================
    // 7. EVENTS CONTAINER
    // ==========================================

    tl.to(".events-grid", {
        opacity: 1,
        duration: 0.4
    });


    // ==========================================
    // 8. EVENT CARDS
    // ==========================================

    animateEventCards();


    // ==========================================
    // 9. FOOTER
    // ==========================================

    tl.to(".footer", {
        opacity: 1,
        y: 0,
        duration: 0.6
    }, "-=0.2");


    // ==========================================
    // BACKGROUND GLOW
    // ==========================================

    gsap.to(".glow-one", {
        x: 45,
        y: 30,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });


    gsap.to(".glow-two", {
        x: -35,
        y: -25,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });


    // ==========================================
    // EVENT CARD ANIMATION
    // ==========================================

    function animateEventCards() {

        const cards = document.querySelectorAll(
            "#eventsContainer > *"
        );

        if (!cards.length) return;

        gsap.fromTo(
            cards,
            {
                opacity: 0,
                y: 35,
                scale: 0.96
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.65,
                stagger: 0.13,
                ease: "power3.out"
            }
        );

        addCardHover(cards);
    }


    // ==========================================
    // EVENT CARD HOVER
    // ==========================================

    function addCardHover(cards) {

        cards.forEach(card => {

            card.addEventListener("mouseenter", () => {

                gsap.to(card, {
                    y: -7,
                    scale: 1.015,
                    duration: 0.3,
                    ease: "power2.out"
                });

            });


            card.addEventListener("mouseleave", () => {

                gsap.to(card, {
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });

            });

        });

    }


    // ==========================================
    // CREATE EVENT BUTTON
    // ==========================================

    const createButton = document.querySelector(
        ".event-toolbar .gradient-btn"
    );

    const modal = document.getElementById("eventModal");
    const closeModal = document.getElementById("closeEventModal");

    if (createButton && modal) {

        createButton.addEventListener("click", () => {

            gsap.set(modal, {
                display: "flex"
            });

            gsap.fromTo(
                modal,
                {
                    opacity: 0
                },
                {
                    opacity: 1,
                    duration: 0.35,
                    ease: "power2.out"
                }
            );

            gsap.fromTo(
                ".event-modal-content",
                {
                    opacity: 0,
                    scale: 0.85,
                    y: 30
                },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.55,
                    ease: "back.out(1.4)"
                }
            );

        });

    }


    // ==========================================
    // CLOSE MODAL
    // ==========================================

    if (closeModal && modal) {

        closeModal.addEventListener("click", () => {

            gsap.to(".event-modal-content", {
                opacity: 0,
                scale: 0.9,
                y: 20,
                duration: 0.3,
                ease: "power2.in"
            });

            gsap.to(modal, {
                opacity: 0,
                duration: 0.25,
                delay: 0.1,
                onComplete: () => {
                    modal.style.display = "none";
                }
            });

        });

    }


    // ==========================================
    // MODAL FORM INPUT ANIMATION
    // ==========================================

    const modalInputs = document.querySelectorAll(
        "#createEventForm input, #createEventForm select, #createEventForm textarea"
    );

    modalInputs.forEach(input => {

        input.addEventListener("focus", () => {

            gsap.to(input, {
                scale: 1.01,
                duration: 0.2,
                ease: "power2.out"
            });

        });


        input.addEventListener("blur", () => {

            gsap.to(input, {
                scale: 1,
                duration: 0.2
            });

        });

    });
    const cursor = document.querySelector(".custom-cursor");

    if (cursor && window.innerWidth > 768) {

        gsap.set(cursor, {
            opacity: 0,
            scale: 0
        });


        window.addEventListener("mousemove", (e) => {

            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.22,
                ease: "power3.out"
            });

            gsap.to(cursor, {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: "back.out(1.7)"
            });

        });
        const interactiveElements = document.querySelectorAll(
            "a, button, input, select, textarea, .event-card"
        );
        interactiveElements.forEach(element => {

            element.addEventListener("mouseenter", () => {

                gsap.to(cursor, {
                    scale: 1.7,
                    duration: 0.3,
                    ease: "power2.out"
                });

            });


            element.addEventListener("mouseleave", () => {

                gsap.to(cursor, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });

            });

        });

    }

});
document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // INITIAL STATES
    // ==========================================

    gsap.set(".logo", {
        opacity: 0,
        y: -25
    });

    gsap.set(".nav-links a", {
        opacity: 0,
        y: -18
    });

    gsap.set(".nav-actions", {
        opacity: 0,
        x: 25
    });

    gsap.set(".page-heading", {
        opacity: 0,
        y: 30
    });

    gsap.set(".notification-stats", {
        opacity: 0,
        y: 25
    });

    gsap.set(".notification-card", {
        opacity: 0,
        y: 35,
        scale: 0.98
    });

    gsap.set(".footer", {
        opacity: 0,
        y: 20
    });


    // ==========================================
    // MAIN TIMELINE
    // ==========================================

    const tl = gsap.timeline({
        defaults: {
            ease: "power3.out"
        }
    });


    // ==========================================
    // 1. CAMPUS CONNECT LOGO
    // ==========================================

    tl.to(".logo", {
        opacity: 1,
        y: 0,
        duration: 0.8
    });


    // ==========================================
    // 2. NAVIGATION
    // ==========================================

    tl.to(".nav-links a", {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.12
    }, "-=0.25");


    // ==========================================
    // 3. RIGHT SIDE
    // ==========================================

    tl.to(".nav-actions", {
        opacity: 1,
        x: 0,
        duration: 0.7
    }, "-=0.3");


    // ==========================================
    // 4. PAGE HEADING
    // ==========================================

    tl.to(".page-heading", {
        opacity: 1,
        y: 0,
        duration: 0.8
    });


    // ==========================================
    // 5. MARK ALL BUTTON
    // ==========================================

    tl.fromTo(".mark-all-btn",
        {
            opacity: 0,
            scale: 0.9,
            x: 20
        },
        {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 0.55,
            ease: "back.out(1.5)"
        },
        "-=0.5"
    );


    // ==========================================
    // 6. STAT CARDS
    // ==========================================

    tl.to(".notification-stats", {
        opacity: 1,
        y: 0,
        duration: 0.7
    }, "-=0.3");


    tl.fromTo(".mini-stat",
        {
            opacity: 0,
            y: 20,
            scale: 0.95
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            stagger: 0.13,
            ease: "power3.out"
        },
        "-=0.35"
    );


    // ==========================================
    // 7. MAIN NOTIFICATION CARD
    // ==========================================

    tl.to(".notification-card", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8
    }, "-=0.2");


    // ==========================================
    // 8. HEADER + FILTERS
    // ==========================================

    tl.fromTo(
        ".notification-header > div",
        {
            opacity: 0,
            y: 15
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.15
        },
        "-=0.4"
    );


    // ==========================================
    // 9. FOOTER
    // ==========================================

    tl.to(".footer", {
        opacity: 1,
        y: 0,
        duration: 0.6
    });


    // ==========================================
    // BACKGROUND GLOW
    // ==========================================

    gsap.to(".glow-one", {
        x: 45,
        y: 30,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });


    gsap.to(".glow-two", {
        x: -35,
        y: -25,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });


    // ==========================================
    // NOTIFICATION ITEMS
    // ==========================================

    function animateNotifications() {

        const items = document.querySelectorAll(
            "#notificationList .notification-item"
        );

        if (!items.length) return;


        gsap.fromTo(
            items,
            {
                opacity: 0,
                x: -35,
                scale: 0.97
            },
            {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 0.55,
                stagger: 0.1,
                ease: "power3.out"
            }
        );


        // Add hover effects
        items.forEach(item => {

            item.addEventListener("mouseenter", () => {

                gsap.to(item, {
                    x: 6,
                    scale: 1.01,
                    duration: 0.25,
                    ease: "power2.out"
                });

            });


            item.addEventListener("mouseleave", () => {

                gsap.to(item, {
                    x: 0,
                    scale: 1,
                    duration: 0.25,
                    ease: "power2.out"
                });

            });

        });

    }


    // Run after notifications.js has rendered
    setTimeout(() => {
        animateNotifications();
    }, 500);


    // ==========================================
    // FILTER BUTTONS
    // ==========================================

    const filterButtons = document.querySelectorAll(".filter-btn");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            gsap.fromTo(button,
                {
                    scale: 0.9
                },
                {
                    scale: 1,
                    duration: 0.3,
                    ease: "back.out(2)"
                }
            );

        });

    });


    // ==========================================
    // MARK ALL BUTTON
    // ==========================================

    const markAllButton = document.getElementById("markAllRead");

    if (markAllButton) {

        markAllButton.addEventListener("mouseenter", () => {

            gsap.to(markAllButton, {
                y: -3,
                scale: 1.03,
                duration: 0.25,
                ease: "power2.out"
            });

        });


        markAllButton.addEventListener("mouseleave", () => {

            gsap.to(markAllButton, {
                y: 0,
                scale: 1,
                duration: 0.25
            });

        });

    }


    // ==========================================
    // STAT HOVER
    // ==========================================

    document.querySelectorAll(".mini-stat").forEach(stat => {

        stat.addEventListener("mouseenter", () => {

            gsap.to(stat, {
                y: -5,
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out"
            });

        });


        stat.addEventListener("mouseleave", () => {

            gsap.to(stat, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });

        });

    });


    // ==========================================
    // EMPTY STATE
    // ==========================================

    const emptyState = document.getElementById("emptyState");

    if (emptyState) {

        const observer = new MutationObserver(() => {

            if (getComputedStyle(emptyState).display !== "none") {

                gsap.fromTo(emptyState,
                    {
                        opacity: 0,
                        scale: 0.9,
                        y: 20
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 0.6,
                        ease: "back.out(1.5)"
                    }
                );

            }

        });

        observer.observe(emptyState, {
            attributes: true,
            attributeFilter: ["style", "class"]
        });

    }


    // ==========================================
    // CUSTOM PINK CURSOR
    // ==========================================

    const pointer = document.getElementById("pointer");

    if (pointer && window.innerWidth > 768) {

        gsap.set(pointer, {
            opacity: 0,
            scale: 0
        });


        window.addEventListener("mousemove", (e) => {

            gsap.to(pointer, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.22,
                ease: "power3.out"
            });

            gsap.to(pointer, {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: "back.out(1.7)"
            });

        });


        // Cursor becomes bigger on interactive elements

        const interactiveElements = document.querySelectorAll(
            "a, button, .mini-stat, .notification-item"
        );


        interactiveElements.forEach(element => {

            element.addEventListener("mouseenter", () => {

                gsap.to(pointer, {
                    scale: 1.7,
                    duration: 0.3,
                    ease: "power2.out"
                });

            });


            element.addEventListener("mouseleave", () => {

                gsap.to(pointer, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });

            });

        });

    }

});

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // INITIAL STATES
    // ==========================================

    gsap.set(".logo", {
        opacity: 0,
        y: -25
    });

    gsap.set(".nav-links a", {
        opacity: 0,
        y: -18
    });

    gsap.set(".nav-actions", {
        opacity: 0,
        x: 25
    });

    gsap.set(".page-heading", {
        opacity: 0,
        y: 30
    });

    gsap.set(".posts-toolbar", {
        opacity: 0,
        y: 25
    });

    gsap.set(".posts-sidebar", {
        opacity: 0,
        x: 35
    });

    gsap.set(".footer", {
        opacity: 0,
        y: 20
    });


    // ==========================================
    // MAIN TIMELINE
    // ==========================================

    const tl = gsap.timeline({
        defaults: {
            ease: "power3.out"
        }
    });


    // ==========================================
    // 1. LOGO
    // ==========================================

    tl.to(".logo", {
        opacity: 1,
        y: 0,
        duration: 0.8
    });


    // ==========================================
    // 2. NAVIGATION
    // ==========================================

    tl.to(".nav-links a", {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.12
    }, "-=0.25");


    // ==========================================
    // 3. NAV ACTIONS
    // ==========================================

    tl.to(".nav-actions", {
        opacity: 1,
        x: 0,
        duration: 0.7
    }, "-=0.3");


    // ==========================================
    // 4. PAGE HEADING
    // ==========================================

    tl.to(".page-heading", {
        opacity: 1,
        y: 0,
        duration: 0.8
    });


    // ==========================================
    // 5. TOOLBAR
    // ==========================================

    tl.to(".posts-toolbar", {
        opacity: 1,
        y: 0,
        duration: 0.7
    }, "-=0.45");


    // ==========================================
    // 6. SEARCH / FILTER / CREATE
    // ==========================================

    tl.fromTo(
        ".search-box, .filter-select, #openPostModal",
        {
            opacity: 0,
            y: 15
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.12
        },
        "-=0.35"
    );


    // ==========================================
    // 7. SIDEBAR
    // ==========================================

    tl.to(".posts-sidebar", {
        opacity: 1,
        x: 0,
        duration: 0.8
    }, "-=0.3");


    // ==========================================
    // 8. SIDEBAR CARDS
    // ==========================================

    tl.fromTo(
        ".community-card, .trending-card",
        {
            opacity: 0,
            y: 25,
            scale: 0.97
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.15
        },
        "-=0.5"
    );


    // ==========================================
    // 9. TOPICS
    // ==========================================

    tl.fromTo(
        ".topic",
        {
            opacity: 0,
            x: 20
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.45,
            stagger: 0.1
        },
        "-=0.3"
    );


    // ==========================================
    // 10. FOOTER
    // ==========================================

    tl.to(".footer", {
        opacity: 1,
        y: 0,
        duration: 0.6
    });


    // ==========================================
    // BACKGROUND GLOW
    // ==========================================

    gsap.to(".glow-one", {
        x: 45,
        y: 30,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });


    gsap.to(".glow-two", {
        x: -35,
        y: -25,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });


    // ==========================================
    // POST CARDS
    // ==========================================

    function animatePosts() {

        const posts = document.querySelectorAll(
            "#postsContainer .post-card"
        );

        if (!posts.length) return;


        gsap.fromTo(
            posts,
            {
                opacity: 0,
                y: 40,
                scale: 0.97
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.7,
                stagger: 0.14,
                ease: "power3.out"
            }
        );


        addPostHover(posts);
    }


    // ==========================================
    // POST HOVER
    // ==========================================

    function addPostHover(posts) {

        posts.forEach(post => {

            post.addEventListener("mouseenter", () => {

                gsap.to(post, {
                    y: -6,
                    scale: 1.01,
                    duration: 0.3,
                    ease: "power2.out"
                });

            });


            post.addEventListener("mouseleave", () => {

                gsap.to(post, {
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });

            });

        });

    }


    // ==========================================
    // INITIAL POSTS
    // ==========================================

    setTimeout(() => {
        animatePosts();
    }, 500);


    // ==========================================
    // CREATE POST MODAL
    // ==========================================

    const openPostModal =
        document.getElementById("openPostModal");

    const postModal =
        document.getElementById("postModal");

    const closePostModal =
        document.getElementById("closePostModal");


    // ==========================================
    // OPEN MODAL
    // ==========================================

    if (openPostModal && postModal) {

        openPostModal.addEventListener("click", () => {

            gsap.set(postModal, {
                display: "flex"
            });


            gsap.fromTo(
                postModal,
                {
                    opacity: 0
                },
                {
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out"
                }
            );


            gsap.fromTo(
                ".post-modal-content",
                {
                    opacity: 0,
                    scale: 0.85,
                    y: 35
                },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.55,
                    ease: "back.out(1.4)"
                }
            );

        });

    }


    // ==========================================
    // CLOSE MODAL
    // ==========================================

    if (closePostModal && postModal) {

        closePostModal.addEventListener("click", () => {

            gsap.to(".post-modal-content", {
                opacity: 0,
                scale: 0.9,
                y: 20,
                duration: 0.3,
                ease: "power2.in"
            });


            gsap.to(postModal, {
                opacity: 0,
                duration: 0.25,
                delay: 0.1,
                onComplete: () => {

                    postModal.style.display = "none";

                }
            });

        });

    }


    // ==========================================
    // FORM INPUT FOCUS
    // ==========================================

    const formInputs = document.querySelectorAll(
        "#createPostForm input, #createPostForm textarea"
    );


    formInputs.forEach(input => {

        input.addEventListener("focus", () => {

            gsap.to(input, {
                scale: 1.01,
                duration: 0.2,
                ease: "power2.out"
            });

        });


        input.addEventListener("blur", () => {

            gsap.to(input, {
                scale: 1,
                duration: 0.2
            });

        });

    });


    // ==========================================
    // POST ACTION BUTTONS
    // ==========================================

    document.querySelectorAll(".post-action").forEach(button => {

        button.addEventListener("mouseenter", () => {

            gsap.to(button, {
                y: -2,
                scale: 1.05,
                duration: 0.2,
                ease: "power2.out"
            });

        });


        button.addEventListener("mouseleave", () => {

            gsap.to(button, {
                y: 0,
                scale: 1,
                duration: 0.2
            });

        });

    });


    // ==========================================
    // CUSTOM PINK CURSOR
    // ==========================================

    const pointer = document.getElementById("pointer");

    if (pointer && window.innerWidth > 768) {

        gsap.set(pointer, {
            opacity: 0,
            scale: 0
        });


        window.addEventListener("mousemove", (e) => {

            gsap.to(pointer, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.22,
                ease: "power3.out"
            });


            gsap.to(pointer, {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: "back.out(1.7)"
            });

        });


        // ======================================
        // CURSOR HOVER
        // ======================================

        const interactiveElements = document.querySelectorAll(
            "a, button, input, textarea, select, .post-card, .topic"
        );


        interactiveElements.forEach(element => {

            element.addEventListener("mouseenter", () => {

                gsap.to(pointer, {
                    scale: 1.7,
                    duration: 0.3,
                    ease: "power2.out"
                });

            });


            element.addEventListener("mouseleave", () => {

                gsap.to(pointer, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });

            });

        });

    }

});