import { useState } from "react";
function Permisos(){

// Estado para almacenar los permisos seleccionados
    const [permisos, setPermisos] = useState({});

// Lista de permisos y acciones
    const acciones = ["Ver", "Editar", "Crear"];
    const opciones = ["Contenedores", "Items", "Productos", "Usuarios"];

    // Manejar cambios en los checkboxes
    const handleCheckboxChange = (accion, opcion) => {
        setPermisos((prev) => ({
            ...prev,
            [`${accion}-${opcion}`]: !prev[`${accion}-${opcion}`]
        }));
    };

    // Función para generar la cadena con los permisos seleccionados
    const handleGuardar = () => {
        const seleccionados = Object.keys(permisos)
            .filter((key) => permisos[key]) // Filtra los seleccionados
            .join(", "); // Convierte en cadena separada por comas

        alert(`Permisos seleccionados: ${seleccionados}`);
    };

    return (
        <div className="permisos-container">
            {acciones.map((accion) => (
                <div key={accion} className={`${accion.toLowerCase()}-container`}>
                    <label>{accion}:</label>
                    {opciones.map((opcion) => (
                        <div key={opcion} className="permiso-opcion">
                            <input
                                type="checkbox"
                                id={`${accion.toLowerCase()}-${opcion.toLowerCase()}`}
                                name={`${accion.toLowerCase()}-${opcion.toLowerCase()}`}
                                checked={!!permisos[`${accion}-${opcion}`]}
                                onChange={() => handleCheckboxChange(accion, opcion)}
                            />
                            <label htmlFor={`${accion.toLowerCase()}-${opcion.toLowerCase()}`}>
                                {opcion}
                            </label>
                        </div>
                    ))}
                </div>
            ))}

            {/* Botón para guardar */}
            <button onClick={handleGuardar}>Guardar Permisos</button>
        </div>
    );
}

export default Permisos;