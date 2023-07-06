// import { Outlet, Route, Routes } from "react-router-dom"
// import { TicketList } from "../tickets/TicketList"  //in ticketContainer
// import { TicketForm } from "../tickets/TicketForm" /// dont want staff to have the ability to create tickets
// import { TicketSearch } from "../tickets/TicketSearch" //in ticketContainer
// import { TicketContainer } from "../tickets/TicketContainer" //parent
// import { EmployeeList } from "../employees/EmployeeList"
// import { EmployeeDetails } from "../employees/EmployeeDetails"
// import { CustomerList } from "../customers/CustomerList"
// import { CustomerDetails } from "../customers/CustomerDetails"
// import { Profile } from "../profile/Profile"

// export const EmployeeViews = () => {
// 	return (
//         <Routes>
//             <Route path="/" element={
//                 <>
//                     <h1> Responsibly Irresponsible</h1>
//                     <div>Are you ready to live your life luxuriously</div>

//                     <Outlet />
//                 </>
//             }>

//                 <Route path="tickets" element={ <TicketContainer /> } />
//                                             {/* links to ticketContainer which is the parent of ticket search and ticket list */}
//                 <Route path="employees" element={ <EmployeeList /> } />
//                                                     {/* route to employee list */}
//                 <Route path="employees/:employeeId" element={ <EmployeeDetails/> } />
//                                                 {/* employee/employeeId leads to individual employees  */} 
//                 <Route path="customers" element={ <CustomerList /> } />

//                 <Route path="customers/:customerId" element={ <CustomerDetails/> } />

//                 <Route path="profile" element={ <Profile/> } />
//             </Route>
//         </Routes>
//     )
// }
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
                        placeholder="Brief description todo list item"
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
