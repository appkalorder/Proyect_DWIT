const form = document.querySelector("form");
const HOST = import.meta.env.HOST;

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        nombre: form.nombre.value,
        correo: form.correo.value,
        contraseña: form.contraseña.value,
    };

    const res = await fetch(`${HOST}api_dwit/registrar_usuario.php`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await res.json();
    
});
