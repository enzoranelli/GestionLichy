import '../styles/Contenedor.css'
import { useNavigate } from 'react-router-dom';
function Contenedor({data}){
    const navigate = useNavigate();
    const redirigir = () => { navigate('/contenedor-detalle')}
    return(
        <div className='contenedor-container'>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <h2 className='titulo'> Interno {data.idContenedor}</h2>
                <button onClick={redirigir}>Ver mas detalles</button>
            </div>
            <label> Status: {data.status}</label>
            <br />
            <label><b>Proveedor:</b> {data.proveedor}</label>
            
        </div>
    );
}

export default Contenedor;