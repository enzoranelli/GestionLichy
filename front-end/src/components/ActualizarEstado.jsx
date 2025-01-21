import axios from "axios";
import { useState } from "react";

function ActualizarEstado({setHistorial, contenedor, actualizarEstado}){
    const [estado, setEstado] = useState(null);
    const [ubicacion, setUbicacion] = useState(null);
    
    const onSubmit = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:3000/api/contenedorEstado/',{contenedor,ubicacion,estado}).then((response)=>{
            setHistorial(response.data);
            actualizarEstado();
        }).catch((error)=>{
            console.error('Error actualizando la categoria:', error);
        });
    }
    return(
        <form onSubmit={onSubmit}>
            <label>Nuevo estado:</label>
            <input value={estado} onChange={(e)=>{setEstado(e.target.value)}} />
            <label>Nueva ubicacion:</label>
            <input value={ubicacion} onChange={(e)=>{setUbicacion(e.target.value)}} />
            <button >Cambiar estado</button>
        </form>
    );
}
export default ActualizarEstado;