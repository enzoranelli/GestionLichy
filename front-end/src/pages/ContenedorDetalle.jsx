import Producto from '../components/Producto';
import '../styles/ContenedorDetalle.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import ActualizarCategoria from '../components/ActualizarCategoria';
import ActualizarEstado from '../components/ActualizarEstado';
import ActualizarDetalles from './ActualizarDetalles';
import ConfirmarEliminar from '../components/ConfirmarEliminar';
import AgregarProducto from '../components/AgregarProducto';
function ContendorDetalle({user}){
    const navigate = useNavigate();
    const redirigir = (ruta)=>{
        navigate(ruta);
    }
    const [mostrarActualizarEstado, setMostrarActualizarEstado] = useState(false);
    const [mostrarActualizarCategoria, setMostrarActualizarCategoria] = useState(false);
    const [mostrarActualizarDetalles, setMostrarActualizarDetalles] = useState(false);
    const [productos, setProductos] = useState([]);
    const [data, setData]= useState(null);
    const [historial, setHistorial] = useState(null);
    const {id} = useParams();
    const [agregarProducto, setAgregarProducto] = useState(false);
    const actualizarProductoEnLista = (nuevaListaProductos) => {
        setProductos(nuevaListaProductos);
    };

    const actualizarCategoria = ()=>{
        setMostrarActualizarCategoria(true);
    };
    const actualizarEstado = (estado)=>{
        if(mostrarActualizarEstado){
            setData(prevData => ({
                ...prevData,
                categoria: estado
            }));
            setMostrarActualizarEstado(false)

        }else{
            setMostrarActualizarEstado(true);
        }
    };
    const actualizarDetalles = () =>{
        if(mostrarActualizarDetalles){
            setMostrarActualizarDetalles(false)
        }else{
        setMostrarActualizarDetalles(true);
        }
    }
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
                        <h1 className='titulo'>Estado: {data.categoria}</h1>
                    </>
                <div>
                    
                         
                    <button onClick={()=>redirigir('/ver-contenedores')}>Volver</button> 

                </div>
                </>
                :<></>
                }
            </div>
            
            <hr></hr>
            <div className='encabezados-container'>
                <h1 className='titulo'>Fecha: {historial && historial[0] ? historial[0].fechaHora : 'Sin estado'}</h1>
                <h1 className='titulo'>Ubicación: {historial && historial[0] ? historial[0].ubicacion : 'Sin ubicacion'}</h1>
                {
                    mostrarActualizarEstado ? <button onClick={actualizarEstado}>Cancelar</button> : 
                    user.permisos["Editar-Contenedores"] ?
                    <button onClick={actualizarEstado}>Agregar nuevo estado</button> : <></>
                }
            </div>
            
            <h3>Estados anteriores:</h3>
                
           <div className='historial-form-container'>
           
            <table style={{width:'40%', background:'white',marginBottom:'20px'}}>
                
                <tr style={{width:'40%', background:'gray'}}>
                    <th>Estado</th>
                    <th>Ubicación</th>
                    <th>Fecha</th>          
                </tr>
                {
                    historial && historial.length > 1 ? historial.map((item)=>(
                        <tr>
                            <th>{item.estado}</th>
                            <th>{item.ubicacion}</th>
                            <th>{item.fechaHora}</th>
                        </tr>
                    )):<>
                        <th>No hay estados anteriores</th>
                    
                    </>
                }
        
            </table>
            {
                mostrarActualizarEstado ? <ActualizarEstado
                    setHistorial={setHistorial} 
                    contenedor={id} 
                    actualizarEstado={actualizarEstado}
                    estad={ historial[0].estado}
                    ubicacio={ historial[0].ubicacion}

                    
                    /> : <></>
            }
            </div>
            <hr></hr>
            <div className='encabezados-container' >
                <h3>Productos:</h3>
                <button onClick={()=>setAgregarProducto(true)}> Agregar producto</button>
            </div>
            <div className='productos-lista'>
            {
                productos ? productos.map((item)=> (
                    <Producto user={user} key={item.idContenedorProductos} producto={item} contenedor={id} onActualizar={actualizarProductoEnLista} setProducto={setProductos}/>
                )) : <></>
            }
            {
                agregarProducto ? <AgregarProducto contenedor={id} setAgregarProducto={setAgregarProducto } actualizarLista={setProductos}/> : <></>
            }
            </div>
            
           <hr></hr>
           <div className='encabezados-container'>
                <h2>Detalles</h2>
                {
                    user.permisos["Editar-Contenedores"] ?
                    <button onClick={actualizarDetalles}>{mostrarActualizarDetalles ? 'Cancelar': 'Editar detalles'}</button>: <></>}
            </div>
            
            {
                data ? 
                <>                <div className='detalles-container'>
                    <div>
                        <h3 className='titulo'>Proveedor: </h3>
                        <label className={mostrarActualizarDetalles ? 'no-mostrar' : ''}>{data.nombre}</label>
                    </div>
                    <div>
                        <h3 className='titulo'>Factura: </h3>
                        <label className={mostrarActualizarDetalles ? 'no-mostrar' : ''}>{data.factura}</label>
                    </div>
                    <div>
                        <h3 className='titulo'>Forwarder: </h3>
                        <label className={mostrarActualizarDetalles ? 'no-mostrar' : ''}>{data.forwarder ? data.forwarder : 'Sin forwarder'}</label>
                    </div>
                    <div>
                        <h3 className='titulo'>Comentario: </h3>
                        <label className={mostrarActualizarDetalles ? 'no-mostrar' : ''}>{data.comentario ? data.comentario : 'Sin comentarios'}</label>
                    </div>
                    <div>
                        <h3 className='titulo'>Sira: </h3>
                        <label className={mostrarActualizarDetalles ? 'no-mostrar' : ''}>{data.sira ? data.sira : 'Sin sira'}</label>
                    </div>
                    <div>
                        <h3 className='titulo'>Vep: </h3>
                        <label className={mostrarActualizarDetalles ? 'no-mostrar' : ''}>{data.vep ? data.vep : 'Sin vep'}</label>
                    </div>
                    <div>
                        <h3 className='titulo'>Codigo contenedor: </h3>
                        <label className={mostrarActualizarDetalles ? 'no-mostrar' : ''}>{data.codigoContenedor ? data.codigoContenedor : 'Sin codigo de contenedor'}</label>
                    </div>
                    
                </div>
                <div className='detalles-container'>
                    {
                        mostrarActualizarDetalles && data ? <ActualizarDetalles data={data} setData={setData} actualizarDetalles={actualizarDetalles}/> : <></>
                    }
                    
                </div>
                    
                </>:<></>
            }
            <hr></hr>
            { 
                user.permisos["Editar-Contenedores"] ?
                <ConfirmarEliminar id={id} tipo={'contenedor'}/> :<></>
            }
        </div>
    );
}   
export default ContendorDetalle; 