import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Todos.css"
import { deleteTodo, getTodos, createTodo, closeTodo, updateTodo } from "../../managers/TodoManager"



export const TodoList = (props) => {  
    const [todos, setTodos] = useState([])
    const navigate = useNavigate() 
    const userId = parseInt(localStorage.getItem("responsibly_token"));

    useEffect(() => {
        getTodos().then((data) => setTodos(data))
    }, [])
    
    useEffect(() => {
        getTodos().then((data) => {
        
        const updatedTodos = data.map((todo) => ({
            ...todo,
            addedByCurrentUser: todo.client?.id === parseInt(userId),
            dateCompleted: "",
        }));

        setTodos(updatedTodos);
        });
    }, [userId]);

    const deleteButton = (id) => {
            deleteTodo(id)
            .then(() => {
                getTodos().then(data => setTodos(data))
            })
    }

    const canClose = (todoObject) => {
        const userAddedItem = todoObject.addedByCurrentUser;
        const itemNotCompleted = todoObject.dateCompleted === "";
      
        return userAddedItem && itemNotCompleted;
      };
    
    // const closeShop = (shopId) => {
    //     // Function to close the shop item
    //     // Call the API to update the shop item with a new dateCompleted value
    //     // ...
    // };
    
    const renderCloseButton = (todo) => {
        if (canClose(todo)) {
        return (
            <button onClick={() => closeTodo(todo.id)} className="todo__finish">
            Add to Bag
            </button>
        );
        } else {
        return (            <button onClick={() => closeTodo(todo.id)} className="todo__finish">
        Task Completed!
        </button>);
        }
    };
    
    const bankTotal = () => {
        const completedTodos = todos.filter(todo => todo.dateCompleted?.length > 1 ) //back to all tickets 
        const total = completedTodos.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.price;
        }, 0);
return total
}


// parent container includes




    return (
        <>
        <div className="bank"> 
Bank Total $ {bankTotal()}
        </div>
        <h1>Howtie</h1>
        <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
                navigate({ pathname: "/todoForm" })
                }}>Add New todo item</button>
        <article className="todos">

            <article className="todo__body">
            {
                todos.map(todo => {
                    return <section key={`todo--${todo.id}`} className="todo">
                        <div className="todo__title">{todo.title}</div>
                        <div className="todo__price"> Price: {todo.price} </div>
                        <div className="todo__daily">Daily: {todo.daily ? "✔️" : "✖️"}</div>

                        <div className="todo__footer">
                        
                            <><button className="btn btn-2 btn-sep icon-create"
                                    onClick={() => {
                                        navigate({ pathname: `editTodo/${todo.id}` })
                                    } }>Edit</button><button className="btn btn-2 btn-sep icon-create"
                                        onClick={() => { deleteButton(todo.id) } }>Delete</button></> 
                            <div className="todo__footer">
                            {renderCloseButton(todo)}
                            </div>


                        </div>
                    </section>
                })
            }
            </article>
        </article>
        </>
    )
}













// import { useEffect, useState } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { Todo } from "./Todo"
// import { deleteTodo, getTodos, createTodo, closeTodo, updateTodo } from "../../managers/TodoManager"



// export const TodoList = (props) => {  
//     const [todos, setTodos] = useState([])
//     const navigate = useNavigate() 
//     const userId = parseInt(localStorage.getItem("responsibly_token"));

//     useEffect(() => {
//         getTodos().then((data) => setTodos(data))
//     }, [])
    
//     useEffect(() => {
//         getTodos().then((data) => {
    
//         console.log(data); 
//           // Check if data array is as expected
    
//         const updatedTodos = data.map((todo) => {
//             console.log(todo.client); 
//             // Check if todo.client is defined and has expected properties

//             return {
//             ...todo,
//             addedByCurrentUser: todo.client?.id === parseInt(userId),
//             }
//         });

//         console.log(updatedTodos); 
//           // Check if updatedTodos array is as expected
    
//         setTodos(updatedTodos);
//         });
//     }, [userId]);
    
//     const deleteButton = (id) => {
//             deleteTodo(id)
//             .then(() => {
//                 getTodos().then(data => setTodos(data))
//             })
//     }

//     return (
//         <>
//         <h1>Howtie</h1>
//         <article className="todos">
//         <button className="btn btn-2 btn-sep icon-create"
//             onClick={() => {
//                 navigate({ pathname: "/todoForm" })
//                 }}>Add New shop item</button>
//             <article className="todo__body">
//             {
//                 todos.map(todo => {
//                     return <section key={`todo--${todo.id}`} className="todo">
//                         <div className="todo__title">{todo.title}</div>
//                         <div className="todo__price"> Price: {todo.price} </div>
//                         <div className="todo__daily">Daily: {todo.daily ?  "✔️": "✖️"}</div>

//                         <div className="todo__footer">
                        
//                             <><button className="btn btn-2 btn-sep icon-create"
//                                     onClick={() => {
//                                         navigate({ pathname: `editTodo/${todo.id}` })
//                                     } }>Edit</button><button className="btn btn-2 btn-sep icon-create"
//                                         onClick={() => { deleteButton(todo.id) } }>Delete</button></>      

//                         </div>
//                     </section>
//                 })
//             }
//             </article>
//         </article>
//         </>
//     )
// }







// import { useEffect, useState } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { Todo } from "./Todo"
// import { deleteTodo, getTodos, createTodo, updateTodo } from "../../managers/TodoManager"
// import "./Todos.css"



// export const TodoList = (props) => {  
//     const [todos, setTodos] = useState([])
//     const navigate = useNavigate() 
//     const userId = parseInt(localStorage.getItem("responsibly_token"));
    

//     const [filteredTodos, setFiltered] = useState([])

//     // const [clients, setClients] = useState([])

//     const [daily, setDaily] = useState(false)

//     const [openOnly, updateOpenOnly] = useState(false)
    
//     // const localResponsibleUser = localStorage.getItem("responsible_token")

//     // const responsibleUserObject = JSON.parse(localResponsibleUser) 
//     useEffect(() => {
//         getTodos().then(data => setTodos(data))
//     }, [])

//     useEffect(() => {
//         getTodos().then((data) => {
        
//         const updatedTodos = data.map((todo) => ({
//             ...todo,
//             addedByCurrentUser: todo.user?.id === parseInt(userId),
//         }));
//         setTodos(updatedTodos)
//         });
//     }, [userId]);

//     const deleteButton = (id) => {
//             deleteTodo(id)
//             .then(() => {
//                 getTodos().then(data =>
//                     setTodos(data))
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
//                     setFiltered(todos)
//                 }
//                 else {
//                     // const myTickets = tickets.filter(ticket => ticket.userId === responsibleUserObject.id)
                    
//                     setFiltered(todos)
//                 }
//             },
//             [todos]
//         )

//     useEffect( 
//         () => {  
//             if (openOnly) { 
//                 const openTodoArray =  todos.filter(todo => {
//                     return todo.userId === userId && todo.dateCompleted === ""   
//             })
//             setFiltered(openTodoArray)
//             }
//             else {
//                 const myTodos = todos.filter(todo => todo.userId === userId) 
                
//                 setFiltered(myTodos)

//             }
//         },
//         [ openOnly ]

//     )

//     const bankTotal = () => {
//                 const completedTodos = todos.filter(todo => todo.dateCompleted?.length > 1 ) 
//                 const total = completedTodos.reduce((accumulator, currentValue) => {
//                     return accumulator + currentValue.rate;
//                 }, 0);
//         return total
//     }

//     return <> 
// !! !!!!!
//         <div className="bank">
//             Bank Total $ {bankTotal()}
//         </div>
//     <div>
//         <div className="buttons">
//             <button onClick={() => navigate("/todo/create")} className="button">Add new</button>
//             <button onClick={ () => { setDaily(true) }} className="button">Daily</button>
//             <button onClick={ () => { setDaily(false) }} className="button">Show All</button>
//         </div>
//     </div>
//     <div>

    
//         <article className="todo_container">
//                 {
//         filteredTodos.map((todo) => (
//             <Todo
//             key={todo.id} // Use the 'id' property as the key
//             getTodos={getTodos}
//             currentUser={userId}
//             todoObject={todo}
//             />
//         ))
//         }

//         </article>
//         </div>

//     </>
// }

















// import React, { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
// import "./Todo.css"
// import { deleteTodo, getTodos } from "../../managers/TodoManager"
// // import "./event.css"

// export const TodoList = (props) => {
//     const [ todos, setTodos ] = useState([])
//     const navigate = useNavigate()
//     const userId = parseInt(localStorage.getItem("responsibly_token"));

//     useEffect(() => {
//         getTodos().then(data => setTodos(data))
//     }, [])

//     useEffect(() => {
//         getTodos().then((data) => { 
//           // Update addedByCurrentUser property for each book

//         const updatedTodos = data.map((todo) => ({
//             ...todo,
//             addedByCurrentUser: todo.client?.id === parseInt(userId),
//         }));

//         setTodos(updatedTodos);
//         });
//     }, [userId]);
    
//     const deleteButton = (id) => {
//             deleteTodo(id)
//             .then(() => {
//                     getTodos().then(data => setTodos(data))
            
//         })
//     }

//     return <> 
//         <div className="bank">
//             Bank Total $ {bankTotal()}
//         </div>
//     <div>
//         <div className="buttons">
//             <button onClick={() => navigate("/todo/create")} className="button">Add new</button>
//             <button onClick={ () => { setDaily(true) }} className="button">Daily</button>
//             <button onClick={ () => { setDaily(false) }} className="button">Show All</button>
//         </div>
    

    
//         <article className="todo_container">

//             {
//                 filteredTodos.map(
//                     (todo) => <Todo 
//                         getTodos={getTodos} 
//                         currentUser={userId} 
//                         todoObject={todo} />
//                 )
//             }
//         </article>
//         </div>

//     </>
// }