import { Link } from "react-router-dom"
import "./Shops.css"

export const Shop = ({shopObject, currentUser, customers, getAllShops}) => {
    let assignedCustomer = null

    if (shopObject.customerShops?.length > 0) {
        const shopCustomerRelationship = shopObject.customerShops[0]
        assignedCustomer = customers.find(customer => customer.id === shopCustomerRelationship.customerId)
    }

    const userCustomer = customers?.find(customer => customer.userId === currentUser.id)

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
                    .then(() => { 
                        getAllShops()

                    })
            }} className="shop__delete"> Delete </button> 
        }
        else {
            return ""
        }

    }

    const closeShop = () => {
        const copy = {
            userId: shopObject.userId,
            description: shopObject.description,
            img: shopObject.img,
            website: shopObject.shopWebsite,
            asap: shopObject.asap,
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
            .then(getAllShops) 
    }

    return <section className="shop" key={`shop--${shopObject.id}`} >
        <header>
            {/* {
                currentUser.staff */}
                    <h4> `Shop ${shopObject.id}` </h4> 
                  <Link to={`/shops/${shopObject.id}/edit`}> {shopObject.description}</Link>


            {/* } */}
        </header> 
        <section>Cost $ {shopObject.rate} </section>

        <section>  {shopObject.shopWebsite}</section>
        <section>  {shopObject.daily ? " " : "✖️"} Need Asap</section>

        <footer>
        
            {
                shopObject.customerTodos
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
