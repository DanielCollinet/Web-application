const registerForm =
document.getElementById("registerForm");

registerForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();

        const username =
        document.getElementById("username").value;

        const email =
        document.getElementById("email").value;

        const phone =
        document.getElementById("phone").value;

        const dob =
        document.getElementById("dob").value;

        const password =
        document.getElementById("password").value;

        try {

            const response =
            await fetch(
                "https://web-application-backend-7gd4.onrender.com/api/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        phone,
                        dob,
                        password
                    })
                }
            );

            const data =
            await response.json();

            document.getElementById(
                "message"
            ).innerText =
            data.message;

            if (response.ok) {

                window.location.href =
                "Login.html";

            }

        } catch (error) {

            console.log(error);

        }

    }
);