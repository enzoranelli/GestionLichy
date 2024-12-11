import { useParams } from "react-router-dom";
import '../styles/AgregarItem.css'
function AgregarItem(){
    const {item} = useParams();
    return(

        <div className="principal-container">
            <div className="agregar-container">
                <h2 className="titulo">Agregar {item}</h2>
                <input style={{width:'100%'}} type="text" placeholder={`Nombre de ${item}`}  />
                <br></br>
                <button >Agregar</button>
            </div>
            <div className="lista-item-container">
                <h2 className="titulo">Lista de {item}:</h2>
            </div>
            
        </div>
       
    )
}
export default AgregarItem;