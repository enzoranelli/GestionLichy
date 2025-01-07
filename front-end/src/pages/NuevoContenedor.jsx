import '../styles/NuevoContenedor.css';
function NuevoContenedor(){
    return(
        <div className='nuevo-contenedor-container'>
            <h1 className='titulo'>Agregar contenedor</h1>
            <hr></hr>
            <div className='input-container'>
                <label htmlFor='interno'>
                    Interno:  
                </label>
                <input id='interno' type='text' />
            </div>
            <div className='input-container'>
                <label htmlFor='interno'>
                    Producto:  
                </label>
                <input id='producto' type='text' />
            </div>
            <div className='input-container'>
                <label htmlFor='interno'>
                    Lugar:  
                </label>
                <input id='lugar' type='text' />
            </div>
            <div className='input-container'>
                <label htmlFor='interno'>
                    Status:  
                </label>
                <input id='status' type='text' />
            </div>
            <div className='input-container'>
                <label htmlFor='interno'>
                   Forwarder:  
                </label>
                <input id='forwarder' type='text' />
            </div>
            <div className='input-container'>
                <label htmlFor='interno'>
                   Forwarder:  
                </label>
                <input id='status' type='text' />
            </div>
            <div className='input-container'>
                <label htmlFor='interno'>
                  Comentarios:  
                </label>
                <input id='comentarios' type='text' />
            </div>
            <button>Agregar nuevo contenedor</button>
        </div>
    );
}

export default NuevoContenedor;