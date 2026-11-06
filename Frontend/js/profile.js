const token =
    localStorage.getItem("token");

if (!token) {

    window.location.href =
        "Login.html";

}

const profileForm =
    document.getElementById("profileForm");

const logoutBtn =
    document.getElementById("logoutBtn");

async function loadProfile() {

    try {

        const response =
            await fetch(
                "https://web-application-backend-7gd4.onrender.com/api/profile",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        const data =
            await response.json();

        if (!response.ok) {

            document.getElementById(
                "message"
            ).innerText =
                data.message;

            return;
        }

        document.getElementById(
            "welcomeUser"
        ).innerText =
            `Welcome ${data.username}`;

        document.getElementById(
            "username"
        ).value =
            data.username || "";

        document.getElementById(
            "email"
        ).value =
            data.email || "";

        document.getElementById(
            "phone"
        ).value =
            data.phone || "";

        document.getElementById(
            "dob"
        ).value =
            data.dob ?
            data.dob.split("T")[0] :
            "";

    } catch (error) {

        console.log(error);

        document.getElementById(
            "message"
        ).innerText =
            "Could not load profile";

    }

}

loadProfile();

profileForm.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();

        try {

            const response =
                await fetch(
                    "https://web-application-backend-7gd4.onrender.com/api/profile",
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type":
                                "application/json",

                            Authorization:
                                `Bearer ${token}`
                        },

                        body: JSON.stringify({

                            username:
                                document.getElementById("username").value,

                            email:
                                document.getElementById("email").value,

                            phone:
                                document.getElementById("phone").value,

                            dob:
                                document.getElementById("dob").value,

                            newPassword:
                                document.getElementById("newPassword").value

                        })
                    }
                );

            const data =
                await response.json();

            document.getElementById(
                "message"
            ).innerText =
                data.message;

        } catch (error) {

            console.log(error);

            document.getElementById(
                "message"
            ).innerText =
                "Update failed";

        }

    }
);

logoutBtn.addEventListener(
    "click",
    () => {

        localStorage.removeItem(
            "token"
        );

        window.location.href =
            "Login.html";

    }
);