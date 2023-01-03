import { Link } from "react-router-dom"

export const Shop = ({shopObject, currentUser, customers, getAllShops}) => {
    // .. Find the assigned employee for the current ticket 
    let assignedCustomer = null

    if (shopObject.customerShops?.length > 0) {
        const shopCustomerRelationship = shopObject.customerShops[0]
        assignedCustomer = customers.find(customer => customer.id === shopCustomerRelationship.customerId)
    }

    // if (shopObject.employeeShops.length > 0) {
    //     const shopEmp
    // }
    /// to match erd links idfk too brain dead to care at this point ** data relationships v important 11:30+ is recap on video of claim tickets
    // fine the employee profile object for the current user 
    const userCustomer = customers?.find(customer => customer.userId === currentUser.id)

    // function that determines if the current user can close the ticket 
    //only appears for the employee working on it 
    // is the button closed true or fals and when should the button be displayed
    // update the api
    // make sure the employee id and the assigned employee match anddd that the ticket is not already completed. 
    const canClose = () => {
        if (userCustomer?.id === assignedCustomer?.id && shopObject.dateCompleted === "") {
            return <button onClick={closeShop} className="shop__finish"> Add to Bag</button>
        }
        else {
            return ""
        }

    }


    const deleteButton = () => {
        if (!currentUser.staff) {
            return <button onClick={() => {
                fetch(`http://localhost:8088/serviceShops/${shopObject.id}`, {
                    method: "DELETE"
                })
                    // .then(response => response.json()) <--- dont need it since we arent sending anything
                    .then(() => { 
                        getAllShops()

                    })
            }} className="shop__delete"> Delete </button> //network -> name -> headers & preview
        }
        else {
            return ""
        }

    }

    // function that updates the ticket with a new date completed
    const closeShop = () => {
        const copy = {
            userId: shopObject.userId,
            description: shopObject.description,
            img: shopObject.img,
            website: shopObject.shopWebsite,
            emergency: shopObject.emergency,
            dateCompleted: new Date()

        }

        return fetch(`http://localhost:8088/serviceShops/${shopObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(copy)

        })
            .then(response => response.json())
            .then(getAllShops) //pull new api state back in

    }

    const buttonOrNoButton = () => {
        if (!currentUser.staff) {
            return <button 
                     onClick={() => {
                        fetch(`http://localhost:8088/customerShops`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                employeeId: userCustomer.id, // was currentUser.id but that returns undefined. video saved for future help... claiming tickets in capstone needs find operattion, id and user id must match
                                serviceShopId: shopObject.id
                            })
                        })
                            .then(response => response.json()) //network-> 201
                            .then(() => {
                                //GET the state from the API again
                                getAllShops()
                            }) 
                     }}
                    >add to bag</button>
        }
        else {
            return ""
        }
    }

    //footer and header both have conditional logic
    // button does fetch to get api state and modify it , gets new data and rerenders all tickets 
    return <section className="shop" key={`shop--${shopObject.id}`} >
        <header>
            {
                currentUser.staff
                    ?  `Shop ${shopObject.id}`
                    :  <Link to={`/shops/${shopObject.id}/edit`}> {shopObject.description}</Link>


            }
        </header> 
        {/* <section>{shopObject.description}</section> */}
        <section>Cost $ {shopObject.rate} </section>
        {/* <section>
                <div >
                    <label htmlFor="name"></label>
                    <input type="checkbox"
                        value={shopObject.rate}
                        onChange={
                            (evt) => {
                                const copy = {...shopObject}
                                copy.rate = evt.target.checked
                                update(copy)
                            }

                        } />
                </div>
            </section> */}

        {/* <fieldset>
                <div className="classic-menu-form-group">

                    {menuItems.map(menuItem => {

                        return <>
                            <div className="classic_menu_label_and_input_container">
                                <input
                                    required autoFocus
                                    className="form-control"
                                    id="menu-form-control"
                                    key={`menu_choice--${menuItem.id}`}
                                    type="radio"
                                    name="classic_menu_item"
                                    value={menuItem.id}
                                    onChange={
                                        (evt) => {
                                            const copy = { ...setMenuItemChoices }
                                            copy.menuItemId = parseInt(evt.target.value)
                                            setMenuItemChoices(copy)
                                        }}
                                />
                                <label htmlFor="classic menu">{menuItem.name}, ${menuItem.price.toFixed(2)}</label>
                            </div>
                        </>
                    })}
                </div>
            </fieldset> */}
            
        <section>  {shopObject.shopWebsite}</section>
        <section> Need asap: {shopObject.emergency ? "figure it out" : "nah"}</section>
      
        <footer>
            {/* {
                shopObject.employeeShops.length
                    ? `currently being worked on by ${assignedEmployee !== null ? assignedEmployee?.user?.fullName : ""}`
                    : buttonOrNoButton()
            } */}
            {/* {
                finished  {employee?.employeeTickets?.length} todo items
            } */}
            {
                shopObject.customerTickets
            }
            {
                canClose()
            }
            {
                deleteButton()
            }

        </footer>

    
    </section>
}

// button has nested ternary objects turned into a function to return the correct thing.
{/* <footer>
{
    ticketObject.employeeTickets.length
        ? `currently being worked on by ${assignedEmployee !== null ? assignedEmployee?.user?.fullName : ""}`
        : <button 
         onClick={() => {
            fetch(`http://localhost:8088/employeeTickets`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    employeeId: userEmployee.id, // was currentUser.id but that returns undefined. video saved for future help... claiming tickets in capstone needs find operattion, id and user id must match
                    serviceTicketId: ticketObject.id
                })
            })
                .then(response => response.json()) //network-> 201
                .then(() => {
                    //GET the state from the API again
                    getAllTickets()
                }) 
         }}
        >Claim</button>
}
</footer> */}


// //        <header>
// <Link to={`/tickets/${ticketObject.id}/edit`}>Ticket {ticketObject.id} </Link>
// </header>
// <section>{ticketObject.description}</section>
// <footer>Emergency: {ticketObject.emergency ? "duh" : "Nuh"}</footer>