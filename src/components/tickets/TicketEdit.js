// // Create a new module src/components/tickets/TicketEdit.js.

// // The edit form is, largely, the same as the TicketForm component. It has some important differences.

// // You need to GET the data based on the route parameter
// // The request to save the data is a PUT instead of a POST
// // The checked attribute of the checkbox must be bound to the ticket.emergency property
// // You can give it your best shot to transpose the code from TicketForm to TicketEdit and change it where needed, or you can snag the starter code below.


import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const TicketEdit = () => {
    const [ticket, assignTicket] = useState({
        description: "",
        emergency: false
    })
    const { ticketId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:8088/serviceTickets/${ticketId}`)
            .then(response => response.json())
            .then((data) => {
                assignTicket(data)
            })
    }, [ticketId])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/serviceTickets/${ticket.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticket)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/tickets")
            })
    }


    return <form className="ticketForm">
        <h2 className="ticketForm__title">Service Ticket</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                    required autoFocus
                    type="text"
                    style={{
                        height: "10rem"
                    }}
                    className="form-control"
                    value={ticket.description}
                    onChange={
                        (evt) => {
                            const copy = { ...ticket }
                            copy.description = evt.target.value
                            assignTicket(copy)
                        }
                    }>{ticket.description}</textarea>
            </div>
        </fieldset>
        <fieldset> 
                <div className="form-group">
                    <label htmlFor="name">Cost:</label>
                    <input type="number"
                        className="form-control"
                        value={ticket.rate}
                        onChange={
                            (evt) => {
                                // TODO: Update rate property
                                // even tho the type is number it will always return a string
                                // unlessss you wrap it in a parse 
                                const copy = {...ticket}
                                copy.rate = parseFloat(evt.target.value, 2) //float is for decimal, 2 is for        components -> applicationviews -> employeeviews -> profile -> employee form -> changes state
                                //got initial state fethed from the api for the permanent state and updated the  component state and now capturing what the user did .next step saving
                                assignTicket(copy)
                            }
                        } />
                </div>
            </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Emergency:</label>
                <input type="checkbox"
                    checked={ticket.emergency}
                    onChange={
                        (evt) => {
                            const copy = { ...ticket }
                            copy.emergency = evt.target.checked
                            assignTicket(copy)
                        }
                    } />
            </div>
        </fieldset>
        <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
            Save Edits
        </button>
    </form>
}















// export const TicketEdit = () => {
//     // TODO: This state object should not be blank
//     const [ticket, assignTicket] = useState({})

//     // TODO: What is the variable in which you stored the route parameter?
//     const { ??? } = useParams()

//     // TODO: Get the ticket state from the API.
//     useEffect(() => {

//     }, [ ??? ])

//     const handleSaveButtonClick = (event) => {
//         event.preventDefault()

//         // TODO: Write the fetch for the PUT request to replace the object being edited
//     }


//     return <form className="ticketForm">
//         <h2 className="ticketForm__title">Service Ticket</h2>
//         <fieldset>
//             <div className="form-group">
//                 <label htmlFor="description">Description:</label>
//                 <textarea
//                     required autoFocus
//                     type="text"
//                     style={{
//                         height: "10rem"
//                     }}
//                     className="form-control"
//                     value={ticket.description}
//                     onChange={
//                         (evt) => {
//                             // TODO: Update state with a modified copy
//                         }
//                     }>{ticket.description}</textarea>
//             </div>
//         </fieldset>
//         <fieldset>
//             <div className="form-group">
//                 <label htmlFor="name">Emergency:</label>
//                 <input type="checkbox"
//                     onChange={
//                         (evt) => {
//                             // TODO: Update state with a modified copy
//                         }
//                     } />
//             </div>
//         </fieldset>
//         <button
//             onClick={() => handleSaveButtonClick()}
//             className="btn btn-primary">
//             Save Edits
//         </button>
//     </form>
// }