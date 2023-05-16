import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
export const ClientDetails = () => {
    const {clientId} = useParams()
    const [client, updateClient] = useState({})

    useEffect(
        () => {
            fetch(`http://localhost:8088/clients?_expand=user&_embed=serviceTodos&userId=${clientId}`)
                .then(response => response.json())
                .then((data) => {
                    const singleClient = data[0]
                    updateClient(singleClient)

                })
        },
        [clientId]
    )
    return <section className="client" >
    
        <header className="client__header">{client?.user?.fullName}</header>
        <div>Email: {client?.user?.email}</div>
        <div>Address: {client.address}</div>
        <div>Phone Number: {client.phoneNumber}</div>
        <footer className="client__footer">Currently working On {client?.serviceTodos?.length} to-do list items</footer>
        </section>
}