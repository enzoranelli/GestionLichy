import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login.jsx';
import Contenedores from "./pages/Contenedores.jsx";
import Navegador from "./components/Navegador.jsx";
import ContendorDetalle from "./pages/ContenedorDetalle.jsx";
import NuevoContenedor from "./pages/NuevoContenedor.jsx";
import ListaProductos from "./pages/ListaProductos.jsx";
import ProductoDetalle from "./pages/ProductoDetalle.jsx";
import AgregarItem from "./pages/AgregarItem.jsx";
import Redireccion from "./components/Redireccion.jsx";

import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { useUserContext } from "./UserProvider.jsx";
import ConfiguraciónUsuarios from "./pages/ConfiguracionUsuarios.jsx";

function App() {
  const { user } = useUserContext();

  return (

     
      <Router>
        {
          user ? 
          <>
            <Navegador user={user}/>

          </> : <></>
        }
        
        <Routes>
          <Route path='/' element={<Login />} />
          <Route element={<ProtectedRoute roles={['admin','flujo','status']} isAllowed={user} />}>
            <Route path='/contenedores'  element={<Contenedores />} />
            <Route path='/contenedor-detalle/:id' element={<ContendorDetalle />}/>
            <Route path='/redireccion' element={<Redireccion />} />
           
          </Route> 
          <Route element={<ProtectedRoute roles={['admin','status']} isAllowed={user} />}>
            <Route path='/nuevo-contenedor' element={<NuevoContenedor />} />
            <Route path='/lista-productos' element={<ListaProductos />} />
            <Route path='/producto-detalle/:producto' element={<ProductoDetalle />} />
            <Route path='/agregar-item/:item' element={<AgregarItem />} />
          
          </Route>
          <Route element={<ProtectedRoute roles={['admin']} isAllowed={user} />}>
            <Route path='/configuracion-usuarios' element={<ConfiguraciónUsuarios />} />
          </Route>
          <Route path='*' element={<h1>Not Found</h1>} />  
        </Routes>
      </Router>

  )
}

export default App
