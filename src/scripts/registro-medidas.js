const form = document.querySelector("#measurementModal form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    const data = {
        user_id: user.id, // ← Aquí se añade el ID real
        altura: form.altura.value,
        peso: form.peso.value,
        brazo_izq: form.brazo_izq.value,
        brazo_der: form.brazo_der.value,
        pierna_izq: form.pierna_izq.value,
        pierna_der: form.pierna_der.value,
        cadera: form.cadera.value,
        pecho: form.pecho.value,
    };

    try {
        const res = await fetch("http://localhost:8080/registrar_medidas.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await res.json();
        console.log("Respuesta del servidor:", result);

        document.getElementById("measurementModal").classList.add("hidden");
    } catch (error) {
        console.error("Error al registrar las medidas:", error);
    }

});