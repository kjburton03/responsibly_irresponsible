// // Create a new module src/components/tickets/TicketEdit.js.

// // The edit form is, largely, the same as the TicketForm component. It has some important differences.

// // You need to GET the data based on the route parameter
// // The request to save the data is a PUT instead of a POST
// // The checked attribute of the checkbox must be bound to the ticket.emergency property
// // You can give it your best shot to transpose the code from TicketForm to TicketEdit and change it where needed, or you can snag the starter code below.


import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const ShopEdit = () => {
    const [shop, assignShop] = useState({
        description: "",
        rate: 0,
        img: "",
        shopWebsite: "",
        emergency: false,
        
    })
    const { shopId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:8088/serviceShops/${shopId}`)
            .then(response => response.json())
            .then((data) => {
                assignShop(data)
            })
    }, [shopId])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/serviceShops/${shop.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(shop)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/shops")
            })
    }


    return <form className="shopForm">
        <h2 className="shopForm__title">Edit Shopping Item</h2>
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
                    value={shop.description}
                    onChange={
                        (evt) => {
                            const copy = { ...shop }
                            copy.description = evt.target.value
                            assignShop(copy)
                        }
                    }>{shop.description}</textarea>
            </div>
        </fieldset>

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
                                assignShop(copy)
                            }
                        } />
                </div>
            </fieldset>
            {/* step 4 */}
            {/* <input type="url" name="url" id="url"
       placeholder="https://example.com"
       pattern="https://.*" size="30"
       required> */}
            {/* <fieldset>
            <div className="form-group">
                <label htmlFor="shopWebsite"> Website Link </label>
                <textarea
                    required autoFocus
                    type="url"
                    style={{
                        height: "10rem"
                    }}
                    className="form-control"
                    placeholder="https://www.amazon.com/"
                    value={shop.shopWebsite}
                    onChange={
                        (evt) => {
                            const copy = { ...shop }
                            copy.shopWebsite = evt.target.value
                            assignShop(copy)
                        }
                    }>{shop.shopWebsite}</textarea>
            </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="image"> Upload Image </label>
            <input
              type="img"
              id="image"
              className="form-control"
              placeholder="Upload Image"
              required
              value={shop.img}
              onChange={(evt) => {
                const copy = { ...shop };
                copy.img = evt.target.value;
                assignShop(copy);
              }}
            />
          </div>
        </fieldset> */}
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Need it asap:</label>
                <input type="checkbox"
                    checked={shop.emergency}
                    onChange={
                        (evt) => {
                            const copy = { ...shop }
                            copy.emergency = evt.target.checked
                            assignShop(copy)
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
