import { AbBotao } from "ds-alurabooks"
import './Pedidos.css'
import axios from "axios"
import { useEffect, useState } from "react"
import { IPedido } from "../../interfaces/IPedido"
import { log } from "console"
import http from "../../http"

const Pedidos = () => {
    const [pedidos, setPedidos] = useState<IPedido[]>([])

    const formatador = Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'})

    useEffect(() => {

        http.get<IPedido[]>('pedidos', {
        }).then(response => setPedidos(response.data))
            .catch(erro => console.log(erro))
    }, [])

    const excluir = (pedido: IPedido) => {
        console.log('excluir')
        console.log(pedido.id)
        const token = sessionStorage.getItem('token')
        http.delete(`pedidos/${pedido.id}`, {
        }).then(() => {
            setPedidos(pedidos.filter(p => p.id !== pedido.id))
        }).catch(erro => console.log(erro))
    }

    return (
        <section className="pedidos">
            <h1>Meus Pedidos</h1>
            {pedidos.map(pedido => (
                <div key={pedido.id} className="pedido">
                    <ul>
                        <li>Pedido: <strong>{pedido.id}</strong></li>
                        <li>Data do Pedido: <strong>{new Date(pedido.data).toLocaleDateString()}</strong></li>
                        <li>Valor total: <strong>{formatador.format(pedido.total)}</strong></li>
                        <li>Entrega realizada em: <strong>{new Date(pedido.entrega).toLocaleDateString()}</strong></li>
                    <button onClick={() => excluir(pedido)}>Excluir</button>
                    </ul>
                    <AbBotao texto="detalhes"></AbBotao>
                </div>)
            )}
        </section>
    )
}

export default Pedidos