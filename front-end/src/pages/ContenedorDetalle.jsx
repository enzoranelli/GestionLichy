import Producto from '../components/Producto';
import '../styles/ContenedorDetalle.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import ActualizarCategoria from '../components/ActualizarCategoria';
function ContendorDetalle(){
    const navigate = useNavigate();
    const redirigir = ()=>{
        navigate('/contenedores');
    }
    const [mostrarActualizarCategoria, setMostrarActualizarCategoria] = useState(false);
    const [productos, setProductos] = useState([]);
    const [data, setData]= useState(null);
    const [historial, setHistorial] = useState(null);
    const {id} = useParams();

    const actualizarCategoria = ()=>{
        setMostrarActualizarCategoria(true);
    };
    useEffect(()=>{
        console.log(id)
        axios.get(`http://localhost:3000/api/contenedores/contenedor-detalle/${id}`).then((response)=>{
            setData(response.data[0]);
            console.log(response.data);
        });
        axios.get(`http://localhost:3000/api/contenedorEstado/${id}`).then((response)=>{
            console.log(response.data); 
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
                    data ? 
                    <>
                    <> 
                        <h1 className='titulo' >Interno: {data.idContenedor}</h1>
                        <h1 className='titulo'>Categoria: {data.categoria}</h1>
                    </>
                    
                    
                    
                
                <div>
                    {
                        mostrarActualizarCategoria ?
                         <ActualizarCategoria 
                            id={id} 
                            setMostrarActualizarCategoria={setMostrarActualizarCategoria} 
                            setData={setData}
                            categoria={data.categoria}
                            /> : 
                        <button onClick={actualizarCategoria}>Cambiar categoria</button>
                    }
                         
                    <button onClick={redirigir}>Volver</button> 

                </div>
                </>
                :<></>
                }
            </div>
            
            <hr></hr>
            <div className='encabezados-container'>
                <h1 className='titulo'>Estado: {historial && historial[0] ? historial[0].estado : 'Sin estado'}</h1>
                <h1 className='titulo'>Ubicación: {historial && historial[0] ? historial[0].ubicacion : 'Sin ubicacion'}</h1>
                <button>Editar</button>
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
            <hr></hr>
            <div className='encabezados-container'>
                <h2>Detalles</h2>
                <button>Editar</button>
            </div>
            
            {
                data ? <div className='detalles-container'>
                    <div>
                        <h3 className='titulo'>Proveedor: </h3>
                        <label>{data.nombre}</label>
                    </div>
                    <div>
                        <h3 className='titulo'>Factura: </h3>
                        <label>{data.factura}</label>
                    </div>
                    <div>
                        <h3 className='titulo'>Forwarder: </h3>
                        <label>{data.forwarder ? data.forwarder : 'Sin forwarder'}</label>
                    </div>
                    <div>
                        <h3 className='titulo'>Comentario: </h3>
                        <label>{data.comentario ? data.comentario : 'Sin comentarios'}</label>
                    </div>
                    <div>
                        <h3 className='titulo'>Sira: </h3>
                        <label>{data.sira ? data.sira : 'Sin sira'}</label>
                    </div>
                    <div>
                        <h3 className='titulo'>Vep: </h3>
                        <label>{data.vep ? data.vep : 'Sin vep'}</label>
                    </div>
                    <div>
                        <h3 className='titulo'>Codigo contenedor: </h3>
                        <label>{data.codigoContenedor ? data.codigoContenedor : 'Sin codigo de contenedor'}</label>
                    </div>
                    
                </div>:<></>
            }
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