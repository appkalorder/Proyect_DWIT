const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        correo: form.correo.value,
        contraseña: form.contraseña.value,
    };

    const res = await fetch(`http://localhost:8080/login_usuario.php`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const user = await res.json();

    switch(res.status){
        case 200:
            console.log(JSON.stringify(user));
            localStorage.setItem("user", JSON.stringify(user))
            window.location.href = "/";
    }
});
