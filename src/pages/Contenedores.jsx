
import Contenedor from "../components/Contenedor";
import '../styles/Contenedores.css';
import { useState, useEffect } from "react";
function Contenedores(){
    const [data,setData]=useState([]);
    const [categoria, setCategoria]  = useState('Todos');
    const handleCategoriaChange = (e) => {
        setCategoria(e.target.value); 
    };
    useEffect(()=>{
        if(categoria === 'Todos'){
            const array = [{idContenedor:24191, status:'LATA-VACIO 07/12', proveedor:'LOTUS'},
                {idContenedor:24147, status:'LATA-VACIO 13/12', proveedor:'LN GROUP'},
                {idContenedor:24148, status:'LATA-VACIO 13/12', proveedor:'LN GROUP'},
                {idContenedor:24149, status:'LATA-VACIO 13/12', proveedor:'LN GROUP'},
                {idContenedor:24150, status:'LATA-VACIO 13/12', proveedor:'LN GROUP'},
                {idContenedor:24151, status:'LATA-VACIO 13/12', proveedor:'LN GROUP'},
                {idContenedor:24152, status:'LATA-VACIO 13/12', proveedor:'LN GROUP'},
                {idContenedor:24153, status:'LATA-VACIO 13/12', proveedor:'LN GROUP'},
                {idContenedor:24154, status:'LATA-VACIO 13/12', proveedor:'LN GROUP'}]

            setData(array) 
        }
        if(categoria === 'Fiscal'){
            const array = [{idContenedor:1, status:'LATA-VACIO 07/12', proveedor:'LOTUS'},
                {idContenedor:2, status:'LATA-VACIO 13/12', proveedor:'LN GROUP'}]
            setData(array) 
        }
        if(categoria === 'Liberadas total'){
            const array = [{idContenedor:1, status:'LATA-VACIO 07/12', proveedor:'LOTUS'},
                {idContenedor:2, status:'LATA-VACIO 13/12', proveedor:'LN GROUP'},
                {idContenedor:3, status:'LATA-VACIO 13/12', proveedor:'LN GROUP'}]
            setData(array) 
        }
        if(categoria === 'Llegando'){
            const array = [{idContenedor:1, status:'9/12', proveedor:'LOTUS'},]
            setData(array)
        }
    },[categoria]);
    return(
        <div className='contenedores-container'>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <h1 className='titulo'>Lista de contenedores</h1>
                <label>Categorias :  
                <select  value={categoria} onChange={handleCategoriaChange}>
                    <option value="Todos">Todos</option>
                    <option value="Liberadas total">Liberadas total</option>
                    <option value="Fiscal">Fiscal</option>
                    <option value="Llegando">Llegando</option>
                </select>
                </label>
            </div>
            <hr></hr>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <h2 className='titulo'>{categoria}</h2>
                <input 
                    className='input-buscar'
                    placeholder="Buscar por id"
                />
            </div>
            
            {data.map((item)=> (
                <Contenedor data={item} />
            ))}
            
        </div>
    );
}

export default Contenedores;