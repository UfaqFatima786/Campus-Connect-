async function loadDashboardUser() {

    console.log("Dashboard JS started");


    try {

        const {
            data: { user },
            error: userError
        } = await supabaseClient.auth.getUser();


        console.log("Current User:", user);


        if (userError) {

            console.error(
                "Auth User Error:",
                userError
            );

            return;
        }
        if (!user) {

            console.log("No logged-in user");

            window.location.href = "login.html";

            return;
        }
        const {
            data: profile,
            error: profileError
        } = await supabaseClient
            .from("profiless")
            .select("name")
            .eq("id", user.id)
            .maybeSingle();
        console.log("Profile:", profile);
        console.log("Profile Error:", profileError);


        if (profileError) {

            console.error(
                "Profile Fetch Error:",
                profileError
            );

            return;
        }
        if (!profile) {

            console.error(
                "No profile found for this user."
            );

            return;
        }
        const fullName =
            profile.name.trim();


        console.log(
            "USER NAME FROM SUPABASE:",
            fullName
        );

        const dashboardName =
            document.getElementById(
                "dashboardName"
            );


        if (dashboardName) {

            dashboardName.textContent =
                `${fullName}! 👋`;

        }

        const navUserName =
            document.getElementById(
                "navUserName"
            );


        if (navUserName) {

            navUserName.textContent =
                fullName;

        }


        // ==========================================
        // CREATE INITIALS
        // ==========================================

        const nameParts =
            fullName
                .split(/\s+/)
                .filter(Boolean);


        let initials;


        if (nameParts.length === 1) {

            initials =
                nameParts[0]
                    .charAt(0)
                    .toUpperCase();

        } else {

            initials =
                nameParts[0]
                    .charAt(0)
                    .toUpperCase()
                +
                nameParts[nameParts.length - 1]
                    .charAt(0)
                    .toUpperCase();

        }


        // ==========================================
        // AVATAR
        // ==========================================

        const userAvatar =
            document.getElementById(
                "userAvatar"
            );


        if (userAvatar) {

            userAvatar.textContent =
                initials;

        }

    }

    catch (error) {

        console.error(
            "Dashboard Error:",
            error
        );

    }

}


// ==========================================
// RUN
// ==========================================

loadDashboardUser();