import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Shop } from "./Shop"
import "./Shops.css"




export const ShopList = ({ searchTermState }) => {  
    const [shops, setShops] = useState([])

    const [filteredShops, setFiltered] = useState([])

    const [employees, setEmployees] = useState([])

    const [asap, setAsap] = useState(false)

    const [openOnly, updateOpenOnly] = useState(false)

    

    
    const navigate = useNavigate() 



    const localResponsibleUser = localStorage.getItem("responsibly_token")

    const responsibleUserObject = JSON.parse(localResponsibleUser) 


    useEffect(
        () => {
            const searchedShops = shops.filter(shop => {
                return shop.description.toLowerCase().startsWith(searchTermState.toLowerCase())
            
            })
            setFiltered(searchedShops)
        },
        [ searchTermState ]
    )
    
    useEffect(
        () => {
            if (asap) {
               const asapShops = shops.filter(shop => shop.asap === true) //* uses original ticket & returns every ticket to an array
               setFiltered(asapShops)
            }
            else {
                setFiltered(shops) 
            }

        },
        [asap] 
    )
        const getAllShops = () => {
            fetch(`http://localhost:8088/serviceShops?_embed=employeeShops`)
            .then(response => response.json()) 
            .then((shopArray) => {
                setShops(shopArray)
                
            }) 
        }



    useEffect(
        () => {
            getAllShops()
            fetch(`http://localhost:8088/serviceShops?_embed=employeeShops`) 
                .then(response => response.json())
                .then((shopArray) => {
                    setShops(shopArray)
                    
                })
                    fetch(`http://localhost:8088/employees?_expand=user`)
                    .then(response => response.json()) 
                    .then((employeeArray) => {
                        setEmployees(employeeArray)
                        
                    }) 
        },
        []
    )


        useEffect(
            () => {
                if(responsibleUserObject.staff) {
                    setFiltered(shops)
                }
                else {
                    const myShops = shops.filter(shop => shop.userId === responsibleUserObject.id)
                    
                    setFiltered(myShops)
                }
            },
            [shops]
        )

    useEffect(
        () => {
            if (openOnly) { 
                const openShopArray =  shops.filter(shop => {
                    return shop.userId === responsibleUserObject.id && shop.dateCompleted === ""
            })
            setFiltered(openShopArray)
            }
            else {
                const myShops = shops.filter(shop => shop.userId === responsibleUserObject.id)
                
                setFiltered(myShops)


            }
        },
        [ openOnly ] 
    )

    const bankTotal = () => {
        const completedShops = shops.filter(shop => shop.dateCompleted?.length > 1 ) 
        const total = completedShops.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.rate;
        }, 0);
        return total
    }



    return <> 
        <div className="bank">
            Shopping Cart Total $ {bankTotal()}
        </div>
    <div>
    <h1>Shopping List</h1>

        <div className="buttons">
            <button onClick={() => navigate("/shop/create")} className="button">Add new item</button>
            <button onClick={ () => { setAsap(true) }} className="button">Need it now</button>
            <button onClick={ () => { setAsap(false) }} className="button">Show All</button>

</div>
    
        <article className="shop_container">

            {
                filteredShops.map(
                    (shop) => <Shop employees={employees} 
                        getAllShops={getAllShops} 
                        currentUser={responsibleUserObject} 
                        shopObject={shop} />
                )
            }
        </article>
        </div>

    </>
}
