import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getShopById, updateShop } from "../../managers/ShopManager"


export const ShopEdit = () => {
    const navigate = useNavigate()

    const { shopId } = useParams()

        const [currentShop, setCurrentShop] = useState({
            title: "",
            price: 0,
            asap: false
        })
    useEffect(() => {
        getShopById(shopId).then((data) => {
            setCurrentShop(data)
        })
    }, [shopId])

    const changeShopState = (shop) => {
        const copy = { ...currentShop }
        copy[shop.target.title] = shop.target.value
        setCurrentShop(copy)
    }

    return ( 
    <form className="shopForm">
        <h2 className="shopForm__title">Shop</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="title">Description:</label>

                <input 
                type="text" 
                name="title" required autoFocus className="form-control"
                placeholder="Name of shopping item"
                value={currentShop.title}
                onChange={changeShopState}
                    />
                </div>
        </fieldset>
        <fieldset> 
                <div className="form-group">
                    <label htmlFor="name">Cost:</label>
                    <input type="number"
                        className="form-control"
                        value={currentShop.price}
                        onChange={changeShopState}/>
                </div>
        </fieldset>
        <fieldset>
                <label htmlFor="name">Asap:</label>
                <div className="form-group">
                    <label htmlFor="name">Asap:</label>
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
                
                updateShop(shop)
                    .then(() => navigate("/shops"))
            }}
            className="btn btn-primary">Create</button>
    </form>
    )
}
















// import { useEffect, useState } from "react"
// import { useNavigate, useParams } from "react-router-dom"
// import { getShopById, updateShop } from "../../managers/ShopManager"


// export const ShopEdit = () => {
//     const navigate = useNavigate()
//     // const [shops, setShops] = useState([
//     //     {
//     //         id: 0
//     //     }
//     // ])
//     const { shopId } = useParams()

//         const [currentShop, setCurrentShop] = useState({
//             title: "",
//             price: 0,
//             asap: false
//         })
//     useEffect(() => {
//         getShopById(shopId).then((data) => {
//             setCurrentShop(data)
//         })
//     }, [shopId])

//     // useEffect(() => {
//     //     getTodoById(todoId).then((res) => {
//     //         res.tod
//     //     })
//     // })
//     // useEffect(() => {
//     //     fetch(`http://localhost:8088/theTodos/${todoId}`)
//     //         .then(response => response.json())
//     //         .then((data) => {
//     //             assignTodo(data)
//     //         })
//     // }, [todoId])

//     // const handleSaveButtonClick = (event) => {
//     //     event.preventDefault()

//     //     return fetch(`http://localhost:8088/theTodos/${todo.id}`, {
//     //         method: "PUT",
//     //         headers: {
//     //             "Content-Type": "application/json"
//     //         },
//     //         body: JSON.stringify(todo)
//     //     })
//     //         .then(response => response.json())
//     //         .then(() => {
//     //             navigate("/todos")
//     //         })
//     // }

//     const changeShopState = (shop) => {
//         const copy = { ...currentShop }
//         copy[shop.target.title] = shop.target.value
//         setCurrentShop(copy)
//     }

//     return ( 
//     <form className="shopForm">
//         <h2 className="shopForm__title">Shop</h2>
//         <fieldset>
//             <div className="form-group">
//                 <label htmlFor="title">Description:</label>

//                 <input 
//                 type="text" 
//                 name="title" required autoFocus className="form-control"
//                 placeholder="Name of shopping item"
//                 value={currentShop.title}
//                 onChange={changeShopState}
//                     />
//                 </div>
//         </fieldset>
//         <fieldset> 
//                 <div className="form-group">
//                     <label htmlFor="name">Cost:</label>
//                     <input type="number"
//                         className="form-control"
//                         value={currentShop.price}
//                         onChange={changeShopState}/>
//                 </div>
//         </fieldset>
//         <fieldset>
//                 <label htmlFor="name">Asap:</label>
//                 <div className="form-group">
//                     <label htmlFor="name">Asap:</label>
//                     <input type="checkbox"
//                         value={currentShop.asap}
//                         onChange={changeShopState} />
//                 </div>
//         </fieldset>
//         <button type="submit"
//             onClick={evt => {
//                 evt.preventDefault()

//                 const shop = {
//                     title: currentShop.title,
//                     price: currentShop.price,
//                     asap: currentShop.asap
//                 }
                
//                 updateShop(shop)
//                     .then(() => navigate("/shops"))
//             }}
//             className="btn btn-primary">Create</button>
//     </form>
//     )
// }


// import { useState, useEffect } from "react"
// import { useNavigate, useParams } from 'react-router-dom'
// import { getShopById, updateShop } from "../../managers/ShopManager"
// // import { getEventById, getEventTypes, updateEvent } from "../../managers/EventManager.js"
// // import './Event.css'

// export const updateShop = () => {
//     const navigate = useNavigate()
//     const [shops, setShops] = useState([
//         {
//          id: 0
//         } 
//      ])
//     // const [eventTypes, setEventTypes] = useState ([ 
//     //     {
//     //         id: 0
//     //     }
//     // ])
//     const { shopId } = useParams()
//     /*
//         Since the input fields are bound to the values of
//         the properties of this state variable, you need to
//         provide some default values.
//     */
//         const [currentShop, setCurrentShop] = useState({
//             title: "",
//             price: 0,
//             asap: false
//         })

//     useEffect(() => {
//         // TODO: Get the game types, then set the state
//         getShopById(shopId).then((data) => {
//             setCurrentShop(data)
//         })
//         // getEventTypes(eventId).then((data) => { setEventTypes(data)})

//     }, [shopId])

//     const changeShopState = (domShop) => {
//         // TODO: Complete the onChange function
//         const copy = { ...currentShop }
//         copy[domShop.target.title] = domShop.target.value
//         setCurrentShop(copy)
//     }

//     return (
//         <form className="shopForm">
//             <h2 className="shopForm__title">Update Shopping Item</h2>
//             <fieldset>
//                 <div className="form-group">
//                     <label htmlFor="title">Details: </label>
//                     <input type="text" name="title" required autoFocus className="form-control"
//                         value={currentShop.title}
//                         onChange={changeShopState}
//                     />


//                     {/* <label className="label">Event Type: </label>
//                     <select
//                         name="eventType"
//                         className="form-control"
//                         value={currentEvent.eventType}
//                         onChange={(event) => {
//                             const copy = { ...currentEvent }
//                             copy.eventType = parseInt(event.target.value)
//                             setCurrentEvent(copy)
//                         }} >
//                         <option value="">Choose:</option>
//                         {eventTypes.map(events => ( 
//                                     <option key={`event--${events.id}`} value={events.id} name={events.eventType}>{events.eventType}</option>                         
//                             ))}
//                     </select> */}
//                 </div>
//             </fieldset>

//             <button type="submit"
//                 onClick={evt => {
//                     // Prevent form from being submitted
//                     evt.preventDefault()

//                     const shop = {
//                         // organizing_volunteer: currentEvent.organizing_volunteer,
//                         type: (currentShop.type),
//                         price: (currentShop.price),
//                         asap: (currentShop.asap),
//                     }

//                     // Send POST request to your API
//                     updateShop(shop, shopId)
//                         .then(() => navigate("/shops"))
//                 }}
//                 className="btn btn-primary">Update</button>
//         </form>
//     )
// }

// import { useEffect, useState } from "react"
// import { useNavigate, useParams } from "react-router-dom"
// import { updateShop } from "../../managers/ShopManager"
// // import { getTodoById, updateTodo } from "../../managers/TodoManager"

// export const ShopEdit = () => {
//     const navigate = useNavigate()
//     const { shopId } = useParams()



//     const [currentShop, setCurrentShop] = useState({
//         title: "",
//         price: 0,
//         asap: false
//     })

//     // useEffect(() => {
//     //     getTodoById(todoId).then((res) => {
//     //         res.tod
//     //     })
//     // })
//     // useEffect(() => {
//     //     fetch(`http://localhost:8088/theTodos/${todoId}`)
//     //         .then(response => response.json())
//     //         .then((data) => {
//     //             assignTodo(data)
//     //         })
//     // }, [todoId])

//     // const handleSaveButtonClick = (event) => {
//     //     event.preventDefault()

//     //     return fetch(`http://localhost:8088/theTodos/${todo.id}`, {
//     //         method: "PUT",
//     //         headers: {
//     //             "Content-Type": "application/json"
//     //         },
//     //         body: JSON.stringify(todo)
//     //     })
//     //         .then(response => response.json())
//     //         .then(() => {
//     //             navigate("/todos")
//     //         })
//     // }

//     const changeShopState = (shop) => {
//         const copy = { ...currentShop }
//         copy[shop.target.title] = shop.target.value
//         setCurrentShop(copy)
//     }

//     return ( 
//     <form className="shopForm">
//         <h2 className="shopForm__title">Shop</h2>
//         <fieldset>
//             <div className="form-group">
//                 <label htmlFor="title">Description:</label>
//                 {/* <textarea
//                     required autoFocus
//                     type="text"
//                     style={{
//                         height: "10rem"
//                     }}
//                     className="form-control"
//                     value={todo.description}
//                     onChange={
//                         (evt) => {
//                             const copy = { ...todo }
//                             copy.description = evt.target.value
//                             assignTodo(copy)
//                         }
//                     }>{todo.description}</textarea>
//             </div> */}
//                 <input type="text" name="title" required autoFocus className="form-control"
//                     value={currentShop.title}
//                     onChange={changeShopState}
//                     />
//                 </div>
//         </fieldset>
//         <fieldset> 
//                 <div className="form-group">
//                     <label htmlFor="name">Cost:</label>
//                     <input type="number"
//                         className="form-control"
//                         value={currentShop.price}
//                         onChange={changeShopState}/>
//                 </div>
//         </fieldset>
//         <fieldset>
//                 <label htmlFor="name">Asap:</label>
//                 <div className="form-group">
//                     <label htmlFor="name">Asap:</label>
//                     <input type="checkbox"
//                         value={currentShop.asap}
//                         onChange={changeShopState} />
//                 </div>
//         </fieldset>
//         <button type="submit"
//             onClick={evt => {
//                 evt.preventDefault()

//                 const shop = {
//                     title: currentShop.title,
//                     price: currentShop.price,
//                     asap: currentShop.asap
//                 }
                
//                 updateShop(shop)
//                     .then(() => navigate("/shops"))
//             }}
//             className="btn btn-primary">Create</button>
//     </form>
//     )
// }



// // import { useEffect, useState } from "react"
// // import { useNavigate, useParams } from "react-router-dom"

// // export const ShopEdit = () => {
// //     const [shop, assignShop] = useState({
// //         description: "",
// //         rate: 0,
// //         img: "",
// //         shopWebsite: "",
// //         asap: false,
        
// //     })
// //     const { shopId } = useParams()
// //     const navigate = useNavigate()

// //     useEffect(() => {
// //         fetch(`http://localhost:8088/serviceShops/${shopId}`)
// //             .then(response => response.json())
// //             .then((data) => {
// //                 assignShop(data)
// //             })
// //     }, [shopId])

// //     const handleSaveButtonClick = (event) => {
// //         event.preventDefault()

// //         return fetch(`http://localhost:8088/serviceShops/${shop.id}`, {
// //             method: "PUT",
// //             headers: {
// //                 "Content-Type": "application/json"
// //             },
// //             body: JSON.stringify(shop)
// //         })
// //             .then(response => response.json())
// //             .then(() => {
// //                 navigate("/shops")
// //             })
// //     }


// //     return <form className="shopForm">
// //         <h2 className="shopForm__title">Edit Shopping Item</h2>
// //         <fieldset>
// //             <div className="form-group">
// //                 <label htmlFor="description">Description:</label>
// //                 <textarea
// //                     required autoFocus
// //                     type="text"
// //                     style={{
// //                         height: "10rem"
// //                     }}
// //                     className="form-control"
// //                     value={shop.description}
// //                     onChange={
// //                         (evt) => {
// //                             const copy = { ...shop }
// //                             copy.description = evt.target.value
// //                             assignShop(copy)
// //                         }
// //                     }>{shop.description}</textarea>
// //             </div>
// //         </fieldset>

// //         <fieldset> 
// //                 <div className="form-group">
// //                     <label htmlFor="name">Price:</label>
// //                     <input type="number"
// //                         className="form-control"
// //                         value={shop.rate}
// //                         onChange={
// //                             (evt) => {
// //                                 // TODO: Update rate property
// //                                 // even tho the type is number it will always return a string
// //                                 // unlessss you wrap it in a parse 
// //                                 const copy = {...shop}
// //                                 copy.rate = parseFloat(evt.target.value, 2) //float is for decimal, 2 is for        components -> applicationviews -> employeeviews -> profile -> employee form -> changes state
// //                                 //got initial state fethed from the api for the permanent state and updated the  component state and now capturing what the user did .next step saving
// //                                 assignShop(copy)
// //                             }
// //                         } />
// //                 </div>
// //             </fieldset>
// //             {/* step 4 */}
// //             {/* <input type="url" name="url" id="url"
// //        placeholder="https://example.com"
// //        pattern="https://.*" size="30"
// //        required> */}
// //             {/* <fieldset>
// //             <div className="form-group">
// //                 <label htmlFor="shopWebsite"> Website Link </label>
// //                 <textarea
// //                     required autoFocus
// //                     type="url"
// //                     style={{
// //                         height: "10rem"
// //                     }}
// //                     className="form-control"
// //                     placeholder="https://www.amazon.com/"
// //                     value={shop.shopWebsite}
// //                     onChange={
// //                         (evt) => {
// //                             const copy = { ...shop }
// //                             copy.shopWebsite = evt.target.value
// //                             assignShop(copy)
// //                         }
// //                     }>{shop.shopWebsite}</textarea>
// //             </div>
// //         </fieldset>
// //         <fieldset>
// //           <div className="form-group">
// //             <label htmlFor="image"> Upload Image </label>
// //             <input
// //               type="img"
// //               id="image"
// //               className="form-control"
// //               placeholder="Upload Image"
// //               required
// //               value={shop.img}
// //               onChange={(evt) => {
// //                 const copy = { ...shop };
// //                 copy.img = evt.target.value;
// //                 assignShop(copy);
// //               }}
// //             />
// //           </div>
// //         </fieldset> */}
// //         <fieldset>
// //             <div className="form-group">
// //                 <label htmlFor="name">Need it asap:</label>
// //                 <input type="checkbox"
// //                     checked={shop.asap}
// //                     onChange={
// //                         (evt) => {
// //                             const copy = { ...shop }
// //                             copy.asap = evt.target.checked
// //                             assignShop(copy)
// //                         }
// //                     } />
// //             </div>
// //         </fieldset>
// //         <button
// //             onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
// //             className="btn btn-primary">
// //             Save Edits
// //         </button>
// //     </form>
// // }
