import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import '../styles/AgregarItem.css'
function AgregarItem(){
    const {item} = useParams();
    const [items, setItems] = useState([]);
    const [nombre, setNombre] = useState('');
    const [unidadPredeterminada, setUnidadPredeterminada] = useState('');
    useEffect(()=>{
        axios.get(`http://localhost:3000/api/items/${item}`).then((response)=>{
            setItems(response.data);
        }).catch((error)=>{
            console.error('Error trayendo los items:', error);
        });
    },[item]);

    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post(`http://localhost:3000/api/items/${item}`,{nombre,unidadPredeterminada}).then((response)=>{
            if(response.status === 200){
                console.log(response.data);
                setNombre('');
                setUnidadPredeterminada('');
                setItems( [...items, response.data[0]]);
            }
        }).catch((error)=>{
            console.error('Error agregando el item:', error);
        });
    };
    return(

        <div className="principal-container">
            <form className="agregar-container" onSubmit={handleSubmit}>
                <h2 className="titulo">Agregar {item}</h2>
                <input style={{width:'100%'}} type="text" placeholder={`Nombre de ${item}`}  value={nombre} onChange={(e) => setNombre(e.target.value)}/>
                <br></br>
                {
                    item === 'producto' ? <select style={{width:'100%'}} value={unidadPredeterminada} onChange={(e) => setUnidadPredeterminada(e.target.value)}>
                        <option  value='' disabled>Seleccionar unidad</option>
                        <option value='m'>m</option>
                        <option value='kg'>kg</option>
                        <option value='uds'>uds</option>
                    </select> : <></>
                }
                <button >Agregar</button>
            </form>
            <div className="lista-item-container">
                <h2 className="titulo">Lista de {item}:</h2>
                <ul>
                    {
                        items.map((item)=>{
                            return <li>{item.nombre}</li>
                        })
                    }
                </ul>
            </div>
            
        </div>
       
    )
}
export default AgregarItem;