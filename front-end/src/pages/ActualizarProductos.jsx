import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ActualizarProductos(){
    const {id} = useParams();
    const [contenedorProducto, setContendorProducto] = useState(null);
    const [colores, setColores] = useState([]);
    const [color, setColor] = useState(false);
    const [producto, setProducto] = useState(null);
    const [productos, setProductos] = useState([]);
    const nav = useNavigate();
    const volver = ()=>{
        nav(`/contenedor-detalle/${contenedorProducto[0].contenedor}`);
    }
    useEffect(()=>{
        axios.get(`http://localhost:3000/api/contenedorProducto/producto/${id}`).then((response)=>{
            console.log(response.data[0]);
            setContendorProducto(response.data[0]);
            setColor(response.data[0].idColor);
            setProducto(response.data[0].idProducto);
           
        }).catch((error)=>{
            console.error("Error trayendo producto de contenedor:", error);
        });
        axios.get('http://localhost:3000/api/items/color').then((response)=>{
            setColores(response.data);
        }).catch((error)=>{
            console.error("Error trayendo colores:", error);
        });
        axios.get('http://localhost:3000/api/items/color').then((response)=>{
            setColores(response.data);
        });
        axios.get('http://localhost:3000/api/items/producto').then((response)=>{
            setProductos(response.data);
        });
    },[]);
    useEffect(()=>{
        axios.get
    },[contenedorProducto]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductoActualizado({
            ...productoActualizado,
            [name]: value,
        });
    };
    return (
        <div className='nuevo-contenedor-container'>
            <button onClick={volver}>Volver</button>
            {
                !contenedorProducto ? <p>Cargando...</p> :<>
                <h1  className='titulo'> Actualizar (producto) de contendor {id}</h1>
                <div className='input-container'>
                    <label>Producto:</label>
                    <select name='idProducto' value={contenedorProducto.idProducto || ''} onChange={handleInputChange}>
                        <option value=''>Seleccionar producto</option>
                        {productos.map((prod) => (
                                    <option key={prod.idProducto} value={prod.idProducto}>
                                        {prod.nombre}
                                    </option>
                                ))}
                    </select>
                </div>
                <div className='input-container'>
                <label>Color:</label>
                {
                    color ? 
                    <select value={contenedorProducto.idColor || ''} onChange={handleInputChange}>
                        <option value=''>Seleccionar color</option>
                        {colores.map((color) => (
                            <option key={color.idColor} value={color.idColor}>
                                {color.nombre}
                            </option>))}
                    </select> : 
                    <label>Desglozar por color</label>
                }
                </div>
                <div className='input-container'>
                    <label>Cantidad:</label>
                    <input 
                        type='number'
                        name='cantidad' 
                        value={contenedorProducto.cantidad || ''}
                        onChange={handleInputChange} />
                </div>
                <div className='input-container'>
                    <label>Unidad:</label>
                    <select
                        type='text'
                        name='unidad'
                        value={contenedorProducto.unidad || ''}
                        onChange={handleInputChange}
                    >
                        <option value='' disabled>Seleccionar unidad</option>
                        <option value='m'>m</option>
                        <option value='kg'>kg</option>
                        <option value='uni'>uni</option>
                    </select>
                </div>
                <div className='input-container'>
                    <label>FOB:</label>
                    <input 
                        type='number' 
                        name='precioPorUnidad' 
                        placeholder='Precio por unidad' 
                        value={contenedorProducto.precioPorUnidad || ''} 
                        onChange={handleInputChange} 
                    />
                </div>
                <div className='input-container'>
                    <label htmlFor='fob'>Item Proveedor:</label>
                    <input type='text' name='item_proveedor'  value={contenedorProducto.item_proveedor || ''} /> 
                </div>
                <div className='input-container'>
                    <label>Motivo de actualizacion:</label>
                    <input></input>
                </div>
            </>
            }
           
            
            <button>Actualizar</button>
        </div>
    );
}

export default ActualizarProductos;