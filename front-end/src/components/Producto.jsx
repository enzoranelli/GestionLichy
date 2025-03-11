import { useEffect, useState } from 'react';
import '../styles/Producto.css';
import axios from 'axios';
import DesglozarPorcolor from './DesglozarPorColor';
import ConfirmarEliminar from './ConfirmarEliminar';
function Producto({user,producto, onActualizar, contenedor}){

    const [mostrarForm, setMostrarForm ]= useState(false);
    const [colores, setColores] = useState([]);
    const [productos, setProductos] = useState([]);
    const [productoActualizado, setProductoActualizado] = useState(producto);
    const [coloresAsignados, setColoresAsignados] = useState([]);
    const [cantidadRestante, setCantidadRestante] = useState(producto.cantidad);
    const cambiarNumero = ()=>{
        setMostrarForm(!mostrarForm);
    }
    const handleColoresAsignadosChange = (nuevosColoresAsignados) => {
        setColoresAsignados(nuevosColoresAsignados);
        setProductoActualizado(prevState => ({
            ...prevState,
            idColor: nuevosColoresAsignados.length > 0 ? nuevosColoresAsignados[0].idColor : null
        }));
    };
    const handleCantidadRestanteChange = (nuevaCantidadRestante) => {
        setCantidadRestante(nuevaCantidadRestante);
    };
    const onSubmit = async(e)=>{
        e.preventDefault();
        
        const datosActualizados = {
        
            producto: productoActualizado.idProducto, // ID del producto
            cantidad: cantidadRestante === 0 ? cantidadRestante : productoActualizado.cantidad,
            unidad: productoActualizado.unidad,
            color: productoActualizado.idColor,
            precioPorUnidad: productoActualizado.precioPorUnidad,
            coloresAsignados: coloresAsignados,
            contenedor: contenedor,
        };
        console.log(coloresAsignados)
        try {
            const response = await axios.put(`http://localhost:3000/api/contenedorProducto/${producto.idContenedorProductos}`, datosActualizados);
            if (response.status === 200) {
                
                /*
                const nombreProductoActualizado = productos.find(
                    (prod) => prod.idProducto === parseInt(datosActualizados.producto)
                )?.nombre || 'Producto desconocido';
                const nombreColorActualizado = colores.find(
                    (col) => col.idColor === parseInt(datosActualizados.color)
                )?.nombre || 'Sin color';
                onActualizar({
                    ...producto,
                    cantidad: datosActualizados.cantidad,
                    unidad: datosActualizados.unidad,
                    nombre: nombreProductoActualizado,
                    color: nombreColorActualizado,
                    precioPorUnidad: datosActualizados.precioPorUnidad,
                });
                */
                console.log(response.data);
                onActualizar(response.data);
                setMostrarForm(false);
            }
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            alert('Hubo un error al actualizar el producto.');
        }
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductoActualizado({
            ...productoActualizado,
            [name]: value,
        });
    };
    useEffect(()=>{
        axios.get('http://localhost:3000/api/items/color').then((response)=>{
            setColores(response.data);
        });
        axios.get('http://localhost:3000/api/items/producto').then((response)=>{
            setProductos(response.data);
        });
    },[]);
    return(
        <>
        <div className='producto-container'>
            {
                !mostrarForm ? 
                <div className='datos-actuales-producto'>
                    <label><b>{producto.nombre}</b></label>
                    <label>Color: <b>{producto.color || 'Sin color'}</b></label>
                    <label>Cantidad: <b>{producto.cantidad ? `${producto.cantidad} ${producto.unidad}`: 'Sin cantidad'}</b></label>
                    <label>FOB: <b>${producto.precioPorUnidad}</b></label>
                    <label>Costo: <b>${(producto.precioPorUnidad*producto.cantidad).toFixed(2)}</b></label>
                </div> :
                <>
                    <form className='datos-actuales-producto' onSubmit={onSubmit} >
                        <select name='idProducto' value={productoActualizado.idProducto || ''} onChange={handleInputChange}>
                            <option value=''>Seleccionar producto</option>
                            {productos.map((prod) => (
                                <option key={prod.idProducto} value={prod.idProducto}>
                                    {prod.nombre}
                                </option>
                            ))}
                        </select>
                        {
                            // Si tiene color solo editarlo, si no tiene se puede desglozar la cantidad por colores
                            productoActualizado.idColor ? <> 
                                <select name='idColor' value={productoActualizado.idColor || ''} onChange={handleInputChange}>
                                    <option value=''>Seleccionar color</option>
                                        {colores.map((color) => (
                                            <option key={color.idColor} value={color.idColor}>
                                                {color.nombre}
                                            </option>))}
                                </select>
                </>:    null}
                   
                    <input
                        type='text'
                        name='cantidad'
                        placeholder='Cantidad'
                        value={productoActualizado.cantidad || ''}
                        onChange={handleInputChange}
                    />
                    <input
                        type='text'
                        name='unidad'
                        placeholder='Unidad'
                        value={productoActualizado.unidad || ''}
                        onChange={handleInputChange}
                    />
                    <input type='number' name='precioPorUnidad' placeholder='Precio por unidad' value={productoActualizado.precioPorUnidad || ''} onChange={handleInputChange} />
                <button type='submit'>Actualizar</button>
            </form>
            <ConfirmarEliminar id={producto.idContenedorProductos} tipo={'ContenedorProducto'} />
            </>
            }
            {   user.permisos["Editar-Contenedores"] ?
                <button onClick={cambiarNumero}>{mostrarForm ? 'Cancelar':'Editar'}</button> :<></>
            }
        </div>
        {
            !productoActualizado.idColor && mostrarForm && <DesglozarPorcolor 
            producto={producto} 
            colores={colores}
            onColoresAsignadosChange={handleColoresAsignadosChange}
            onCantidadRestanteChange={handleCantidadRestanteChange}
            />
        }
        <hr className='linea-producto'></hr>
        </>
    );
}

export default Producto;