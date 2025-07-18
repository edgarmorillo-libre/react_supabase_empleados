const API_URL = "http://127.0.0.1:8000"; // Cambiar si está desplegado

export async function getEmpleados() {
    const res = await fetch(`${API_URL}/empleados`);
    return await res.json();
}

export async function getEmpleado(id) {
    const res = await fetch(`${API_URL}/empleados/${id}`);
    return await res.json();
}

export async function crearEmpleado(data) {
    const res = await fetch(`${API_URL}/empleados`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || "Error en la solicitud al crear empleado");
    }

    return await res.json();
}


export async function actualizarEmpleado(id, data) {
    const res = await fetch(`${API_URL}/empleados/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || "Error al actualizar empleado");
    }

    return await res.json();
}


export async function eliminarEmpleado(id) {
    await fetch(`${API_URL}/empleados/${id}`, { method: "DELETE" });
}


