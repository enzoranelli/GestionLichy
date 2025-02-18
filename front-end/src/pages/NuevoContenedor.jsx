import '../styles/NuevoContenedor.css';
import { useForm, Controller, set } from 'react-hook-form';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUserContext } from '../UserProvider.jsx';
import CreatableSelect from 'react-select/creatable';
import { v4 as uuidv4 } from 'uuid';

function NuevoContenedor() {
    const { user } = useUserContext();
    const { register, handleSubmit, control, setValue, watch } = useForm();
    const [proveedores, setProveedores] = useState([]);
    const [productos, setProductos] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [redirigir, setRedirigir] = useState(false);

    // Obtener el valor actual del campo "producto"
    const productoActual = watch('producto');
    const unidadActual = watch('unidad');
    // Enviar el formulario
    const onSubmit = async (data) => {
        // Verificar si el producto seleccionado es nuevo (temporal)
        if (productoActual && productoActual.value.startsWith('temp-')) {
            // Si es un producto nuevo, guardarlo en el backend
            try {
                const response = await axios.post('http://localhost:3000/api/items/producto', {
                    nombre: productoActual.label,
                });

                // Crear el nuevo producto con el ID real
                const newProduct = {
                    value: response.data[0].idProducto.toString(),
                    label: productoActual.label,
                };

                // Actualizar la lista de productos
                setProductos((prev) =>
                    prev.map((item) => (item.value === productoActual.value ? newProduct : item))
                );

                // Actualizar el valor del campo "producto" en el formulario
                setValue('producto', newProduct);

                // Enviar el formulario con el ID real del producto
                const dataConUser = { ...data, usuario: user.idUsuario, producto: newProduct.value };
                await axios.post('http://localhost:3000/api/contenedores', dataConUser);

                // Redirigir después de enviar el formulario
                setRedirigir(true);
            } catch (error) {
                console.error('Error al guardar el nuevo producto:', error);
            }
        } else {
            // Si es un producto existente, enviar el formulario directamente
            const dataConUser = { ...data, usuario: user.idUsuario, producto: productoActual.value };
            await axios.post('http://localhost:3000/api/contenedores', dataConUser);
            setRedirigir(true);
        }
    };

    // Cargar datos iniciales
    useEffect(() => {
        axios.get('http://localhost:3000/api/items/proveedor')
            .then((response) => {
                setProveedores(response.data);
            })
            .catch((error) => {
                console.error('Error trayendo los proveedores:', error);
            });

        axios.get('http://localhost:3000/api/items/producto')
            .then((response) => {
                const formattedProducts = response.data.map((item) => ({
                    value: item.idProducto.toString(),
                    label: item.nombre,
                    unidadPredeterminada: item.unidadPredeterminada,
                }));
                setProductos(formattedProducts);
            })
            .catch((error) => {
                console.error('Error trayendo los productos:', error);
            });

        
    }, []);
    useEffect(() => {
        if (productoActual) {
            const productoEncontrado = productos.find(
                (item) => item.value === productoActual.value
            );

            if (productoEncontrado) {
                // Si el producto tiene una unidad predeterminada, actualiza el campo de unidad
                if (productoEncontrado.unidadPredeterminada) {
                    setValue('unidad', productoEncontrado.unidadPredeterminada);
                } else {
                    // Si es un producto nuevo, restablece la unidad a un valor vacío
                    setValue('unidad', '');
                }
            }
        }
    }, [productoActual, productos, setValue]);
    // Manejar la creación de nuevos productos
    const handleCreateProduct = (inputValue) => {
        const newOption = { value: `temp-${uuidv4()}`, label: inputValue };
        setProductos((prev) => [...prev, newOption]);
        setProductoSeleccionado(newOption);
        setValue('producto', newOption); // Actualizar el valor en react-hook-form
    };

    if (redirigir) {
        return <Navigate to='/redireccion' />;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='nuevo-contenedor-container'>
            <h1 className='titulo'>Agregar contenedor</h1>
            <hr></hr>
            
            <div className='input-container'>
                <label htmlFor='factura'>Orden:</label>
                <input {...register('factura')} />
            </div>
            <div className='input-container'>
                <label htmlFor='proveedor'>Agente:</label>
                <select {...register('proveedor')}>
                    <option value=''>Seleccione un agente</option>
                    {proveedores.map((item) => (
                        <option key={item.idProveedor} value={item.idProveedor}>
                            {item.nombre}
                        </option>
                    ))}
                </select>
            </div>
            <div className='input-container'>
                <label htmlFor='producto'>Producto:</label>
                <Controller
                    name='producto'
                    control={control}
                    rules={{ required: 'Campo obligatorio' }}
                    render={({ field }) => (
                        <CreatableSelect
                            {...field}
                            options={productos}
                            onChange={(selectedOption) => {field.onChange(selectedOption)
                                setProductoSeleccionado(selectedOption);
                            }}
                            onCreateOption={handleCreateProduct}
                            isClearable
                            isSearchable
                            placeholder='Escribe o selecciona...'
                            noOptionsMessage={() => 'No hay coincidencias, presiona Enter para agregar.'}
                            formatCreateLabel={(inputValue) => `Agregar "${inputValue}"`}
                            className='text-black'
                        />
                    )}
                />
            </div>
            {
    productoSeleccionado && (
        <>
            <div className='input-container'>
                        <label htmlFor='unidad'>Unidad:</label>
                        <select
                            {...register('unidad', { required: 'Seleccione una unidad' })}
                            value={unidadActual} // Valor controlado
                            disabled={!productoSeleccionado.value.startsWith('temp-')} // Deshabilitar si no es un producto nuevo
                        >
                            <option value='' disabled>
                                Seleccionar unidad
                            </option>
                            <option value='m'>m</option>
                            <option value='kg'>kg</option>
                        </select>
                    </div>
                    <div className='input-container'>
                        <label htmlFor='cantidad'>Cantidad:</label>
                        <input {...register('cantidad')} />
                    </div>
        </>
    )
}
            <div className='input-container'>
                <label htmlFor='forwarder'>Agente:</label>
                <input {...register('forwarder')} />
            </div>
            <div className='input-container'>
                <label htmlFor='comentario'>Item Proveedor:</label>
                <input {...register('comentario')} />
            </div>
            <div className='input-container'>
                <label htmlFor='sira'>Sira:</label>
                <input {...register('sira')} />
            </div>
            <div className='input-container'>
                <label htmlFor='vep'>Vep:</label>
                <input {...register('vep')} />
            </div>
            <button type='submit'>Agregar nuevo contenedor</button>
        </form>
    );
}

export default NuevoContenedor;