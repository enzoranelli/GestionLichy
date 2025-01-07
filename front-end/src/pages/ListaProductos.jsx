import ProductoLista from "../components/ProductoLista";
import '../styles/ListaProductos.css';

function ListaProductos(){
    
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
        <div className='lista-container'>
            <div className='productos-container'>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                <h1 className="titulo">Lista de productos:</h1>
                <input 
                    className='input-buscar'
                    placeholder="Buscar por nombre"
                />
                </div>
                <label>Categorias :  </label>
                <select  >
                    <option value="Todos">En contenedores</option>
                    <option value="Liberadas total">Sin contenedor</option>
                    
                </select>
                
                <hr></hr>
                {
                    productos.map((item)=> (
                        <ProductoLista data={item} />
                    ))
                }
            </div>
        </div>
    );
}

export default ListaProductos;