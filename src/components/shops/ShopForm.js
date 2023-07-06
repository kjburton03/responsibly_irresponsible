import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createShop, getShops } from "../../managers/ShopManager"


export const ShopForm = () => {
    const navigate = useNavigate()  

    const [currentShop, setCurrentShop] = useState({
        title: "", 
        price: 0,
        asap: false 
    })
const changeShopState = (shop) => {
    const copy = { ...currentShop }
    copy[shop.target.name] = shop.target.value
    setCurrentShop(copy)
}

    return (
        <form className="shopForm">
            <h2 className="shopForm__title">New shopping list item</h2>
            <fieldset>
                <div className="form-group"> 
                    <label htmlFor="title">Description:</label>
                    <input
                        type="text"
                        name="title" required autoFocus
                        className="form-control"
                        placeholder="Brief description shop list item"
                        value={currentShop.title}
                        onChange={changeShopState}/>
                </div>
            </fieldset>
            <fieldset> 
                <div className="form-group">
                    <label htmlFor="name">Cost:</label>
                    <input type="number"
                        name="price"
                        className="form-control"
                        value={currentShop.price}
                        onChange={changeShopState} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Daily:</label>
                    <input type="checkbox"
                        value={currentShop.asap}
                        onChange={changeShopState} />
                </div>
            </fieldset>
        <button type="submit"
            onClick={evt => {
                evt.preventDefault()

                const shop = {
                    title: currentShop.title,
                    price: currentShop.price,
                    asap: currentShop.asap

                }
                
                createShop(shop)
                    .then(() => navigate("/shops"))
            }}
            className="btn btn-primary">Create</button>
        </form>
    )
}
