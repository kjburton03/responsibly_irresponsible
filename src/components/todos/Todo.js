import { Link } from "react-router-dom"

export const Todo = ({todoObject, currentUser, clients, getAllTodos}) => {
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


    const deleteButton = () => {
        if (!currentUser.staff) {
            return <button onClick={() => {
                fetch(`http://localhost:8088/theTodos/${todoObject.id}`, {
                    method: "DELETE"
                })

                    .then(() => { 
                        getAllTodos()

                    })
            }} className="todo__delete"> Delete </button> 
        }
        else {
            return ""
        }

    }

    const closeTodo = () => {
        const copy = {
            userId: todoObject.userId,
            title: todoObject.title,
            daily: todoObject.daily,
            dateCompleted: new Date() ,
            rate: todoObject.rate

        }

        return fetch(`http://localhost:8088/theTodos/${todoObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(copy)

        })
            .then(response => response.json())
            .then(getAllTodos) //pull new api state back in

    }

    // const buttonOrNoButton = () => {
    //     if (currentUser.staff) {
    //         return <button 
    //                 onClick={() => {
    //                     fetch(`http://localhost:8088/employeeTodos`, {
    //                         method: "POST",
    //                         headers: {
    //                             "Content-Type": "application/json"
    //                         },
    //                         body: JSON.stringify({
    //                             clientId: userClient.id,
    //                             serviceTodoId: todoObject.id
    //                         })
    //                     })
    //                         .then(response => response.json())
    //                         .then(() => {
    //                             getAllTodos()
    //                         }) 
    //                 }}
    //                 >Claim dont need this</button>
    //     }
    //     else {
    //         return ""
    //     }
    // }

    return <fieldset className="sendPrayer">
    <section className="todo" key={`todo--${todoObject.id}`}>
        <header>
            {
                currentUser.staff
                    ?  `Todo ${todoObject.id}`
                    :  <Link to={`/todos/${todoObject.id}/edit`} className="link"> {todoObject.title}</Link>


            }
        </header> 
        <section>Earn $ {todoObject.price}</section>
        <section> {todoObject.daily ?  " ": "✖️"} Daily</section>
        <footer>

            {
                deleteButton()
            }
        </footer>

    
    </section>
    </fieldset>
}