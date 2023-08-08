import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Shops.css"
import { Shop } from "./Shop"
import { deleteShop, getShops, createShop, updateShop } from "../../managers/ShopManager"



export const ShopList = (props) => {  
    const [shops, setShops] = useState([])
    const navigate = useNavigate() 
    const userId = parseInt(localStorage.getItem("responsibly_token"));

    useEffect(() => {
        getShops().then((data) => setShops(data))
    }, [])
    
    useEffect(() => {
        getShops().then((data) => {
        
        const updatedShops = data.map((shop) => ({
            ...shop,
            addedByCurrentUser: shop.client?.id === parseInt(userId),
        }));

        setShops(updatedShops);
        });
    }, [userId]);

    const deleteButton = (id) => {
            deleteShop(id)
            .then(() => {
                getShops().then(data => setShops(data))
            })
    }

    return (
        <>
        <h1>Howtie</h1>
        <article className="shops">
        <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
                navigate({ pathname: "/shopForm" })
                }}>Add New shop item</button>
            <article className="shop__body">
            {
                shops.map(shop => {
                    return <section key={`shop--${shop.id}`} className="shop">
                        <div className="shop__title">{shop.title}</div>
                        <div className="shop__price"> Price: {shop.price} </div>
                        <div className="shop__asap">Daily: {shop.asap ? "✔️" : "✖️"}</div>

                        <div className="shop__footer">
                        
                            <><button className="btn btn-2 btn-sep icon-create"
                                    onClick={() => {
                                        navigate({ pathname: `editShop/${shop.id}` })
                                    } }>Edit</button><button className="btn btn-2 btn-sep icon-create"
                                        onClick={() => { deleteButton(shop.id) } }>Delete</button></>      

                        </div>
                    </section>
                })
            }
            </article>
        </article>
        </>
    )
}



//     const [filteredShops, setFiltered] = useState([])

//     // const [clients, setClients] = useState([])

//     const [asap, setAsap] = useState(false)

//     const [openOnly, updateOpenOnly] = useState(false)
    
//     // const localResponsibleUser = localStorage.getItem("responsible_token")

//     // const responsibleUserObject = JSON.parse(localResponsibleUser) 
//     useEffect(() => {
//         getShops().then(data => setShops(data))
//     }, [])

//     useEffect(() => {
//         getShops().then((data) => {
        
//         const updatedShops = data.map((shop) => ({
//             ...shop,
//             addedByCurrentUser: shop.user?.id === parseInt(userId),
//         }));
//         setShops(updatedShops)
//         });
//     }, [userId]);

//     const deleteButton = (id) => {
//             deleteShop(id)
//             .then(() => {
//                 getShops().then(data =>
//                     setShops(data))
//             })
//     }

//     // useEffect(
//     //     () => {
//     //         if (daily) {
//     //         const dailyTodos = todos.filter(todo => todo.daily === true) 
//     //         setFiltered(dailyTodos) 
//     //         }
//     //         else {
//     //             setFiltered(todos)  
//     //         }

//     //     },
//     //     [daily] 
//     // )

//         // const getAllTodos = () => {
//         //     fetch(`http://localhost:8000/todos`) 
//         //     .then(response => response.json()) 
//         //     .then((todoArray) => {
//         //         setTodos(todoArray)
                
//         //     }) 
//         // }



//     // useEffect(
//     //     () => {
//     //         getAllTickets()
//     //         fetch(`http://localhost:8088/serviceTickets?_embed=tickets`) 
//     //             .then(response => response.json()) 
//     //             .then((ticketArray) => {
//     //                 setTickets(ticketArray)
                    
//     //             }) 
//     //                 fetch(`http://localhost:8088/clients?_expand=user`) 
//     //                 .then(response => response.json()) 
//     //                 .then((clientArray) => {
//     //                     setClients(clientArray)
                        
//     //                 }) 
//     //     },
//     //     []          
//     // )

//         useEffect(
//             () => {
//                 if(userId) {
//                     setFiltered(shops)
//                 }
//                 else {
//                     // const myTickets = tickets.filter(ticket => ticket.userId === responsibleUserObject.id)
                    
//                     setFiltered(shops)
//                 }
//             },
//             [shops]
//         )

//     useEffect( 
//         () => {  
//             if (openOnly) { 
//                 const openShopArray =  shops.filter(shop => {
//                     return shop.userId === userId && shop.dateCompleted === ""   
//             })
//             setFiltered(openShopArray)
//             }
//             else {
//                 const myShops = shops.filter(shop => shop.userId === userId) 
                
//                 setFiltered(myShops)

//             }
//         },
//         [ openOnly ]

//     )

//     const bankTotal = () => {
//                 const completedShops = shops.filter(shop => shop.dateCompleted?.length > 1 ) 
//                 const total = completedShops.reduce((accumulator, currentValue) => {
//                     return accumulator + currentValue.rate;
//                 }, 0);
//         return total
//     }

//     return <> 
//         <div className="bank">
//             Bank Total $ {bankTotal()}
//         </div>
//     <div>
//         <div className="buttons">
//             <button onClick={() => navigate("/shop/create")} className="button">Add new</button>
//             <button onClick={ () => { setAsap(true) }} className="button">asap rocky mami</button>
//             <button onClick={ () => { setAsap(false) }} className="button">Show All</button>
//         </div>
    

    
//         <article className="shop_container">
//                 {
//         filteredShops.map((shop) => (
//             <Shop
//             key={shop.id} // Use the 'id' property as the key
//             getShops={getShops}
//             currentUser={userId}
//             shopObject={shop}
//             />
//         ))
//         }
// {/* 
//             {
//                 filteredTodos.map(
//                     (todo) => <Todo 
//                         getTodos={getTodos} 
//                         currentUser={userId} 
//                         todoObject={todo} />
//                 )
//             } */}
//         </article>
//         {/* </fieldset> */}
//         </div>

//     </>
// }



// // import { useEffect, useState } from "react"
// // import { Link, useNavigate } from "react-router-dom"
// // import { Shop } from "./Shop"
// // import { deleteShop, getShops } from "../../managers/ShopManager"
// // import "./Shops.css"



// // export const ShopList = (props) => {  
// //     const [shops, setShops] = useState([])
// //     const navigate = useNavigate() 
// //     const userId = parseInt(localStorage.getItem("responsibly_token"));
    

// //     const [filteredShops, setFiltered] = useState([])

// //     // const [clients, setClients] = useState([])

// //     const [asap, setAsap] = useState(false)

// //     const [openOnly, updateOpenOnly] = useState(false)
    
// //     // const localResponsibleUser = localStorage.getItem("responsible_token")

// //     // const responsibleUserObject = JSON.parse(localResponsibleUser) 
// //     useEffect(() => {
// //         getShops().then(data => setShops(data))
// //     }, [])

// //     useEffect(() => {
// //         getShops().then((data) => {
        
// //         const updatedShops = data.map((shop) => ({
// //             ...shop,
// //             addedByCurrentUser: shop.user?.id === parseInt(userId),
// //         }));
// //         setShops(updatedShops)
// //         });
// //     }, [userId]);

// //     const deleteButton = (id) => {
// //             deleteShop(id)
// //             .then(() => {
// //                 getShops().then(data =>
// //                     setShops(data))
// //             })
// //     }

// //     // useEffect(
// //     //     () => {
// //     //         if (daily) {
// //     //         const dailyTodos = todos.filter(todo => todo.daily === true) 
// //     //         setFiltered(dailyTodos) 
// //     //         }
// //     //         else {
// //     //             setFiltered(todos)  
// //     //         }

// //     //     },
// //     //     [daily] 
// //     // )

// //         // const getAllTodos = () => {
// //         //     fetch(`http://localhost:8000/todos`) 
// //         //     .then(response => response.json()) 
// //         //     .then((todoArray) => {
// //         //         setTodos(todoArray)
                
// //         //     }) 
// //         // }



// //     // useEffect(
// //     //     () => {
// //     //         getAllTickets()
// //     //         fetch(`http://localhost:8088/serviceTickets?_embed=tickets`) 
// //     //             .then(response => response.json()) 
// //     //             .then((ticketArray) => {
// //     //                 setTickets(ticketArray)
                    
// //     //             }) 
// //     //                 fetch(`http://localhost:8088/clients?_expand=user`) 
// //     //                 .then(response => response.json()) 
// //     //                 .then((clientArray) => {
// //     //                     setClients(clientArray)
                        
// //     //                 }) 
// //     //     },
// //     //     []          
// //     // )

// //         useEffect(
// //             () => {
// //                 if(userId) {
// //                     setFiltered(shops)
// //                 }
// //                 else {
// //                     // const myTickets = tickets.filter(ticket => ticket.userId === responsibleUserObject.id)
                    
// //                     setFiltered(shops)
// //                 }
// //             },
// //             [shops]
// //         )

// //     useEffect( 
// //         () => {  
// //             if (openOnly) { 
// //                 const openShopArray =  shops.filter(shop => {
// //                     return shop.userId === userId && shop.dateCompleted === ""   
// //             })
// //             setFiltered(openShopArray)
// //             }
// //             else {
// //                 const myShops = shops.filter(shop => shop.userId === userId) 
                
// //                 setFiltered(myShops)

// //             }
// //         },
// //         [ openOnly ]

// //     )

// //     const bankTotal = () => {
// //                 const completedShops = shops.filter(shop => shop.dateCompleted?.length > 1 ) 
// //                 const total = completedShops.reduce((accumulator, currentValue) => {
// //                     return accumulator + currentValue.rate;
// //                 }, 0);
// //         return total
// //     }

// //     return <> 
// //         <div className="bank">
// //             Bank Total $ {bankTotal()}
// //         </div>
// //     <div>
// //         <div className="buttons">
// //             <button onClick={() => navigate("/shop/create")} className="button">Add new</button>
// //             <button onClick={ () => { setAsap(true) }} className="button">Asap</button>
// //             <button onClick={ () => { setAsap(false) }} className="button">Show All</button>
// //         </div>
    

    
// //         <article className="shop_container">

// //             {
// //                 filteredShops.map(
// //                     (shop) => <Shop 
// //                         getShops={getShops} 
// //                         currentUser={userId} 
// //                         shopObject={shop} />
// //                 )
// //             }
// //         </article>
// //         {/* </fieldset> */}
// //         </div>

// //     </>
// // }



// // // import { useEffect, useState } from "react"
// // // import { Link, useNavigate } from "react-router-dom"
// // // import { Shop } from "./Shop"
// // // import "./Shops.css"




// // // export const ShopList = ({ searchTermState }) => {  
// // //     const [shops, setShops] = useState([])

// // //     const [filteredShops, setFiltered] = useState([])

// // //     const [employees, setEmployees] = useState([])

// // //     const [asap, setAsap] = useState(false)

// // //     const [openOnly, updateOpenOnly] = useState(false)

    

    
// // //     const navigate = useNavigate() 



// // //     const localResponsibleUser = localStorage.getItem("responsibly_token")

// // //     const responsibleUserObject = JSON.parse(localResponsibleUser) 


// // //     useEffect(
// // //         () => {
// // //             const searchedShops = shops.filter(shop => {
// // //                 return shop.description.toLowerCase().startsWith(searchTermState.toLowerCase())
            
// // //             })
// // //             setFiltered(searchedShops)
// // //         },
// // //         [ searchTermState ]
// // //     )
    
// // //     useEffect(
// // //         () => {
// // //             if (asap) {
// // //                const asapShops = shops.filter(shop => shop.asap === true) //* uses original ticket & returns every ticket to an array
// // //                setFiltered(asapShops)
// // //             }
// // //             else {
// // //                 setFiltered(shops) 
// // //             }

// // //         },
// // //         [asap] 
// // //     )
// // //         const getAllShops = () => {
// // //             fetch(`http://localhost:8088/serviceShops?_embed=employeeShops`)
// // //             .then(response => response.json()) 
// // //             .then((shopArray) => {
// // //                 setShops(shopArray)
                
// // //             }) 
// // //         }



// // //     useEffect(
// // //         () => {
// // //             getAllShops()
// // //             fetch(`http://localhost:8088/serviceShops?_embed=employeeShops`) 
// // //                 .then(response => response.json())
// // //                 .then((shopArray) => {
// // //                     setShops(shopArray)
                    
// // //                 })
// // //                     fetch(`http://localhost:8088/employees?_expand=user`)
// // //                     .then(response => response.json()) 
// // //                     .then((employeeArray) => {
// // //                         setEmployees(employeeArray)
                        
// // //                     }) 
// // //         },
// // //         []
// // //     )


// // //         useEffect(
// // //             () => {
// // //                 if(responsibleUserObject.staff) {
// // //                     setFiltered(shops)
// // //                 }
// // //                 else {
// // //                     const myShops = shops.filter(shop => shop.userId === responsibleUserObject.id)
                    
// // //                     setFiltered(myShops)
// // //                 }
// // //             },
// // //             [shops]
// // //         )

// // //     useEffect(
// // //         () => {
// // //             if (openOnly) { 
// // //                 const openShopArray =  shops.filter(shop => {
// // //                     return shop.userId === responsibleUserObject.id && shop.dateCompleted === ""
// // //             })
// // //             setFiltered(openShopArray)
// // //             }
// // //             else {
// // //                 const myShops = shops.filter(shop => shop.userId === responsibleUserObject.id)
                
// // //                 setFiltered(myShops)


// // //             }
// // //         },
// // //         [ openOnly ] 
// // //     )

// // //     const bankTotal = () => {
// // //         const completedShops = shops.filter(shop => shop.dateCompleted?.length > 1 ) 
// // //         const total = completedShops.reduce((accumulator, currentValue) => {
// // //             return accumulator + currentValue.rate;
// // //         }, 0);
// // //         return total
// // //     }



// // //     return <> 
// // //         <div className="bank">
// // //             Shopping Cart Total $ {bankTotal()}
// // //         </div>
// // //     <div>
// // //     <h1>Shopping List</h1>

// // //         <div className="buttons">
// // //             <button onClick={() => navigate("/shop/create")} className="button">Add new item</button>
// // //             <button onClick={ () => { setAsap(true) }} className="button">Need it now</button>
// // //             <button onClick={ () => { setAsap(false) }} className="button">Show All</button>

// // // </div>
    
// // //         <article className="shop_container">

// // //             {
// // //                 filteredShops.map(
// // //                     (shop) => <Shop employees={employees} 
// // //                         getAllShops={getAllShops} 
// // //                         currentUser={responsibleUserObject} 
// // //                         shopObject={shop} />
// // //                 )
// // //             }
// // //         </article>
// // //         </div>

// // //     </>
// // // } 
