import '../styles/ProductoDetalle.css';
import { useNavigate } from 'react-router-dom';
function ProductoDetalle(){
    const navigate = useNavigate();
    const redirigir = () =>{navigate('/lista-productos')}
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
                    <tr style={{width:'40%', background:'gray'}}>
                        <th>Color</th>
                        <th>Cantidad</th>
                        
                        
                    </tr>
                    <tr>
                        <th>PlaceHolder</th>
                        <th>12</th>
                    </tr>
                    <tr>
                        <th>PlaceHolder</th>
                        <th>1</th>
                    </tr>
                    <tr>
                        <th>PlaceHolder</th>
                        <th>30</th>
                    </tr>
                </table>
                <h2>Producto en contenedores:</h2>
                <table style={{width:'40%', background:'white',marginBottom:'20px',marginTop:'10px'}}>
                    <tr style={{width:'40%', background:'gray'}}>
                        <th>Contenedor</th>
                        <th>Cantidad</th>
                        
                        
                    </tr>
                    <tr>
                        <th>PlaceHolder</th>
                        <th>50</th>
                    </tr>
                    <tr>
                        <th>PlaceHolder</th>
                        <th>14</th>
                    </tr>
                    <tr>
                        <th>PlaceHolder</th>
                        <th>60</th>
                    </tr>
                </table>
            </div>
        </div>
    );
}
export default ProductoDetalle;