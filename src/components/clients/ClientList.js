import { useEffect, useState } from "react"
import { Client } from "./Client"

export const ClientList = () => {
    const [clients, setClients] = useState([])
// ! important
// !do this
    useEffect(
        () => {
            fetch(`http://localhost:8088/users?isStaff=false`)
                .then(response => response.json())
                .then((clientArray) => {
                    setClients(clientArray)
                }
                )
        },
        []
    )
    return <article className="clients">
        {
            clients.map(client => <Client key={`client--${client.id}`}
                id={client.id} 
                fullName={client.fullName} 
                email={client.email} />)
        }
    </article>
}
