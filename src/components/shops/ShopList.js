import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Shop } from "./Shop"
import "./Shops.css"




export const ShopList = ({ searchTermState }) => {  
    const [shops, setShops] = useState([])

    const [filteredShops, setFiltered] = useState([])

    const [employees, setEmployees] = useState([])

    const [emergency, setEmergency] = useState(false)

    const [openOnly, updateOpenOnly] = useState(false)

    

    
    const navigate = useNavigate() 



    const localResponsibleUser = localStorage.getItem("responsible_user")
       
    const responsibleUserObject = JSON.parse(localResponsibleUser) 
                    // devtools -> application -> storage -> localhost -> now shows the value of staff and id under it 

    useEffect(      // to observe state from parent  & filter down to what is typed into search tab
        () => {                         //filter original tickets
            const searchedShops = shops.filter(shop => {
                return shop.description.toLowerCase().startsWith(searchTermState.toLowerCase())
            
            }) //for each ticket, lets return => ticket.description starts with the searchTermState we got from the parent, a
            setFiltered(searchedShops) //updating filtered tickets
        },
        [ searchTermState ]
    )
    // devTools components -> ticketList -> props -> searchTermState: ""     <-shows in parentheses what you are currently typing
    // if you console.log(searchTermState) in the use effect it will show everything typed into the search in the console log
    
    useEffect(
        () => {
            if (emergency) { // only if its an emergency
               const emergencyShops = shops.filter(shop => shop.emergency === true) //* uses original ticket & returns every ticket to an array
               setFiltered(emergencyShops) //displaying filtered tickets so you need to update its state to emergencyTickets
            }// array saved in emergencyTickets 
            else {
                setFiltered(shops) //filters back to all tickets when show all button is pressed. 
            }

        },
        [emergency] //observing emergent tickets
    )

        // lets us get all tickets on initial state and invoked when the button is clicked for claimed tickets
        const getAllShops = () => {
            fetch(`http://localhost:8088/serviceShops?_embed=employeeShops`) ///grabs every ticket made by customers . dont need a return statement before fetch    added the ?_embed=employeeTickets to show who is working on a ticket or if it has yet to be claimed
            .then(response => response.json()) /// get the response, parse the response, turn it back into an array 
            .then((shopArray) => {
                setShops(shopArray)
                
            }) 
        }



    useEffect(
        () => {
            getAllShops()
            fetch(`http://localhost:8088/serviceShops?_embed=employeeShops`) ///grabs every ticket made by customers . dont need a return statement before fetch    added the ?_embed=employeeTickets to show who is working on a ticket or if it has yet to be claimed
                .then(response => response.json()) /// get the response, parse the response, turn it back into an array 
                .then((shopArray) => {
                    setShops(shopArray)
                    
                }) /// ticketArray is a parameter to capture all the data processed from servicetickets database
                    /// database.json //-> serviceTickets -> tickets -> //setTickets-useSTate-useEffect-fetch// ticketArray
                    ///serviceTickets -> tickets -> ticketArray new value
                    fetch(`http://localhost:8088/employees?_expand=user`) ///grabs every ticket made by customers . dont need a return statement before fetch    added the ?_embed=employeeTickets to show who is working on a ticket or if it has yet to be claimed
                    .then(response => response.json()) /// get the response, parse the response, turn it back into an array 
                    .then((employeeArray) => {
                        setEmployees(employeeArray)
                        
                    }) 
        },
        []
    )


        useEffect(
            () => {
                if(responsibleUserObject.staff) {
                    // employees
                    setFiltered(shops)
                    //shows all tickets through setFiltered state ... i think 
                }
                else {
                    // customers
                    const myShops = shops.filter(shop => shop.userId === responsibleUserObject.id)
                    
                    // filters throught all tickets then shows only the tickets that customerID's matches user's id
                    setFiltered(myShops)
                    // uses the new myTickets array to see them updated.. last step in the return
                }
            },
            [shops]
        )
                     // the tickets do not change until useEffect [tickets] is applied. <--- state variables
                     /////// useEffect is to observe state  

    useEffect(  // show only completed tickets
        () => {  //function -> if openOnly 
            if (openOnly) { 
                const openShopArray =  shops.filter(shop => {
                    return shop.userId === responsibleUserObject.id && shop.dateCompleted === ""   // if the tickets user id matches with the json id    if you change it to !== the opposite will happen
                                                                                                 // anddd the tickets date completed is not an empty string
            })
            setFiltered(openShopArray)  // shows opened tickets 
            }
            else {
                const myShops = shops.filter(shop => shop.userId === responsibleUserObject.id) //back to all tickets 
                
                setFiltered(myShops) //brings it back 


            }
        },
        [ openOnly ] //observing openOnly array 

    )

    const bankTotal = () => {
        const completedShops = shops.filter(shop => shop.dateCompleted?.length > 1 ) //back to all tickets 
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


        <fieldset className="please" >

        <legend className="title">Shopping List</legend>

        <div className="buttons">

<h1> </h1>
    {
        responsibleUserObject.staff 
        ? <>
        <button onClick={() => updateOpenOnly(true)} className="button">unpurchased Items</button>
            <button onClick={() => updateOpenOnly(false)} className="button">All Items</button>
        </>
        : <>
            <button onClick={() => navigate("/shop/create")} className="button">Add new item</button>
            <button onClick={ () => { setEmergency(true) }} className="button">Need it now</button>
            <button onClick={ () => { setEmergency(false) }} className="button">Show All</button>
        </>
    }
</div>
    
        <article className="shops">

            {
                filteredShops.map(
                    (shop) => <Shop employees={employees} 
                        getAllShops={getAllShops} //same prop name as function reference
                        currentUser={responsibleUserObject} 
                        shopObject={shop} />
                )
            }
        </article>
        </fieldset>
        </div>

    </>
}
