export const getShops = () => {
    return fetch("http://localhost:8000/shops", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("responsibly_token")}`
        }
    })
        .then(response => response.json())
}

export const getShopById = (id) => {
    return fetch(`http://localhost:8000/shops/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("responsible_token")}`
        }
    })
        .then(response => response.json())
}

export const createShop = (shop) => {
    return fetch("http://localhost:8000/shops", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("responsibly_token")}`
        },
        body: JSON.stringify(shop)
    })
    .then(response => response.json())

    }

export const updateShop = (shop, id) => {
    return fetch(`http://localhost:8000/shops/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("responsibly_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(shop)
    })
}

export const deleteShop = (id) => {
    return fetch(`http://localhost:8000/shops/${id}`,
    {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("responsibly_token")}`
        }
    })
}