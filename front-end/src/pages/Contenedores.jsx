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
    const [busqueda, setBusqueda] = useState('');
    const [cargando, setCargando] = useState(true);

    const handleCategoriaChange = (e) => {
        setCategoria(e.target.value); 
    };
    
    useEffect(()=>{
        let filtrado = data;
        if(categoria !== 'Todos'){
            filtrado = data.filter((item)=> item.categoria === categoria);
        }
        if(busqueda.trim() !== ""){
            filtrado = filtrado.filter((item)=>
                item.idContenedor.toString().startsWith(busqueda)
            );
        }
       setDataFiltrado(filtrado);
    },[categoria,busqueda,data]);
    useEffect(()=>{
        axios.get('http://localhost:3000/api/contenedores/').then((response)=>{
            setData(response.data);
            setDataFiltrado(response.data);
            setCargando(false);
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
                    type='text'
                    value={busqueda}
                    onChange={(e)=> setBusqueda(e.target.value)}
                    className='input-buscar'
                    placeholder="Buscar por id"
                />
            </div>
            {cargando ? (
                <p>Cargando datos...</p>
            ) : dataFiltrado.length === 0 ? (
                <NoItems nombre='contenedores' />
            ) : (
                dataFiltrado.map((item) => (<Contenedor key={item.idContenedor} data={item} estado={categoria} />)
            ))}
            
            
        </div>
    );
}

export default Contenedores;