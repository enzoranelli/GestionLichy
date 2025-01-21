import { useNavigate } from "react-router-dom";
import '../styles/Navegador.css';
import { useState } from "react";
import { useUserToggleContext } from "../UserProvider";
function Navegador({user}){
    const { logout } = useUserToggleContext();
    const navigate = useNavigate();
    const redirigir = (link) =>{
      navigate(link)
    }
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  
    return(
      <div className='contenedor-navegador'>
          <nav style={{display:"flex",listStyleType:"none", marginRight: "20px", alignItems:'center', height:'100%'}}>
          <ul style={{display:"flex",listStyleType:"none",padding:0,margin:0}}>
            
            <li style={{marginRight: "20px"}}>
              <button className='boton-navegador' onClick={()=>redirigir('/contenedores')}>Contenedores</button>
            </li>
            {
              user.tipoUsuario === 'admin' || user.tipoUsuario === 'status' ? <>
              <li style={{marginRight: "20px"}}>
              <button className='boton-navegador' onClick={()=>redirigir('/nuevo-contenedor')}>Agregar Contenedor</button>
            </li>
            <li style={{marginRight: "20px"}}>
              <button className='boton-navegador' onClick={()=>redirigir('/lista-productos')}>Lista de productos</button>
            </li>
            <li style={{ marginRight: "20px", position: "relative" }}>
              <button className="boton-navegador" onClick={toggleDropdown}>
                Configuración de items
              </button>
              {isDropdownOpen && (
                <ul className="dropdown-menu">
                  <li>
                    <button className="boton-navegador" onClick={()=>redirigir('/agregar-item/producto')}>
                      Agregar producto
                    </button>
                  </li>
                  <li>
                    <button className="boton-navegador" onClick={()=>redirigir('/agregar-item/color')}>
                      Agregar Color
                    </button>
                  </li>
                  <li>
                    <button className="boton-navegador" onClick={()=>redirigir('/agregar-item/proveedor')}>
                      Agregar Proveedor
                    </button>
                  </li>
                </ul>
              )}
            </li>
            
              </>:<></>
            }
            {
              user.tipoUsuario === 'admin' ? <>
              <li style={{marginRight: "20px"}}>
              <button className='boton-navegador' onClick={()=>redirigir('/configuracion-usuarios')}>Configuración de usuarios</button> 
              </li>
              </>:
              <></>
            }            
            
          </ul>
        </nav>
        <button className="boton-navegador" onClick={logout}>Cerrar sesion</button>
      </div>
  );
}
export default Navegador;