import { Route, Routes } from "react-router-dom"
import Home from "../paginas/Home"
import PaginaBase from "../paginas/PaginaBase"
import MinhaConta from "../paginas/MinhaConta/Index"
import Pedidos from "../paginas/Pedidos/Index"


const Rotas = () => {
    return (<Routes>
      <Route path='/' element={<PaginaBase />}>
        <Route path='/' element={<Home />} />
        <Route path="/minha-conta" element={<MinhaConta/>}>
          <Route path="pedidos" element={<Pedidos/>}/>
        </Route>
      </Route>
    </Routes>)
}

export default Rotas