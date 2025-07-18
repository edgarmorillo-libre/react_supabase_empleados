import { useEffect, useState } from "react";
import EmpleadoForm from "./components/EmpleadoForm";
import EmpleadoList from "./components/EmpleadoList";
import {
  getEmpleados,
  crearEmpleado,
  eliminarEmpleado,
  actualizarEmpleado
} from "./services/api";

function App() {
  const [empleados, setEmpleados] = useState([]);
  const [empleadoEditar, setEmpleadoEditar] = useState(null);

  const cargarEmpleados = async () => {
    const data = await getEmpleados();
    setEmpleados(data);
  };

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const handleAgregar = async (empleado) => {
    if (empleado.id) {
      await actualizarEmpleado(empleado.id, empleado);
    } else {
      await crearEmpleado(empleado);
    }
    setEmpleadoEditar(null);
    cargarEmpleados();
  };

  const handleEliminar = async (id) => {
    await eliminarEmpleado(id);
    cargarEmpleados();
  };

  const handleEditar = (empleado) => {
    setEmpleadoEditar(empleado);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Gestión de Empleados</h1>
      <EmpleadoForm onSubmit={handleAgregar} selectedEmpleado={empleadoEditar} />
      <EmpleadoList empleados={empleados} onEdit={handleEditar} onDelete={handleEliminar} />
    </div>
  );
}

export default App;
