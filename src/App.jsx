import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login.jsx';
import Contenedores from "./pages/Contenedores.jsx";
import Navegador from "./components/Navegador.jsx";
import ContendorDetalle from "./pages/ContenedorDetalle.jsx";
import NuevoContenedor from "./pages/NuevoContenedor.jsx";
import ListaProductos from "./pages/ListaProductos.jsx";
import ProductoDetalle from "./pages/ProductoDetalle.jsx";
import AgregarItem from "./pages/AgregarItem.jsx";


function App() {


  return (

     
      <Router>
        <Navegador />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/contenedores' element={<Contenedores />} />
          <Route path='/contenedor-detalle' element={<ContendorDetalle />}/>
          <Route path='/nuevo-contenedor' element={<NuevoContenedor />} />
          <Route path='/lista-productos' element={<ListaProductos />} />
          <Route path='/producto-detalle' element={<ProductoDetalle />} />
          <Route path='/agregar-item/:item' element={<AgregarItem />} />
        </Routes>
      </Router>

  )
}

export default App
