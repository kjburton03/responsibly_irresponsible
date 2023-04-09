import { Link } from "react-router-dom"
import "./Shops.css"

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
            dateCompleted: new Date() ,
            rate: shopObject.rate

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

        <section>  {shopObject.shopWebsite}</section>
        <section>  {shopObject.emergency ? " " : "✖️"} Need Asap</section>

        <footer>
        
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
