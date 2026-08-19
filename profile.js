async function loadProfile() {
    console.log("Profile JS started");
    try {
        const {
            data: { user },
            error: userError
        } = await supabaseClient.auth.getUser();


        console.log("Current User:", user);


        if (userError || !user) {

            window.location.href = "login.html";

            return;

        }
        const {
            data: profile,
            error: profileError
        } = await supabaseClient
            .from("profiless")
            .select("*")
            .eq("id", user.id)
            .single();


        console.log("Profile:", profile);


        if (profileError) {

            console.error(
                "Profile Error:",
                profileError
            );

            Swal.fire({
                icon: "error",
                title: "Profile Error",
                text: profileError.message
            });

            return;

        }
        displayProfile(profile, user);
    }

    catch (error) {

        console.error(
            "Load Profile Error:",
            error
        );

    }

}

function displayProfile(profile, user) {


    const name =
        profile.name || "Student";


    const email =
        profile.email || user.email || "";


    const university =
        profile.university || "";


    const department =
        profile.department || "";


    const semester =
        profile.semester || "";


    const bio =
        profile.bio ||
        "No introduction added yet.";

    const profileName =
        document.getElementById("profileName");


    if (profileName) {

        profileName.textContent =
            name;

    }
    const profileBio =
        document.getElementById("profileBio");


    if (profileBio) {

        profileBio.textContent =
            bio;

    }

    document.getElementById(
        "profileNameInput"
    ).value = name;


    document.getElementById(
        "profileEmailInput"
    ).value = email;


    document.getElementById(
        "profileUniversityInput"
    ).value = university;


    document.getElementById(
        "profileDepartmentInput"
    ).value = department;


    document.getElementById(
        "profileSemesterInput"
    ).value = semester;


    document.getElementById(
        "profileBioInput"
    ).value = profile.bio || "";

    setProfileAvatar(
        name,
        profile.profile_picture
    );

}

function setProfileAvatar(name, imageUrl) {


    const image =
        document.getElementById(
            "profileImage"
        );


    const initials =
        document.getElementById(
            "profileInitials"
        );

    if (imageUrl) {

        image.src = imageUrl;

        image.style.display =
            "block";


        if (initials) {

            initials.style.display =
                "none";

        }

        return;

    }

    if (image) {

        image.style.display =
            "none";

    }


    if (initials) {

        const userInitials =
            name
                .trim()
                .split(/\s+/)
                .map(word =>
                    word.charAt(0)
                )
                .join("")
                .substring(0, 2)
                .toUpperCase();


        initials.textContent =
            userInitials || "S";


        initials.style.display =
            "block";

    }

}

const profileForm =
    document.getElementById(
        "profileForm"
    );


if (profileForm) {


    profileForm.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();


            try {


                const {
                    data: { user },
                    error: userError
                } =
                    await supabaseClient.auth.getUser();


                if (userError || !user) {

                    Swal.fire({
                        icon: "error",
                        title: "Not Logged In",
                        text: "Please login first."
                    });

                    return;

                }

                const name =
                    document.getElementById(
                        "profileNameInput"
                    ).value.trim();


                const university =
                    document.getElementById(
                        "profileUniversityInput"
                    ).value.trim();


                const department =
                    document.getElementById(
                        "profileDepartmentInput"
                    ).value.trim();


                const semester =
                    document.getElementById(
                        "profileSemesterInput"
                    ).value.trim();


                const bio =
                    document.getElementById(
                        "profileBioInput"
                    ).value.trim();



                if (!name) {

                    Swal.fire({
                        icon: "warning",
                        title: "Name Required",
                        text: "Please enter your name."
                    });

                    return;

                }
                const {
                    data,
                    error
                } = await supabaseClient
                    .from("profiless")
                    .update({

                        name: name,

                        university:
                            university,

                        department:
                            department,

                        semester:
                            semester,

                        bio: bio

                    })
                    .eq("id", user.id)
                    .select()
                    .single();



                if (error) {

                    console.error(
                        "Update Error:",
                        error
                    );

                    Swal.fire({
                        icon: "error",
                        title: "Update Failed",
                        text: error.message
                    });

                    return;

                }
                displayProfile(
                    data,
                    user
                );


                Swal.fire({
                    icon: "success",
                    title: "Profile Updated!",
                    text: "Your profile has been updated successfully.",
                    timer: 1800,
                    showConfirmButton: false
                });


            }

            catch (error) {

                console.error(
                    "Update Profile Error:",
                    error
                );

            }

        }
    );
}
const profilePictureInput =
    document.getElementById(
        "profilePictureInput"
    );
if (profilePictureInput) {
    profilePictureInput.addEventListener(
        "change",
        async function () {


            const file =
                this.files[0];


            if (!file) return;

            if (!file.type.startsWith("image/")) {

                Swal.fire({
                    icon: "warning",
                    title: "Invalid File",
                    text: "Please select an image."
                });

                return;

            }
            try {

                const {
                    data: { user },
                    error: userError
                } =
                    await supabaseClient.auth.getUser();


                if (userError || !user) {

                    Swal.fire({
                        icon: "error",
                        title: "Login Required",
                        text: "Please login first."
                    });

                    return;

                }

                const filePath =
                    user.id +
                    "/" +
                    Date.now() +
                    "_" +
                    file.name;
                const {
                    error: uploadError
                } =
                    await supabaseClient.storage
                        .from("profile-pictures")
                        .upload(
                            filePath,
                            file,
                            {
                                upsert: true
                            }
                        );


                if (uploadError) {

                    console.error(
                        "Upload Error:",
                        uploadError
                    );

                    Swal.fire({
                        icon: "error",
                        title: "Upload Failed",
                        text: uploadError.message
                    });

                    return;

                }
                const {
                    data: publicUrlData
                } =
                    supabaseClient.storage
                        .from("profile-pictures")
                        .getPublicUrl(
                            filePath
                        );


                const imageUrl =
                    publicUrlData.publicUrl;

                const {
                    error: updateError
                } =
                    await supabaseClient
                        .from("profiless")
                        .update({
                            profile_picture:
                                imageUrl
                        })
                        .eq(
                            "id",
                            user.id
                        );


                if (updateError) {

                    console.error(
                        "Picture DB Error:",
                        updateError
                    );

                    return;

                }

                document.getElementById(
                    "profileImage"
                ).src = imageUrl;


                document.getElementById(
                    "profileImage"
                ).style.display =
                    "block";


                document.getElementById(
                    "profileInitials"
                ).style.display =
                    "none";


                Swal.fire({
                    icon: "success",
                    title: "Picture Updated!",
                    timer: 1500,
                    showConfirmButton: false
                });


            }

            catch (error) {

                console.error(
                    "Picture Upload Error:",
                    error
                );

            }

        }
    );

}


const deleteProfileBtn =
    document.getElementById(
        "deleteProfileBtn"
    );


if (deleteProfileBtn) {


    deleteProfileBtn.addEventListener(
        "click",
        async function () {


            const result =
                await Swal.fire({

                    icon: "warning",

                    title: "Delete Profile?",

                    text:
                        "This will permanently delete your profile data.",

                    showCancelButton:
                        true,

                    confirmButtonText:
                        "Yes, Delete",

                    cancelButtonText:
                        "Cancel"

                });


            if (!result.isConfirmed) {

                return;

            }



            try {


                const {
                    data: { user },
                    error: userError
                } =
                    await supabaseClient.auth.getUser();


                if (userError || !user) {

                    return;

                }

                const {
                    error
                } =
                    await supabaseClient
                        .from("profiless")
                        .delete()
                        .eq(
                            "id",
                            user.id
                        );


                if (error) {

                    console.error(
                        "Delete Error:",
                        error
                    );

                    Swal.fire({
                        icon: "error",
                        title: "Delete Failed",
                        text: error.message
                    });

                    return;

                }
                await supabaseClient.auth.signOut();
                await Swal.fire({
                    icon: "success",
                    title: "Profile Deleted",
                    text:
                        "Your profile has been deleted.",

                    confirmButtonText:
                        "OK"
                });
                window.location.href =
                    "login.html";
            }

            catch (error) {

                console.error(
                    "Delete Profile Error:",
                    error
                );

            }

        }
    );

}


loadProfile();