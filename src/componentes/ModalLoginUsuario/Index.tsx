import { AbBotao, AbCampoTexto, AbModal } from "ds-alurabooks"
import { useState } from "react"
import './ModalLoginUsuario.css'
import http from "../../http"

interface PropsModalLoginUsuario{
    aberta:boolean
    aoFechar: () => void
    aoEfetuarLogin?: () => void
}

const ModalLoginUsuario = ({aberta, aoFechar}:PropsModalLoginUsuario) => {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const aoSubmeterFormular = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        const usuario = {
            email,
            senha
        }
        http.post('public/login', usuario)
        .then((response) => {
            sessionStorage.setItem('token', response.data.access_token)
            setEmail('')
            setSenha('')
            aoFechar()
        }).catch((erro) => {
            if(erro?.response?.data?.message){
                alert(erro?.response?.data?.message)
            } else {
                alert('Erro ao efetuar login')
            }
        })
    }

    return (
        <AbModal titulo="Login" aberta={aberta} aoFechar={aoFechar}>
            <section className="corpoModalCadastro">
                <form onSubmit={aoSubmeterFormular}>
                    <AbCampoTexto label="E-mail" value={email} onChange={setEmail} type="email"/>
                    <AbCampoTexto label="Senha" value={senha} onChange={setSenha} type="password"/>
                <div className="acoes">
                    <AbBotao texto="Fazer Login"/>
                </div>
                </form>
            </section>
        </AbModal>
    )
}

export default ModalLoginUsuario