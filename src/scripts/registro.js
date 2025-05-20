const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        nombre: form.nombre.value,
        correo: form.correo.value,
        contraseña: form.contraseña.value,
    };

    const res = await fetch(`http://localhost/api_dwit/registrar_usuario.php`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await res.json();
    
});
