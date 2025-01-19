import '../styles/NuevoContenedor.css';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useEffect, useState} from 'react';
import {useUserContext} from '../UserProvider.jsx';
function NuevoContenedor(){
    const { user } = useUserContext();
    const {register, handleSubmit} = useForm();
    const [proveedores, setProveedores] = useState([]);
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [redirigir, setRedirigir] = useState(false);
    const onSubmit = (data) =>{
        const dataConUsuer = {...data, usuario: user.idUsuario};
        axios.post('http://localhost:3000/api/contenedores',dataConUsuer).then((response)=>{
           if(response.status === 200){
               setRedirigir(true);
           }
        }).catch((error)=>{
            console.error('Error agregando el contenedor:', error);
        });
         
    }
    useEffect(()=>{
        axios.get('http://localhost:3000/api/items/proveedor').then((response)=>{
            setProveedores(response.data);
        }).catch((error)=>{
            console.error('Error trayendo los proveedores:', error);
        });
        axios.get('http://localhost:3000/api/items/producto').then((response)=>{
            setProductos(response.data);
        }).catch((error)=>{ 
            console.error('Error trayendo los productos:', error);
        });
        axios.get('http://localhost:3000/api/items/categorias').then((response)=>{
            console.log(response.data);
            setCategorias(response.data);
        }).catch((error)=>{
             console.error('Error trayendo las categorias:', error);
        });
    },[]);
    if(redirigir){
        return <Navigate to='/redireccion' />
    }
    return(
        <form onSubmit={handleSubmit(onSubmit)} className='nuevo-contenedor-container'>
            <h1 className='titulo'>Agregar contenedor</h1>
            <hr></hr>
            <div className='input-container'>
                <label htmlFor='interno'>
                    Interno:  
                </label>
                <input {...register("idContenedor",{required: "Campo obligatorio"})} />
            </div>
            <div className='input-container'>
                <label htmlFor='interno'>
                    Factura
                </label>
                <input {...register("factura")}/>
            </div>
            <div className='input-container'>
                <label htmlFor='interno'>
                    Proveedor:  
                </label>
                <select {...register("proveedor")} >
                    <option value=''>Seleccione un proveedor</option>
                    {proveedores.map((item)=>(
                        <option key={item.idProveedor} value={item.idProveedor}>{item.nombre}</option>
                    ))}

                </select>
            </div>
            <div className='input-container'>
                <label htmlFor='interno'>Producto</label>
                <select {...register("producto")}>
                    <option value=''>Seleccione un producto</option>
                    {productos.map((item)=>(
                        <option key={item.idProducto} value={item.idProducto}>{item.nombre}</option>
                    ))}
                </select>
            </div>
            <div className='input-container'>
                <label htmlFor='interno'>
                    Categoria:  
                </label>
                <select {...register("categoria")}>
                    <option value=''>Seleccione una categoria</option>
                    {categorias.map((item, index)=>(
                        <option key={index} value={item.nombreCategoria}>{item.nombreCategoria}</option>
                    ))}
                </select>
            </div>
            <div className='input-container'>
                <label htmlFor='interno'>
                   Forwarder:  
                </label>
                <input {...register("forwarder")}/>
            </div>
           
            <div className='input-container'>
                <label htmlFor='interno'>
                  Comentarios:  
                </label>
                <input {...register("comentario")}/>
            </div>

            <div className='input-container'>
                <label htmlFor='interno'>
                 sira:  
                </label>
                <input {...register("sira")}/>
            </div>

            <div className='input-container'>
                <label htmlFor='interno'>
                  vep:  
                </label>
                <input {...register("vep")}/>
            </div>
            <button>Agregar nuevo contenedor</button>
        </form>
    );
}

export default NuevoContenedor;