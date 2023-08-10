// // import { Link } from "react-router-dom"
// // import { deleteTodo, getTodos } from "../../managers/TodoManager"
// import { useEffect, useState } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { deleteTodo, getTodos } from "../../managers/TodoManager"
// import "./Todos.css"



// export const Todo = (props) => {
//     const [ refresh, setRefresh ] = useState(true)
//     const [ todos, setTodos ] = useState([
//         {id: 0,
//         title: "",
//         price: 0,
//         daily: false,
//         client: {}
//         }
//     ])
//     const navigate = useNavigate()

//     function refreshPage() {
//         window.location.reload(false)
//     }

//     useEffect(() => {
//         getTodos().then(data => setTodos(data))
//     }, [,refresh])

//     const handleClick = (id) => {
//         deleteTodo(id).then(refreshPage)
//     }

//     return (
//         <article className="todo">
//             {/* <button className="btn btn-2 icon-create"
//                 onClick={() => {
//                     navigate({ pathname: "new" })
//                 }}
//             >Register New Todo Item</button> */}
//             {
//                 todos.map(todo => {
//                     return <section key={`todo--${todo.id}`} className="todo">
//                         <div className="todo__title">{todo.title}</div>
//                         <div className="todo__price">Price: $ {todo.price} </div>
//                         <div className="todo__daily">Daily: {todo.daily ?  "✔️": "✖️"}</div>
//                         <div className="todo__footer">
//                             <button
//                                 onClick={() => {
//                                     navigate({ pathname: `edit/${todo.id}`})
//                                 }}>Edit</button>
//                         </div>
//                         <div className="game__footer">
//                             <button
//                                 onClick={() => {
//                                     handleClick(todo.id)
//                                 }}>Delete</button>
//                         </div>
//                     </section>
//                 })
//             }
//         </article>
//     )
// }
//     // let assignedClient = null
//     // const userClient = clients.find(client => client.userId === currentUser.id)

//     // const canClose = () => {
//     //     if (userClient?.id === assignedClient?.id && todoObject.dateCompleted === "") {
//     //         return <button onClick={closeTodo} className="todo__finish"> Completed  </button>
//     //     }
//     //     else {
//     //         return ""
//     //     }

//     // }



    
// //         const deleteButton = (id) => {
// //             deleteTodo(id)
// //             .then(() => {
// //                 getTodos().then(data =>
// //                     setTodos(data))
// //             })
// //     }


// //     const closeTodo = () => {
// //         const copy = {
// //             userId: todoObject.userId,
// //             title: todoObject.title,
// //             daily: todoObject.daily,
// //             dateCompleted: new Date() ,
// //             rate: todoObject.rate

// //         }

// //         return fetch(`http://localhost:8088/Todos/${todoObject.id}`, {
// //             method: "PUT",
// //             headers: {
// //                 "Content-Type": "application/json"
// //             },
// //             body: JSON.stringify(copy)

// //         })
// //             .then(response => response.json())
// //             .then(getAllTodos) //pull new api state back in

// //     }

// //     return <fieldset className="sendPrayer">
// //     <section className="todo" key={`todo--${todoObject.id}`}>
// //         <header>
// //             <Link to={`/todos/${todoObject.id}/edit`} className="link"> {todoObject.title}</Link>
// //         </header> 
// //         <section>Earn $ {todoObject.price}</section>
// //         <section> {todoObject.daily ?  " ": "✖️"} Daily</section>
// //         <footer>

// //         <button
// //                                 onClick={() => {
// //                                     handleClick(todo.id)
// //                                 }}>Delete</button>
// //         </footer>

    
// //     </section>
// //     </fieldset>
// // }