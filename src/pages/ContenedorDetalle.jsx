import Producto from '../components/Producto';
import '../styles/ContenedorDetalle.css';
import { useNavigate } from 'react-router-dom';
function ContendorDetalle(){
    const navigate = useNavigate();
    const redirigir = ()=>{
        navigate('/contenedores');
    }
    const data ={idContenedor:24191, factura:'BLD24WU096',status:'LATA-VACIO 07/12', proveedor:'LOTUS', producto:'BENGALINA / LICHY',
        lugar:'EVER FASHION', forwarder:'NB241050560',
    }
    const productos = [{
        nombre: 'CORDERITO SIMPLE',
        color: 'placeholder',
        cantidad: 1
    },
    {
        nombre: 'FLANEL PRINT',
        color: 'placeholder',
        cantidad: 1
    },
    {
        nombre: 'TIMBERLAND',
        color: 'placeholder',
        cantidad: 1
    },]

    return(

        <div className="contenedor-detalle-container">
            <div className='encabezados-container'>
                <h1 className='titulo' >Interno: {data.idContenedor}</h1>
                <div className='contenedor-botones'>
                    <button >Actualizar estado</button>
                    <button onClick={redirigir}>Volver</button>
                   
                </div>
                
            </div>
            
            <hr></hr>
            <div className='encabezados-container'>
                <h1 className='titulo'>Estado: Arribando en 13/10</h1>
                <h1 className='titulo'>Ubicación: LOGISTICA CENTRAL 3/12</h1>
            </div>
            <h3>Estados anteriores:</h3>
            <table style={{width:'40%', background:'white',marginBottom:'20px'}}>
                <tr style={{width:'40%', background:'gray'}}>
                    <th>Estado</th>
                    <th>Ubicación</th>
                    <th>Fecha</th>
                    
                </tr>
                <tr>
                    <th>Llgando</th>
                    <th>Placeholder</th>
                    <th>20/09/24</th>
                </tr>
                <tr>
                    <th>Sin boocking</th>
                    <th>Placeholder</th>
                    <th>12/09/24</th>
                </tr>
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
                productos.map((item)=> (
                    <Producto data={item} />
                ))
            }
            </div>
        </div>
    );
}   
export default ContendorDetalle; 