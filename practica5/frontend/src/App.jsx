import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthLayout from "./layouts/AuthLayout"
import Login from "./paginas/login"
import Registrar from "./paginas/Registrar"
import OlvidePassword from "./paginas/OlvidePassword"
import NuevoPassword from "./paginas/NuevoPassword"
import ConfirmarCuenta from "./paginas/ConfirmarCuenta"
import MainPage from "./paginas/MainPage"
import Verificado from "./paginas/Verificado"
import NoVerificado from "./paginas/NoVerificado"
import CriptoClasica from "./paginas/CriptoClasica"
import CriptoModerna from "./paginas/CriptoModerna"
import CriptoTendencia from "./paginas/CriptoTendencia"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout/>}>
          <Route index element={<Login/>} />
          <Route path="registrar" element={<Registrar/>} />
          <Route path="olvide-password" element={<OlvidePassword/>} />
          <Route path="olvide-password/:token" element={<NuevoPassword/>} />
          <Route path="confirmar" element={<ConfirmarCuenta/>} />
          <Route path="main" element={<MainPage/>} />
          <Route path="verificado" element={<Verificado/>} />
          <Route path="no-verificado" element={<NoVerificado/>} />
          <Route path="criptoclasica" element={<CriptoClasica/>} />
          <Route path="criptomoderna" element={<CriptoModerna/>} />
          <Route path="criptotendencia" element={<CriptoTendencia/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
