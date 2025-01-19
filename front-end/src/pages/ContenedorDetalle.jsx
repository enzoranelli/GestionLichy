import Producto from '../components/Producto';
import '../styles/ContenedorDetalle.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
function ContendorDetalle(){
    const navigate = useNavigate();
    const redirigir = ()=>{
        navigate('/contenedores');
    }
    const [productos, setProductos] = useState([]);
    const [data, setData]= useState(null);
    const [historial, setHistorial] = useState([]);
    const {id} = useParams();
    useEffect(()=>{
        console.log(id)
        axios.get(`http://localhost:3000/api/contenedores/contenedor-detalle/${id}`).then((response)=>{
            setData(response.data[0]);
            console.log(response.data);
        });
        axios.get(`http://localhost:3000/api/contenedorEstado/${id}`).then((response)=>{
            setHistorial(response.data);
        });
        axios.get(`http://localhost:3000/api/contenedorProducto/${id}`).then((response)=>{
            setProductos(response.data);
        });

    },[]);
    return(

        <div className="contenedor-detalle-container">
            <div className='encabezados-container'>
                {
                    data ? <h1 className='titulo' >Interno: {data.idContenedor}</h1>:<></>
                }
                
                <div className='contenedor-botones'>
                    <button >Actualizar estado</button>
                    <button onClick={redirigir}>Volver</button>
                   
                </div>
                
            </div>
            
            <hr></hr>
            <div className='encabezados-container'>
                <h1 className='titulo'>Estado: {historial ? historial[0].estado : 'Sin estado'}</h1>
                <h1 className='titulo'>Ubicación: {historial ? historial[0].ubicacion : 'Sin ubicacion'}</h1>
            </div>
            <h3>Estados anteriores:</h3>
            <table style={{width:'40%', background:'white',marginBottom:'20px'}}>
                
                <tr style={{width:'40%', background:'gray'}}>
                    <th>Estado</th>
                    <th>Ubicación</th>          
                </tr>
                {
                    historial ? historial.map((item)=>(
                        <tr>
                            <th>{item.estado}</th>
                            <th>{item.ubicacion}</th>
                            
                        </tr>
                    )):<></>
                }
                
            </table>
            <h3 className='titulo'>Comentario</h3>
                <label>DASSA - COSCO SHIPPING RHINE - TRP (19/11) - FORZ 27/11 - TLAT 25/11 - VACIO ?</label>
                <button>Cambiar comentario</button>
            <hr></hr>
            <div className='encabezados-container' >
                <h3>Productos:</h3>
                <button> Editar lista</button>
            </div>
            <div className='productos-lista'>
            {
                productos ? productos.map((item)=> (
                    <Producto data={item} />
                )) : <></>
            }
            </div>
        </div>
    );
}   
export default ContendorDetalle; 