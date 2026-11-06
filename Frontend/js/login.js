const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {

        const response = await fetch(
            "https://web-application-backend-7gd4.onrender.com/api/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            }
        );

        const data = await response.json();

        if (response.ok) {

            localStorage.setItem(
                "token",
                data.token
            );

            window.location.href =
                "profile.html";

        } else {

            document.getElementById(
                "errorMessage"
            ).innerText = data.message;

        }

    } catch (error) {

        console.log(error);

    }

});