export const getTodos = () => {
    return fetch("http://localhost:8000/todos", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("responsibly_token")}`
        }
    })
        .then(response => response.json())
}

// export const getTodoById = (id) => {
//     return fetch(`http://localhost:8000/todos/${id}`, {
//         headers:{
//             "Authorization": `Token ${localStorage.getItem("responsible_token")}`
//         }
//     })
//         .then(response => response.json())
// }

export const getTodoById = (id) => {
    return fetch(`http://localhost:8000/todos/${id}`, {
    headers: {
        "Authorization": `Token ${localStorage.getItem("responsibly_token")}`,
        "Content-Type": "application/json"
    }
    })
    .then(response => response.json());
};


export const createTodo = (todo) => {
    return fetch("http://localhost:8000/todos", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("responsibly_token")}`
        },
        body: JSON.stringify(todo)
    })
    .then(response => response.json())


    }
    
    console.log(localStorage.getItem("responsible_token"));

export const editTodo = (todo, id) => {
    return fetch(`http://localhost:8000/todos/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("responsibly_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(todo)
    })
}

export const deleteTodo = (id) => {
    return fetch(`http://localhost:8000/todos/${id}`,
    {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("responsibly_token")}`
        }
    })
}
