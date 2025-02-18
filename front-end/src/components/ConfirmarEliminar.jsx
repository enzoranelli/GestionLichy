import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
function ConfirmarEliminar({id,tipo,actualizarLista}){
    const [redireccionar, setRedireccionar] = useState(false);
    const handleDelete = async()=>{
        const result = await Swal.fire({
            title: '¿Estas seguro de eliminar?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor:'#d33',
            cancelButtonColor:'#3085d6',
            confirmButtonText:'Si, eliminar',
            cancelButtonText:'Cancelar'
        });
        if(result.isConfirmed){
            let ruta = '';
            if(tipo === 'contenedor'){
                ruta = 'contenedores'
            }
            if(tipo === 'ContenedorProducto'){
                ruta = 'ContenedorProducto'
            }
            if(tipo === 'producto'){
                ruta = 'producto'
            }
            try{
                const response = await fetch(`http://localhost:3000/api/${ruta}/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Error al eliminar el elemento');
                }
                Swal.fire('Eliminado', 'El elemento ha sido eliminado.', 'success');
                if(tipo==='contenedor' || tipo==='producto'){
                    setRedireccionar(true);
                }else{
                    actualizarLista((productos) => productos.filter((p) => p.idContenedorProductos !== id));
                }
            }catch(error){
                Swal.fire('Error', 'No se pudo eliminar el elemento'+error, 'error');
            }
            
        }
    }
    if(redireccionar){
        let ruta = tipo === 'contenedor' ? '/contenedores' : '/ver-productos'
        return <Navigate to={ruta} />
    }
    return <button onClick={handleDelete} className="btn-delete">Eliminar</button>;
}

export default ConfirmarEliminar;