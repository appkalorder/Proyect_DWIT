const form = document.querySelector("form");
const user = JSON.parse(localStorage.getItem("user") || "{}");

// Pre-fill form with user data
if (user.id) {
    Object.keys(user).forEach(key => {
        if (form[key]) {
            form[key].value = user[key];
        }
    });
}

try {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = {
            id: user.id,
            nombre: form.nombre.value,
            correo: form.correo.value,
            fecha_nacimiento: form.fecha_nacimiento.value,
            años_entrenando: form.años_entrenando.value
        };

        // Add password only if it was changed
        if (form.contraseña?.value) {
            data.contraseña = form.contraseña.value;
        }

        const res = await fetch(`http://localhost:8080/actualizar_usuario.php`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const responseData = await res.json();

        switch(res.status) {
            case 200:
                localStorage.setItem("user", JSON.stringify(responseData));
                alert("Usuario actualizado correctamente");
                window.location.href = "/";
                break;
            case 409:
                alert("Este correo ya está registrado por otro usuario");
                break;
            case 422:
                alert("Por favor complete todos los campos requeridos");
                break;
            case 400:
                alert(responseData.error || "Error en los datos enviados");
                break;
            default:
                alert("Error al actualizar usuario");
                break;
        }
    });
} catch(e) {
    console.error("Error al actualizar usuario", e);
    alert("Error al actualizar usuario");
}