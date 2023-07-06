import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createTodo, getTodos } from "../../managers/TodoManager"


export const TodoForm = () => {
    const navigate = useNavigate()  

    const [currentTodo, setCurrentTodo] = useState({
        title: "", 
        price: 0,
        daily: false 
    })
const changeTodoState = (todo) => {
    const copy = { ...currentTodo }
    copy[todo.target.name] = todo.target.value
    setCurrentTodo(copy)
}

    return (
        <form className="todoForm">
            <h2 className="todoForm__title">New to do list item</h2>
            <fieldset>
                <div className="form-group"> 
                    <label htmlFor="title">Description:</label>
                    <input
                        type="text"
                        name="title" required autoFocus
                        className="form-control"
                        placeholder="Brief description todo list item"
                        value={currentTodo.title}
                        onChange={changeTodoState}/>
                </div>
            </fieldset>
            <fieldset> 
                <div className="form-group">
                    <label htmlFor="name">Cost:</label>
                    <input type="number"
                        name="price"
                        className="form-control"
                        value={currentTodo.price}
                        onChange={changeTodoState} />
                </div>
            </fieldset>

            <fieldset>
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
                
                createTodo(todo)
                    .then(() => navigate("/todos"))
            }}
            className="btn btn-primary">Create</button>
        </form>
    )
}