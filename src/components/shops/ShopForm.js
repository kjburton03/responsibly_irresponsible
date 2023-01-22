import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const ShopForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [shop, update] = useState({
        description: "", //initially want nothing to show up
        rate: 0,  // step 1..............
        img: "",
        shopWebsite: "",
        rate: 0,  // step 1..............
        emergency: false, //defaults toggle to not an emergency 

        // description and emergency will not show up until they are implemented into the onChange of their forms 

    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */

    const navigate = useNavigate()  //to send tickets to api ... variable that is a function

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

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

        const shopToSendToAPI = {                  // variable object to be saved to API   
            userId: honeyUserObject.id,              //gets the id directly from the api ... i think it gets it from somewhere i dont have to worry about
            description: shop.description,            // comes from state variable ticket 
            emergency: shop.emergency,
            shopWebsite: shop.shopWebsite,
            rate: shop.rate,    //step 2,,,,,,,,
            
            dateCompleted: ""                           // leave blank cause it hasnt been worked on 
        }


        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/serviceShops`, { //where the tickets are held in json  
            method: "POST",                                     //second argument is options method is to post. default operation is to get , this is post or create
            headers: {                                          //   specify header for content type so server knows its being passed to json being passed to json 
                "Content-Type": "application/json"
            },
            body: JSON.stringify(shopToSendToAPI)             // body of the request is the info the client wants the api to save
                                                                // can't send raw js object so we stringify it 
                                                                //saves it
    })   
            .then(response => response.json())                  //object has been sent the json server has responded 
            .then(() => {
                navigate("/shops")                            // navigates back to ticket list once submitted.
            })
        } //dont forget this guy
                                                                // when working with fetch devTools -> network  
                                                                   // add new ticket and it will show up under serviceTickets 201 status approves it

    return (
        <form className="shopForm">
            <h2 className="shopForm__title">New Shopping Item</h2>
            <fieldset>
                <div className="form-group"> 
                    <label htmlFor="description">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of problem"
                        value={shop.description}
                        onChange={
                            (evt) => {
                                const copy = {...shop}
                                copy.description = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            {/* step 3 */}
            <fieldset> 
                <div className="form-group">
                    <label htmlFor="name">Price:</label>
                    <input type="number"
                        className="form-control"
                        value={shop.rate}
                        onChange={
                            (evt) => {
                                // TODO: Update rate property
                                // even tho the type is number it will always return a string
                                // unlessss you wrap it in a parse 
                                const copy = {...shop}
                                copy.rate = parseFloat(evt.target.value, 2) //float is for decimal, 2 is for        components -> applicationviews -> employeeviews -> profile -> employee form -> changes state
                                //got initial state fethed from the api for the permanent state and updated the  component state and now capturing what the user did .next step saving
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Need it asap:</label>
                    <input type="checkbox"
                        value={shop.emergency}
                        onChange={
                            (evt) => {
                                const copy = {...shop}
                                copy.emergency = evt.target.checked
                                update(copy)
                            }

                        } />
                </div>
            </fieldset>
            <button 
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit shop item
            </button>
        </form>
    )
}


///// 3000/ticket/create? devtools -> components -> TicketForm -> hooks change while typing state variable matches input
/// watch how the state of the component changes ^^^ state variables emergency & id
