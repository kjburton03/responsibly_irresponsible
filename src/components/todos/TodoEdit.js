import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getTodoById, updateTodo } from "../../managers/TodoManager"

export const TodoEdit = () => {
    const navigate = useNavigate()
    const { todoId } = useParams()



    const [currentTodo, setCurrentTodo] = useState({
        title: "",
        price: 0,
        daily: false
    })

    // useEffect(() => {
    //     getTodoById(todoId).then((res) => {
    //         res.tod
    //     })
    // })
    // useEffect(() => {
    //     fetch(`http://localhost:8088/theTodos/${todoId}`)
    //         .then(response => response.json())
    //         .then((data) => {
    //             assignTodo(data)
    //         })
    // }, [todoId])

    // const handleSaveButtonClick = (event) => {
    //     event.preventDefault()

    //     return fetch(`http://localhost:8088/theTodos/${todo.id}`, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(todo)
    //     })
    //         .then(response => response.json())
    //         .then(() => {
    //             navigate("/todos")
    //         })
    // }

    const changeTodoState = (todo) => {
        const copy = { ...currentTodo }
        copy[todo.target.title] = todo.target.value
        setCurrentTodo(copy)
    }

    return ( <form className="todoForm">
        <h2 className="todoForm__title">Todo</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="title">Description:</label>
                {/* <textarea
                    required autoFocus
                    type="text"
                    style={{
                        height: "10rem"
                    }}
                    className="form-control"
                    value={todo.description}
                    onChange={
                        (evt) => {
                            const copy = { ...todo }
                            copy.description = evt.target.value
                            assignTodo(copy)
                        }
                    }>{todo.description}</textarea>
            </div> */}
                <input type="text" name="title" required autoFocus className="form-control"
                    value={currentTodo.title}
                    onChange={changeTodoState}
                    />
                </div>
        </fieldset>
        <fieldset> 
                <div className="form-group">
                    <label htmlFor="name">Cost:</label>
                    <input type="number"
                        className="form-control"
                        value={currentTodo.price}
                        onChange={changeTodoState}/>
                </div>
        </fieldset>
        <fieldset>
                <label htmlFor="name">Daily:</label>
                <div className="form-group">
                    <label htmlFor="name">Daily:</label>
                    <input type="checkbox"
                        value={currentTodo.daily}
                        onChange={changeTodoState} />
                </div>
        </fieldset>
        <button type="submit"
            onClick={evt => {
                evt.preventDefault()

                const todo = {
                    title: currentTodo.title,
                    price: currentTodo.price,
                    daily: currentTodo.daily
                }
                
                updateTodo(todo)
                    .then(() => navigate("/todos"))
            }}
            className="btn btn-primary">Create</button>
    </form>
    )
}
