import '../styles/Producto.css'
import { useNavigate } from "react-router-dom";
function ProductoLista({data}){
    const navigate = useNavigate();
    const redirigir = ()=>{navigate('/producto-detalle')}
    return(
        <div className='producto-container'>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <p><b>{data.nombre}</b></p>
                <button onClick={redirigir}>Ver mas detalles</button>
            </div>
            

            <p>Color: <b>{data.color}</b></p>
            
            <hr></hr>
        </div>
    );
}

export default ProductoLista;