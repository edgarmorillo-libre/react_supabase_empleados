import { useState, useEffect } from "react";

export default function EmpleadoForm({ onSubmit, selectedEmpleado }) {
  const [empleado, setEmpleado] = useState({
    nombre: "",
    correo: "",
    edad: "",
    salario: ""
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedEmpleado) {
      setEmpleado(selectedEmpleado);
      setError("");
    }
  }, [selectedEmpleado]);

  const handleChange = e => {
    setEmpleado({ ...empleado, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");

    // Validaciones básicas
    if (!empleado.nombre || !empleado.correo || !empleado.edad || !empleado.salario) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(empleado.correo)) {
      setError("Correo electrónico inválido.");
      return;
    }

    const edad = parseInt(empleado.edad, 10);
    const salario = parseFloat(empleado.salario);

    if (isNaN(edad) || edad < 18 || edad > 65) {
      setError("La edad debe ser un número entre 18 y 65.");
      return;
    }

    if (isNaN(salario) || salario <= 0) {
      setError("El salario debe ser un número positivo.");
      return;
    }

    const empleadoFinal = {
      ...empleado,
      edad,
      salario
    };

    try {
      await onSubmit(empleadoFinal);
      setEmpleado({ nombre: "", correo: "", edad: "", salario: "" });
    } catch (err) {
      setError("Error al enviar los datos. Verifica la conexión con el servidor.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      {error && <div className="alert alert-danger">{error}</div>}

      <input
        className="form-control mb-2"
        placeholder="Nombre"
        name="nombre"
        value={empleado.nombre}
        onChange={handleChange}
      />
      <input
        className="form-control mb-2"
        placeholder="Correo"
        name="correo"
        value={empleado.correo}
        onChange={handleChange}
      />
      <input
        className="form-control mb-2"
        placeholder="Edad"
        name="edad"
        value={empleado.edad}
        onChange={handleChange}
        type="number"
      />
      <input
        className="form-control mb-2"
        placeholder="Salario"
        name="salario"
        value={empleado.salario}
        onChange={handleChange}
        type="number"
      />
      <button className="btn btn-primary w-100" type="submit">
        {selectedEmpleado ? "Actualizar" : "Agregar"} Empleado
      </button>
    </form>
  );
}
