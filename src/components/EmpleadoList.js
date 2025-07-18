export default function EmpleadoList({ empleados, onEdit, onDelete }) {
  return (
    <ul className="list-group">
      {empleados.map((e) => (
        <li key={e.id} className="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <strong>{e.nombre}</strong> ({e.correo}) - Edad: {e.edad}, Salario: ${e.salario}
          </div>
          <div>
            <button onClick={() => onEdit(e)} className="btn btn-sm btn-warning me-2">Editar</button>
            <button onClick={() => onDelete(e.id)} className="btn btn-sm btn-danger">Eliminar</button>
          </div>
        </li>
      ))}
    </ul>
  );
}


