import imagenLogo from '../images/logo-lichytex.png';
import '../styles/Login.css';
function Login(){
    return(
        <div className='contenedor-login'>
            <form className='login-form'>
                <h2 className="titulo-login">Gestión de</h2>
                <img src={imagenLogo} alt='Logo de Lichy'/>
                <label htmlFor="usuario">
                    Usuario:
                    <input id="usuario" name="usuario" type="text" className='input-login'/>
                </label>
                <label htmlFor="contrasena">
                    Contraseña:
                    <input id="contrasena" name="contrasena" type="password" className='input-login' />
                </label>
                <button className='boton-login'> Iniciar sesion</button>
            </form>
        
      </div>
    );
}

export default Login;