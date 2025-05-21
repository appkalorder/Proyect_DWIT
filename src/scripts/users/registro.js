const form = document.querySelector("form");
const HOST = import.meta.env.HOST;
try{
    
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
    
        const data = {
            nombre: form.nombre.value,
            correo: form.correo.value,
            contraseña: form.contraseña.value,
            fecha_nacimiento: form.fecha_nacimiento.value,
            años_entrenando: form.años_entrenando.value,
        };
    
        const res = await fetch(`http://localhost:8080/registrar_usuario.php`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    
        const user = await res.json();
    
        switch(res.status){
            case 201:
                console.log(JSON.stringify(user));
                localStorage.setItem("user", JSON.stringify(user))
                window.location.href = "/";
        }
    });
} catch(e){
    console.error("Error al registrar usuario", e);
    alert("Error al registrar usuario");
}
