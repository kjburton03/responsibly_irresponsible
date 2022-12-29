import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const TodoForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [todo, update] = useState({
        description: "", //initially want nothing to show up
        daily: false //defaults toggle to not an emergency 
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
        // {
        //     "id": 2,   <---json makes this
        //     "userId": 3,
        //     "description": "Vero est adipisci sed natus quasi consectetur occaecati. Modi maxime sunt officia cumque. Vel at culpa. Sint accusamus deserunt dolorem qui.",
        //     "emergency": true,
        //     "dateCompleted": ""
        //   },  <----- what needs to be filled out to be sent to api 

        const todoToSendToAPI = {                  // variable object to be saved to API   
            userId: responsibleUserObject.id,              //gets the id directly from the api ... i think it gets it from somewhere i dont have to worry about
            description: todo.description,            // comes from state variable ticket 
            daily: todo.daily,
            dateCompleted: ""                           // leave blank cause it hasnt been worked on 
        }


        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/serviceTodos`, { //where the tickets are held in json  
            method: "POST",                                     //second argument is options method is to post. default operation is to get , this is post or create
            headers: {                                          //   specify header for content type so server knows its being passed to json being passed to json 
                "Content-Type": "application/json"
            },
            body: JSON.stringify(todoToSendToAPI)             // body of the request is the info the client wants the api to save
                                                                // can't send raw js object so we stringify it 
                                                                //saves it
    })   
            .then(response => response.json())                  //object has been sent the json server has responded 
            .then(() => {
                navigate("/todos")                            // navigates back to ticket list once submitted.
            })
        } //dont forget this guy
                                                                // when working with fetch devTools -> network  
                                                                   // add new ticket and it will show up under serviceTickets 201 status approves it

    return (
        <form className="todoForm">
            <h2 className="todoForm__title">New Todo List Item</h2>
            <fieldset>
                <div className="form-group"> 
                    <label htmlFor="description">idfk todoform . j s :</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Wake up fabulous"
                        value={todo.description}
                        onChange={
                            (evt) => {
                                const copy = {...todo}
                                copy.description = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Daily:</label>
                    <input type="checkbox"
                        value={todo.daily}
                        onChange={
                            (evt) => {
                                const copy = {...todo}
                                copy.daily = evt.target.checked
                                update(copy)
                            }

                        } />
                </div>
            </fieldset>
            <button 
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit Todo List Item
            </button>
        </form>
    )
}


///// 3000/ticket/create? devtools -> components -> TicketForm -> hooks change while typing state variable matches input
/// watch how the state of the component changes ^^^ state variables emergency & id





///// 2 form fields with 2 fieldsets with 2 separate divs both under the className form-group
//  each form field needs a default state ----- added to const [ticket, update] = useState{ description:"" emergency: ""}
// update our state via onChange///////////////// 
// Description :
//          value -> ticket.description
            //update state via onChange
            // onChange={
            //     (evt) => {                               /// <--- callback function  captures the change event 
            //         const copy = {...ticket}             //// created copy of existing state  , spread operator to copy ...dots
            //         copy.description = evt.target.value  //// modify the copy. new value of the description 
                                                                    /// property should be whatever the current value of the input
                                                                    /// field is and we get that through the event that is broadcast by the browser the change event 

                                                                    /// set the description to the event targets the value aka the target of the value of the event
            //         update(copy)                         /// now need to update the state  , passing copy back to be the state of each one of these.
            //     }
            // } /> 

// Emergency toggle 
        //          value -> ticket.emergency 

        // evt.target.checked -> returns as true or false 





// button 
        //submits ticket via fetch to api
        // builds new object ...json makes the primary server key for us. 
        // clickevent is passed on from the onclick to the functio