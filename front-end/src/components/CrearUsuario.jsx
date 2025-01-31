import axios from "axios";
import { useState } from "react";

function CrearUsuario({ setUsuarios }) {
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        contrasena: "",
        tipoUsuario: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:3000/api/usuarios/agregar", formData)
            .then(() => {
                alert("Usuario creado exitosamente");
                axios.get("http://localhost:3000/api/usuarios/test")
                    .then((response) => {
                        setUsuarios(response.data);
                    });
            })
            .catch((error) => {
                alert("Error al crear el usuario");
                console.error(error);
            });
    };

    return (
        <div className="container-lista-usuarios">
            <h1>Crear Usuario</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <br></br>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <br></br>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <br></br>
                    <input
                        type="password"
                        name="contrasena"
                        value={formData.contrasena}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Tipo de Usuario:</label>
                    <br></br>
                    <select
                        name="tipoUsuario"
                        value={formData.tipoUsuario}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione</option>
                        <option value="admin">Admin</option>
                        <option value="flujo">flujo</option>
                        <option value="status">status</option>
                    </select>
                </div>
                <button type="submit" style={{marginTop:"15px"}}>Crear Usuario</button>
            </form>
        </div>
    );
}

export default CrearUsuario;
