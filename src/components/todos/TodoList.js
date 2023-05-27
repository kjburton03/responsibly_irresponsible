import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Todo } from "./Todo"
import { deleteTodo, getTodos } from "../../managers/TodoManager"
import "./Todos.css"



export const TodoList = (props) => {  
    const [todos, setTodos] = useState([])
    const navigate = useNavigate() 
    const userId = parseInt(localStorage.getItem("responsibly_token"));
    

    const [filteredTodos, setFiltered] = useState([])

    // const [clients, setClients] = useState([])

    const [daily, setDaily] = useState(false)

    const [openOnly, updateOpenOnly] = useState(false)
    
    // const localResponsibleUser = localStorage.getItem("responsible_token")

    // const responsibleUserObject = JSON.parse(localResponsibleUser) 
    useEffect(() => {
        getTodos().then(data => setTodos(data))
    }, [])

    useEffect(() => {
        getTodos().then((data) => {
        
        const updatedTodos = data.map((todo) => ({
            ...todo,
            addedByCurrentUser: todo.user.id === parseInt(userId),
        }));
        setTodos(updatedTodos)
        });
    }, [userId]);

    const deleteButton = (id) => {
            deleteTodo(id)
            .then(() => {
                getTodos().then(data =>
                    setTodos(data))
            })
    }

    // useEffect(
    //     () => {
    //         if (daily) {
    //         const dailyTodos = todos.filter(todo => todo.daily === true) 
    //         setFiltered(dailyTodos) 
    //         }
    //         else {
    //             setFiltered(todos)  
    //         }

    //     },
    //     [daily] 
    // )

        // const getAllTodos = () => {
        //     fetch(`http://localhost:8000/todos`) 
        //     .then(response => response.json()) 
        //     .then((todoArray) => {
        //         setTodos(todoArray)
                
        //     }) 
        // }



    // useEffect(
    //     () => {
    //         getAllTickets()
    //         fetch(`http://localhost:8088/serviceTickets?_embed=tickets`) 
    //             .then(response => response.json()) 
    //             .then((ticketArray) => {
    //                 setTickets(ticketArray)
                    
    //             }) 
    //                 fetch(`http://localhost:8088/clients?_expand=user`) 
    //                 .then(response => response.json()) 
    //                 .then((clientArray) => {
    //                     setClients(clientArray)
                        
    //                 }) 
    //     },
    //     []          
    // )

        useEffect(
            () => {
                if(userId) {
                    setFiltered(todos)
                }
                else {
                    // const myTickets = tickets.filter(ticket => ticket.userId === responsibleUserObject.id)
                    
                    setFiltered(todos)
                }
            },
            [todos]
        )

    useEffect( 
        () => {  
            if (openOnly) { 
                const openTodoArray =  todos.filter(todo => {
                    return todo.userId === userId && todo.dateCompleted === ""   
            })
            setFiltered(openTodoArray)
            }
            else {
                const myTodos = todos.filter(todo => todo.userId === userId) 
                
                setFiltered(myTodos)

            }
        },
        [ openOnly ]

    )

    const bankTotal = () => {
                const completedTodos = todos.filter(todo => todo.dateCompleted?.length > 1 ) 
                const total = completedTodos.reduce((accumulator, currentValue) => {
                    return accumulator + currentValue.rate;
                }, 0);
        return total
    }

    return <> 
        <div className="bank">
            Bank Total $ {bankTotal()}
        </div>
    <div>
        <div className="buttons">
            <button onClick={() => navigate("/todo/create")} className="button">Add new</button>
            <button onClick={ () => { setDaily(true) }} className="button">Daily</button>
            <button onClick={ () => { setDaily(false) }} className="button">Show All</button>
        </div>
    

    
        <article className="todo_container">

            {
                filteredTodos.map(
                    (todo) => <Todo 
                        getTodos={getTodos} 
                        currentUser={userId} 
                        todoObject={todo} />
                )
            }
        </article>
        {/* </fieldset> */}
        </div>

    </>
}