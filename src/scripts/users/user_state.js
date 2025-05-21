// userState.js
let currentUserId = null;

export function getUserId() {
  // Primero verificar si ya tenemos el ID en memoria
  if (currentUserId) {
    return currentUserId;
  }
  
  // Si no está en memoria, intentar obtener de localStorage
  try {
    if (typeof window !== 'undefined') {
      const userData = SON.parse(localStorage.getItem("user"));
      console.log(userData);
      if (userData) {
        const user = JSON.parse(userData);
        if (user?.id) {
          currentUserId = user.id; // Almacenar en variable global para próximas llamadas
          return user.id;
        }
      }
    }
  } catch (error) {
    console.error("Error al obtener el ID de usuario:", error);
  }
  
  return null;
}

export function setUserId(id) {
  currentUserId = id; // Almacenar en variable global
}