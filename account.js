async function signup() {
    const name =
        document.getElementById("signup-name")
            .value
            .trim();
    const signupEmail =
        document.getElementById("signup-email")
            .value
            .trim();
    const signupPassword =
        document.getElementById("signup-password")
            .value;
    const confirmPassword =
        document.getElementById("signup-confirm-password")
            .value;
    const university =
        document.getElementById("signup-university")
            .value
            .trim();
    const department =
        document.getElementById("signup-department")
            .value
            .trim();
    const semester =
        document.getElementById("signup-semester")
            .value
            .trim();
    if (
        name === "" ||
        signupEmail === "" ||
        signupPassword === "" ||
        confirmPassword === ""
    ) {
        Swal.fire({
            icon: "warning",
            title: "Missing Fields",
            text: "Please fill all required fields."
        });
        return;
    }

    if (signupPassword !== confirmPassword) {
        Swal.fire({
            icon: "warning",
            title: "Password Mismatch",
            text: "Passwords do not match."
        });
        return;
    }

    if (signupPassword.length < 6) {
        Swal.fire({
            icon: "warning",
            title: "Weak Password",
            text: "Password must be at least 6 characters."
        });
        return;
    }

    try {

        const {
            data,
            error
        } = await supabaseClient.auth.signUp({
            email: signupEmail,
            password: signupPassword
        });
        console.log("Signup Data:", data);
        console.log("Signup Error:", error);
        if (error) {
            Swal.fire({
                icon: "error",
                title: "Signup Failed",
                text: error.message
            });
            return;
        }

        const user = data.user;
        if (!user) {
            Swal.fire({
                icon: "error",
                title: "Signup Error",
                text: "User account was not created."
            });
            return;
        }

        const {
            error: profileError
        } = await supabaseClient
            .from("profiless")
            .insert([
                {
                    id: user.id,
                    name: name,
                    email: signupEmail,
                    university: university,
                    department: department,
                    semester: semester
                }
            ]);
        if (profileError) {
            console.error(
                "Profile Creation Error:",
                profileError
            );
            Swal.fire({
                icon: "error",
                title: "Profile Creation Failed",
                text: profileError.message
            });
            return;
        }

        await Swal.fire({
            icon: "success",
            title: "Account Created!",
            text: `Welcome ${name}! Your account has been created successfully.`,
            confirmButtonText: "Go to Login"
        });

        window.location.href = "login.html";
    }

    catch (error) {
        console.error(
            "Signup Error:",
            error
        );

        Swal.fire({
            icon: "error",
            title: "Something went wrong",
            text: error.message
        });
    }
}

async function login() {

    const loginEmail =
        document.getElementById("login-email").value.trim();

    const loginPass =
        document.getElementById("login-password").value;

    if (loginEmail === "" || loginPass === "") {

        Swal.fire({
            icon: "warning",
            title: "Empty Fields",
            text: "Please enter email and password"
        });

        return;
    }

    try {

        const { data, error } =
            await supabaseClient.auth.signInWithPassword({
                email: loginEmail,
                password: loginPass
            });

        console.log("Login Data:", data);
        console.log("Login Error:", error);

        if (error) {

            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: error.message
            });

            return;
        }

        Swal.fire({
            icon: "success",
            title: "Login Successful",
            text: "Welcome back!"
        }).then(() => {

            window.location.href = "dashboard.html";

        });

    } catch (error) {
        console.error("Login Error:", error);
        Swal.fire({
            icon: "error",
            title: "Something went wrong",
            text: error.message
        });
    }
}
function tosignup() {
    window.location.href = "signup.html";
}
function tologin() {

    window.location.href = "login.html";

}