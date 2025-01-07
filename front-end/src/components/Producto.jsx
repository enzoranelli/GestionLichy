import '../styles/Producto.css'
function Producto({data}){

    return(
        <div className='producto-container'>
            <p><b>{data.nombre}</b></p>
            <p>Color: <b>{data.color}</b></p>
            <p>Cantidad: <b>{data.cantidad}</b></p>
            <hr></hr>
        </div>
    );
}

export default Producto;