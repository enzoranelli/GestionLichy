import Contenedor from "../components/Contenedor";
import '../styles/Contenedores.css';
import NoItems from "../components/NoItems";
import { useState, useEffect } from "react";
import axios from "axios";
import { use } from "react";
function Contenedores(){
    const [data,setData]=useState([]);
    const [dataFiltrado, setDataFiltrado] = useState([]);
    const [categorias, setCategorias]  = useState([]);
    const [categoria, setCategoria]  = useState('Todos');
    const handleCategoriaChange = (e) => {
        setCategoria(e.target.value); 
    };
    
    useEffect(()=>{
        /*
        Liberadas total
        con sita
        garantia
        bas
        conteo pendiente    
        coordinado
        por coordinar
        por oficializar
        fiscal
        arribado
        llegando
        sin boocking

        */
        if(categoria === 'Todos'){
            setDataFiltrado(data);
        }else{
            const filtrado = data.filter((item)=> item.categoria === categoria);
            setDataFiltrado(filtrado);
        }
       
    },[categoria]);
    useEffect(()=>{
        axios.get('http://localhost:3000/api/contenedores/').then((response)=>{
            setData(response.data);
            setDataFiltrado(response.data);
        }).catch((error)=>{
            console.error('Error trayendo los contenedores:', error);
        });
        axios.get('http://localhost:3000/api/items/categorias').then((response)=>{
            console.log(response.data);
            setCategorias(response.data);

        }).catch((error)=>{ console.error('Error trayendo las categorias:', error);
        });
    },[]);
    
    return(
        <div className='contenedores-container'>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <h1 className='titulo'>Lista de contenedores</h1>
                <label>Categorias :  
                <select  value={categoria} onChange={handleCategoriaChange}>
                    <option value="Todos">Todos</option>
                    {categorias.map((cat, index) => (
                        <option key={index} value={cat.nombreCategoria}>
                        {cat.nombreCategoria}
                        </option>
                    ))}
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
            {
                dataFiltrado.length === 0 ? <NoItems nombre='contenedores' /> : dataFiltrado.map((item)=> (
                    <Contenedor data={item} estado={categoria} />
                ))
            }
            
            
        </div>
    );
}

export default Contenedores;