import { useState } from "react";
function DesglozarPorcolor({producto,colores, onColoresAsignadosChange,onCantidadRestanteChange}){
    const [cantidad,setCantidad] = useState(producto.cantidad);
    const [cantidadAsignada, setCantidadAsignada] = useState(0);
    const [cantidadRestante, setCantidadRestante] = useState(producto.cantidad);
    const [coloresAsigandos, setColoresAsignados] = useState([]);
    const [colorSeleccionado, setColorSeleccionado] = useState(0);
    const agregarColor = (color)=>{
        if (cantidadAsignada <= cantidadRestante && cantidadAsignada > 0) {
            // Restar la cantidad asignada de la cantidad restante
            const nuevaCantidadRestante = cantidadRestante - cantidadAsignada;
            setCantidadRestante(nuevaCantidadRestante);
            const nuevosColoresAsignados = [
                ...coloresAsigandos,
                { color, cantidad: cantidadAsignada },
            ];
            // Agregar el color y la cantidad asignada a la lista
            setColoresAsignados([...coloresAsigandos, { color, cantidad: cantidadAsignada }]);
            onColoresAsignadosChange(nuevosColoresAsignados);
            onCantidadRestanteChange(nuevaCantidadRestante);
        } else {
            alert("La cantidad asignada no puede ser mayor que la cantidad restante o menor que 1.");
        }
        
    }

    return(
        <div>
        <label>Cantidad: {cantidadRestante}/{cantidad}</label>
        <label>Color:</label>
        <select onChange={(e) => setColorSeleccionado(e.target.value)}>
            <option value={0}>Sin color</option>
            {colores.map((color) => (
                <option key={color.idColor} value={color.idColor}>
                    {color.nombre}
                </option>
            ))}
        </select>
        <input
            type="number"
            placeholder="Cantidad"
            min="1"
            max={cantidadRestante}
            onChange={(e) => setCantidadAsignada(parseInt(e.target.value))}
        />
        <button onClick={() => agregarColor(colorSeleccionado, cantidadAsignada)}>
            Agregar color
        </button>

        {coloresAsigandos.length > 0 && (
            coloresAsigandos.map((item, index) => (
                <div key={index}>
                    <label>{colores.find((c) => c.idColor === parseInt(item.color)).nombre}</label>
                    <label>Cantidad: {item.cantidad}</label>
                </div>
            ))
        )}
    </div>
    );


}

export default DesglozarPorcolor;