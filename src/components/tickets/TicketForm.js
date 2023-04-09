import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const TicketForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [ticket, update] = useState({
        description: "", //initially want nothing to show up
        rate: 0,
        emergency: false //defaults toggle to not an emergency 
        // description and emergency will not show up until they are implemented into the onChange of their forms 

    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */

    const navigate = useNavigate()  //to send tickets to api ... variable that is a function

    const localResponsibleUser = localStorage.getItem("responsible_user")
    const responsibleUserObject = JSON.parse(localResponsibleUser)

    const handleSaveButtonClick = (event) => { //function for when button is clicked  to invoke the function, the parameter is defined as event
        event.preventDefault()
        // console.log("helllllo")  <--- shows that it is connected

        // TODO: Create the object to be saved to the API


        const ticketToSendToAPI = {                  // variable object to be saved to API   
            userId: responsibleUserObject.id,              //gets the id directly from the api ... i think it gets it from somewhere i dont have to worry about
            description: ticket.description,            // comes from state variable ticket 
            rate: ticket.rate,
            emergency: ticket.emergency,

            
            dateCompleted: ""                           // leave blank cause it hasnt been worked on 
        }


        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/serviceTickets`, { //where the tickets are held in json  
            method: "POST",                                     //second argument is options method is to post. default operation is to get , this is post or create
            headers: {                                          //   specify header for content type so server knows its being passed to json being passed to json 
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticketToSendToAPI)             // body of the request is the info the client wants the api to save
                                                                // can't send raw js object so we stringify it 
                                                                //saves it
    })   
            .then(response => response.json())                  //object has been sent the json server has responded 
            .then(() => {
                navigate("/tickets")                            // navigates back to ticket list once submitted.
            })
        } //dont forget this guy
                                                                // when working with fetch devTools -> network  
                                                                   // add new ticket and it will show up under serviceTickets 201 status approves it

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New to do list item</h2>
            <fieldset>
                <div className="form-group"> 
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description todo list item"
                        value={ticket.description}
                        onChange={
                            (evt) => {
                                const copy = {...ticket}
                                copy.description = evt.target.value
                                update(copy)
                            }
                        } />
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
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>






            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Daily:</label>
                    <input type="checkbox"
                        value={ticket.emergency}
                        onChange={
                            (evt) => {
                                const copy = {...ticket}
                                copy.emergency = evt.target.checked
                                update(copy)
                            }

                        } />
                </div>
            </fieldset>
            <button 
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit Ticket
            </button>
        </form>
    )
}

