import '../styles/ProductoDetalle.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import axios from 'axios';
import ConfirmarEliminar from '../components/ConfirmarEliminar';
function ProductoDetalle(){
    const navigate = useNavigate();

    const {producto} = useParams();
    const [cantidadPorColor, setCantidadPorColor] = useState([]);
    const [cantidadPorContenedor, setCantidadPorContenedor] = useState([]);
    const [cantidadTotal, setCantidadTotal] = useState(0);
    const [filtro, setFiltro] = useState('');
    const [estados, setEstados] = useState([]);
    const [ubicaciones, setUbicaciones] = useState([]);
    const redirigir = () =>{navigate('/ver-productos')};
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
        axios.get(`http://localhost:3000/api/producto/cantidad-total/${producto}`).then((response)=>{
            console.log(response.data)
            setCantidadTotal(response.data[0].cantidad_total)
        }).catch((error)=>{
            console.error("Error trayendo productos sin contenedor:", error);
        });
        axios.get('http://localhost:3000/api/items/categorias').then((response)=>{
            setEstados(response.data);
        }).catch((error)=>{
            console.error("Error trayendo estados:", error);
        });
        axios.get('http://localhost:3000/api/items/ubicaciones').then((response)=>{ 
            setUbicaciones(response.data);
        }
        ).catch((error)=>{
            console.error("Error trayendo ubicaciones:", error);
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
                <label>Filtrar:</label>
                <select onChange={(e)=>setFiltro(e.target.value)}>
                    <option value='color'>Color</option>
                    <option value='ubicacion'>Ubicacion</option>
                    <option value='estado'>Estado</option>
                </select>
                {
                    filtro === 'estado' && estados ? 
                        <select>
                            {
                                estados.map((item, index)=>(
                                    <option key={index} value={item.nombreCategoria}>{item.nombreCategoria}</option>
                                ))
                            }
                        </select> : filtro === 'ubicacion' && ubicaciones ? 
                        <select>
                            {
                                ubicaciones.map((item, index)=>(
                                    <option key={index} value={item.nombreUbicacion}>{item.nombreUbicacion}</option>
                                ))
                            }
                        </select> : null
                }
                <button>Filtrar</button>
                <h2 className='titulo'>Cantidad total: {cantidadTotal}  </h2>
                <h2 className='titulo'>Cantidad por {filtro}: </h2>
                <table style={{width:'40%', background:'white',marginBottom:'20px',marginTop:'10px'}}>
                    <thead>
                        <tr style={{ background: 'gray' }}>
                            <th>Color</th>
                            <th>Cantidad</th>
                        </tr>
                    </thead>
        	        <tbody>
                    {
                        cantidadPorColor.length>=1 ? cantidadPorColor.map((item, index)=>(
                            <tr key={index}>
                                <th >{item.nombreColor}</th>
                                <th>{item.total_cantidad+' '+item.unidad}</th>
                            </tr>
                        )) : <tr><th>No hay colores</th></tr>
                    }
                    </tbody>
                    
                    
                </table>
                <h2>Producto en contenedores:</h2>
                <table style={{width:'40%', background:'white',marginBottom:'20px',marginTop:'10px'}}>
                    <thead>
                    <tr style={{width:'40%', background:'gray'}}>
                        <th>Contenedor</th>
                        <th>Cantidad</th>  
                        <th>Color</th>
                        <th>Item proveedor</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        cantidadPorContenedor.map((item, index)=>(
                            <tr key={index}>
                                <th >{item.contenedor}</th>
                                <th>{item.cantidad ? `${item.cantidad} ${item.unidad}`: 'Sin cantidad'}</th>
                                <th>{item.nombre ? item.nombre : 'Sin color'}</th>
                                <th>{item.item_proveedor ? item.item_proveedor : 'Sin item proveedor'}</th>
                                <td><button style={{width:'100%'}}onClick={()=>redirigirContenedor(item.contenedor)}>Ver contenedor</button></td>
                            </tr>
                        ))
                    }
                      </tbody>
                </table>
                <ConfirmarEliminar tipo={'producto'} id={producto}/>
            </div>
        </div>
    );
}
export default ProductoDetalle;