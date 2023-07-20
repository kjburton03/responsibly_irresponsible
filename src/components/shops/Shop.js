import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getShops, deleteShop } from "../../managers/ShopManager";
import "./Shops.css";

export const Shop = (props) => {
  const [shops, setShops] = useState([]);

  const navigate = useNavigate();

  const handleClick = (id) => {
    deleteShop(id).then(() => {
      // After deleting the shop, update the shops state by filtering out the deleted shop
      setShops((prevShops) => prevShops.filter((shop) => shop.id !== id));
    });
  };

  useEffect(() => {
    getShops().then((data) => setShops(data));
  }, []); // Empty dependency array ensures the useEffect runs only once on mount

  return (
    <article className="shop">
      {/* Render shop data */}
      {shops.map((shop) => (
        <section key={`shop--${shop.id}`} className="shop">
          <div className="shop__title">{shop.title}</div>
          <div className="shop__price">Price: $ {shop.price} </div>
          <div className="shop__asap">Daily: {shop.asap ? "✔️" : "✖️"}</div>
          <div className="todo__footer">
            <button
              onClick={() => {
                navigate({ pathname: `edit/${shop.id}` });
              }}
            >
              Edit
            </button>
          </div>
          <div className="game__footer">
            <button onClick={() => handleClick(shop.id)}>Delete</button>
          </div>
        </section>
      ))}
    </article>
  );
};




// // import { Link } from "react-router-dom"
// // import { deleteTodo, getTodos } from "../../managers/TodoManager"
// import { useEffect, useState } from "react"
// import { Link, useNavigate } from "react-router-dom"
// // import { deleteTodo, getTodos } from "../../managers/TodoManager"
// import { getShops, deleteShop } from "../../managers/ShopManager"
// import "./Shops.css"



// export const Shop = (props) => {
//     const [ refresh, setRefresh ] = useState(true)
//     const [ shops, setShops ] = useState([
//         {id: 0,
//         title: "",
//         price: 0,
//         asap: false,
//         client: {}
//         }
//     ])
//     const navigate = useNavigate()

//     function refreshPage() {
//         window.location.reload(false)
//     }

//     // useEffect(() => {
//     //     getShops().then(data => setShops(data))
//     // }, [,refresh])

//     useEffect(() => {
//         getShops().then(data => setShops(data));
//     }, [refresh]);

//     const handleClick = (id) => {
//         deleteShop(id).then(refreshPage)
//     }

//     return (
//         <article className="shop">
//             {/* <button className="btn btn-2 icon-create"
//                 onClick={() => {
//                     navigate({ pathname: "new" })
//                 }}
//             >Register New Todo Item</button> */}
//             {
//                 shops.map(shop => {
//                     return <section key={`shop--${shop.id}`} className="shop">
//                         <div className="shop__title">{shop.title}</div>
//                         <div className="shop__price">Price: $ {shop.price} </div>
//                         <div className="shop__asap">Daily: {shop.asap ?  "✔️": "✖️"}</div>
//                         <div className="todo__footer">
//                             <button
//                                 onClick={() => {
//                                     navigate({ pathname: `edit/${shop.id}`})
//                                 }}>Edit</button>
//                         </div>
//                         <div className="game__footer">
//                             <button
//                                 onClick={() => {
//                                     handleClick(shop.id)
//                                 }}>Delete</button>
//                         </div>
//                     </section>
//                 })
//             }
//         </article>
//     )
// }




    // let assignedClient = null
    // const userClient = clients.find(client => client.userId === currentUser.id)

    // const canClose = () => {
    //     if (userClient?.id === assignedClient?.id && todoObject.dateCompleted === "") {
    //         return <button onClick={closeTodo} className="todo__finish"> Completed  </button>
    //     }
    //     else {
    //         return ""
    //     }

    // }



    
//         const deleteButton = (id) => {
//             deleteTodo(id)
//             .then(() => {
//                 getTodos().then(data =>
//                     setTodos(data))
//             })
//     }


//     const closeTodo = () => {
//         const copy = {
//             userId: todoObject.userId,
//             title: todoObject.title,
//             daily: todoObject.daily,
//             dateCompleted: new Date() ,
//             rate: todoObject.rate

//         }

//         return fetch(`http://localhost:8088/Todos/${todoObject.id}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(copy)

//         })
//             .then(response => response.json())
//             .then(getAllTodos) //pull new api state back in

//     }

//     return <fieldset className="sendPrayer">
//     <section className="todo" key={`todo--${todoObject.id}`}>
//         <header>
//             <Link to={`/todos/${todoObject.id}/edit`} className="link"> {todoObject.title}</Link>
//         </header> 
//         <section>Earn $ {todoObject.price}</section>
//         <section> {todoObject.daily ?  " ": "✖️"} Daily</section>
//         <footer>

//         <button
//                                 onClick={() => {
//                                     handleClick(todo.id)
//                                 }}>Delete</button>
//         </footer>

    
//     </section>
//     </fieldset>
// }

// import { Link } from "react-router-dom"

// export const Shop = ({shopObject, currentUser, clients, getAllShops}) => {

//     const deleteButton = () => {
//         if (!currentUser.staff) {
//             return <button onClick={() => {
//                 fetch(`http://localhost:8088/Shops/${shopObject.id}`, {
//                     method: "DELETE"
//                 })

//                     .then(() => { 
//                         getAllShops()

//                     })
//             }} className="shop__delete"> Delete </button> 
//         }
//         else {
//             return ""
//         }

//     }

//     const closeShop = () => {
//         const copy = {
//             userId: shopObject.userId,
//             title: shopObject.title,
//             asap: shopObject.asap,
//             dateCompleted: new Date() ,
//             rate: shopObject.rate

//         }

//         return fetch(`http://localhost:8088/Shops/${shopObject.id}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(copy)

//         })
//             .then(response => response.json())
//             .then(getAllShops) //pull new api state back in

//     }

//     return <fieldset className="sendPrayer">
//     <section className="shop" key={`shop--${shopObject.id}`}>
//         <header>
//             {
//                 currentUser.staff
//                     ?  `Shop ${shopObject.id}`
//                     :  <Link to={`/shops/${shopObject.id}/edit`} className="link"> {shopObject.title}</Link>


//             }
//         </header> 
//         <section>price $ {shopObject.price}</section>
//         <section> {shopObject.asap ?  " ": "✖️"} Daily</section>
//         <footer>

//             {
//                 deleteButton()
//             }
//         </footer>

    
//     </section>
//     </fieldset>
// }




// // import { Link } from "react-router-dom"
// // import "./Shops.css"

// // export const Shop = ({shopObject, currentUser, clients, getAllShops}) => {
// //     // let assignedCustomer = null

// //     if (shopObject.customerShops?.length > 0) {
// //         const shopCustomerRelationship = shopObject.customerShops[0]
// //         assignedCustomer = customers.find(customer => customer.id === shopCustomerRelationship.customerId)
// //     }

// //     const userCustomer = customers?.find(customer => customer.userId === currentUser.id)

// //     const canClose = () => {
// //         if (userCustomer?.id === assignedCustomer?.id && shopObject.dateCompleted === "") {
// //             return <button onClick={closeShop} className="shop__finish"> Add to Bag</button>
// //         }
// //         else {
// //             return ""
// //         }

// //     }


// //     const deleteButton = () => {
// //         if (!currentUser.staff) {
// //             return <button onClick={() => {
// //                 fetch(`http://localhost:8088/serviceShops/${shopObject.id}`, {
// //                     method: "DELETE"
// //                 })
// //                     .then(() => { 
// //                         getAllShops()

// //                     })
// //             }} className="shop__delete"> Delete </button> 
// //         }
// //         else {
// //             return ""
// //         }

// //     }

// //     const closeShop = () => {
// //         const copy = {
// //             userId: shopObject.userId,
// //             description: shopObject.description,
// //             img: shopObject.img,
// //             website: shopObject.shopWebsite,
// //             asap: shopObject.asap,
// //             dateCompleted: new Date() ,
// //             rate: shopObject.rate

// //         }

// //         return fetch(`http://localhost:8088/serviceShops/${shopObject.id}`, {
// //             method: "PUT",
// //             headers: {
// //                 "Content-Type": "application/json"
// //             },
// //             body: JSON.stringify(copy)

// //         })
// //             .then(response => response.json())
// //             .then(getAllShops) 
// //     }

// //     return <section className="shop" key={`shop--${shopObject.id}`} >
// //         <header>
// //             {/* {
// //                 currentUser.staff */}
// //                     <h4> `Shop ${shopObject.id}` </h4> 
// //                   <Link to={`/shops/${shopObject.id}/edit`}> {shopObject.description}</Link>


// //             {/* } */}
// //         </header> 
// //         <section>Cost $ {shopObject.rate} </section>

// //         <section>  {shopObject.shopWebsite}</section>
// //         <section>  {shopObject.daily ? " " : "✖️"} Need Asap</section>

// //         <footer>
        
// //             {
// //                 shopObject.customerTodos
// //             }
// //             {
// //                 canClose()
// //             }
// //             {
// //                 deleteButton()
// //             }

// //         </footer>

    
// //     </section>
// // }
