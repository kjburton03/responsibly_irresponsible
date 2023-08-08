import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
// import { getEventById, getEventTypes, updateEvent } from "../../managers/EventManager.js"
import { editTodo, getTodoById } from "../../managers/TodoManager"

export const EditTodo = () => {
    const navigate = useNavigate()
    const [todos, setTodos] = useState([
        {
        id: 0
        } 
    ])

    const { todoId } = useParams()
    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
        const [currentTodo, setCurrentTodo] = useState({
            title: "",
            price: 0,
            daily: false
        })

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getTodoById(todoId).then((data) => {
            setCurrentTodo(data)
        })

    }, [todoId])

    const changeTodoState = (domTodo) => {
        // TODO: Complete the onChange function
        const copy = { ...currentTodo }
        copy[domTodo.target.name] = domTodo.target.value
        setCurrentTodo(copy)
    }

    return (
        <form className="todoForm">
            <h2 className="todoForm__title">Update Todo Item</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentTodo.title}
                        onChange={changeTodoState}
                    />
                    <label htmlFor="price">Price: </label>
                    <input type="number" name="price" required autoFocus className="form-control"
                        value={currentTodo.price}
                        onChange={changeTodoState}
                    />
                    <label htmlFor="daily">Daily: </label>
                    <input type="checkbox" name="daily" required autoFocus className="form-control"
                        value={currentTodo.daily}
                        onChange={changeTodoState}
                    />


                    {/* <label className="label">Event Type: </label>
                    <select
                        name="eventType"
                        className="form-control"
                        value={currentEvent.eventType}
                        onChange={(event) => {
                            const copy = { ...currentEvent }
                            copy.eventType = parseInt(event.target.value)
                            setCurrentEvent(copy)
                        }} >
                        <option value="">Choose:</option>
                        {eventTypes.map(events => ( 
                                    <option key={`event--${events.id}`} value={events.id} name={events.eventType}>{events.eventType}</option>                         
                            ))}
                    </select> */}
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const todo = {
                        // organizing_volunteer: currentEvent.organizing_volunteer,
                        title: (currentTodo.title),
                        price: (currentTodo.price),
                        daily: (currentTodo.daily)
                    }

                    // Send POST request to your API
                    editTodo(todo, todoId)
                        .then(() => navigate("/todos"))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}

