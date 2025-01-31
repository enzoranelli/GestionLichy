import '../styles/ProductoDetalle.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import axios from 'axios';
function ProductoDetalle(){
    const navigate = useNavigate();

    const {producto} = useParams();
    const [cantidadPorColor, setCantidadPorColor] = useState([]);
    const [cantidadPorContenedor, setCantidadPorContenedor] = useState([]);
    const redirigir = () =>{navigate('/lista-productos')};
    const redirigirContenedor = (contenedor)=>{navigate(`/contenedor-detalle/${contenedor}`)};
    useEffect(()=>{
        axios.get(`http://localhost:3000/api/producto/cantidad-por-color/${producto}`).then((response)=>{
            console.log(response.data)
            setCantidadPorColor(response.data)
        }).catch((error)=>{
            console.error("Error trayendo productos sin contenedor:", error);
        });
        axios.get(`http://localhost:3000/api/producto/cantidad-por-contenedor/${producto}`).then((response)=>{
            console.log(response.data)
            setCantidadPorContenedor(response.data)
        }).catch((error)=>{
            console.error("Error trayendo productos sin contenedor:", error);
        });
    },[]);
    return(
        <div className='contenedor-producto-detalle'>
            <div className='producto-detalle'>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <h1 className='titulo'>Detalle de Corderito Simple</h1>
                    <button onClick={redirigir}> Volver</button>
                </div>
                <hr></hr>
                <h2 className='titulo'>Cantidad total: 1234</h2>
                <h2 className='titulo'>Cantidad por colores: </h2>
                <table style={{width:'40%', background:'white',marginBottom:'20px',marginTop:'10px'}}>
                    <thead>
                        <tr style={{ background: 'gray' }}>
                            <th>Color</th>
                            <th>Cantidad</th>
                        </tr>
                    </thead>
        	        <tbody>
                    {
                        cantidadPorColor.map((item, index)=>(
                            <tr key={index}>
                                <th >{item.nombreColor}</th>
                                <th>{item.total_cantidad+' '+item.unidad}</th>
                            </tr>
                        ))
                    }
                    </tbody>
                    
                    
                </table>
                <h2>Producto en contenedores:</h2>
                <table style={{width:'40%', background:'white',marginBottom:'20px',marginTop:'10px'}}>
                    <thead>
                    <tr style={{width:'40%', background:'gray'}}>
                        <th>Contenedor</th>
                        <th>Cantidad</th>  
                    </tr>
                    </thead>
                    <tbody>
                    {
                        cantidadPorContenedor.map((item, index)=>(
                            <tr key={index}>
                                <th >{item.contenedor}</th>
                                <th>{item.cantidad+' '+item.unidad}</th>
                                <th>{item.color}</th>
                                <td><button onClick={()=>redirigirContenedor(item.contenedor)}>Ver contenedor</button></td>
                            </tr>
                        ))
                    }
                      </tbody>
                </table>
            </div>
        </div>
    );
}
export default ProductoDetalle;