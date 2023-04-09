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

    const navigate = useNavigate()  

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

        const shopToSendToAPI = {                  // variable object to be saved to API   
            userId: responsibleUserObject.id,              //gets the id directly from the api ... i think it gets it from somewhere i dont have to worry about
            description: shop.description,            // comes from state variable ticket 
            emergency: shop.emergency,
            shopWebsite: shop.shopWebsite,
            rate: shop.rate,    //step 2,,,,,,,,
            
            dateCompleted: ""                           // leave blank cause it hasnt been worked on 
        }


        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/serviceShops`, {   
            method: "POST",                                     
            headers: {                                          
                "Content-Type": "application/json"
            },
            body: JSON.stringify(shopToSendToAPI)             
    })   
            .then(response => response.json())
            .then(() => {
                navigate("/shops")                            
            })
        } 
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
                                const copy = {...shop}
                                copy.rate = parseFloat(evt.target.value, 2) 
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
