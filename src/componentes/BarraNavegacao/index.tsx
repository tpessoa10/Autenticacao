import { Link, useNavigate } from "react-router-dom"
import BotaoNavegacao from "../BotaoNavegacao"
import ModalCadastroUsuario from "../ModalCadastroUsuario"
import logo from './assets/logo.svg'
import usuario from './assets/usuario.svg'
import './BarraNavegacao.css'
import { useEffect, useState } from "react"
import ModalLoginUsuario from "../ModalLoginUsuario/Index"


const BarraNavegacao = () => {
    const navigate = useNavigate()
    const [modalCadastroAnerta, setModalCadastroAberta] = useState(false)
    const [modalLoginAberta, setModalLoginAberta] = useState(false)

    const token = sessionStorage.getItem('token')
    console.log(token)
    const usuarioLogado = token ? true : false
    const [usuarioEstaLogado, setUsuarioEstaLogado] = useState<boolean>(usuarioLogado)



    console.log(usuarioEstaLogado)

    const aoEfetuarLogin = () => {
        setModalLoginAberta(false)
        setUsuarioEstaLogado(true)
    }

    const efetuarLogout = () => {
        setUsuarioEstaLogado(false)
        sessionStorage.removeItem('token')
        navigate('/')
    }

    return (<nav className="ab-navbar">
        <h1 className="logo">
            <Link to="/">
            </Link>
        </h1>
        <ul className="navegacao">
            <li>
                <a href="#!">Categorias</a>
                <ul className="submenu">
                    <li>
                        <Link to="/">
                            Frontend
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            Programação
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            Infraestrutura
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            Business
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            Design e UX
                        </Link>
                    </li>
                </ul>
            </li>
        </ul>
        <ul className="acoes">
            {!usuarioEstaLogado && (<>
                <li>
                <BotaoNavegacao texto="Login" textoAltSrc="Icone representando um usuário" imagemSrc={usuario} onClick={() => setModalLoginAberta(true)}/>
            </li>
            <li>
                <BotaoNavegacao texto="Cadastrar-se" textoAltSrc="Icone representando um usuário" imagemSrc={usuario} onClick={() => setModalCadastroAberta(true)}/>
            </li>
            <li>
                <ModalCadastroUsuario aberta={modalCadastroAnerta} aoFechar={() => setModalCadastroAberta(false)}/>
            </li>
            <li>
                <ModalLoginUsuario aberta={modalLoginAberta} aoEfetuarLogin={aoEfetuarLogin} aoFechar={() => setModalLoginAberta(false)}/>
            </li>
            </>)}
            {usuarioEstaLogado && (<>
                <li>
                    <Link to={"/minha-conta/pedidos"}>Minha conta</Link>
                </li>
                <li>
                    <BotaoNavegacao texto="Logout" imagemSrc="Imagem" textoAltSrc="Texto" onClick={efetuarLogout}/>
                </li>
            </>)}
        </ul>
    </nav>)
}

export default BarraNavegacao