//////////stuff to find in here //////////////
// ticketList 
// warning: each child in a list should have a unique "key" prop
//////////////////////////////////////////////
// first page of project
// step 1 imports from react , export TicketList with const[] = useState, useEffect to show the state , & html return


import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Ticket } from "./Ticket"
                    //  useState is function to store the state in a component. The function returns an array. The array contains the intial state value at index 0 and a function that modifies the state at index 1.
                    //  useEffect is function to observe state.  and run some instructions when state changes.
import "./Tickets.css"
                    // css for just the ticket list classNames tickets and ticket



export const TicketList = ({ searchTermState }) => {  // theres the searchTermState key , its value is the actual state from the parent, the search terms themselves -not a direct state variable - neeeds a use effect
    const [tickets, setTickets] = useState([])
                    //  initial state value at index 0 & function that modifies the state at index 1 via a 
                    // tickets has a value of an empty array.
                    //   setTickets has a value of a function. function to change state 
    const [filteredTickets, setFiltered] = useState([])
                    // not modifyind the array of tickets, of displaying certain tickets 
                    // use useEffect to decide what is shown
    const [employees, setEmployees] = useState([])

    const [emergency, setEmergency] = useState(false)
                    //  tracking whether or not we need emergency to be listed via another state variable
                    // dont want to show emergency only tickets first so state is set to false -> needs toggle in button via onClick
    const [openOnly, updateOpenOnly] = useState(false)
                    // shows only tickets that have yet to be completed by staff in the customer view 
    

    
    const navigate = useNavigate() //navigate to new tickets form etc.  //// forgot the () at first... long search 




    const localResponsibleUser = localStorage.getItem("responsible_user")

    const responsibleUserObject = JSON.parse(localResponsibleUser) 


    useEffect(
        () => {
            if (emergency) { // only if its an emergency
               const emergencyTickets = tickets.filter(ticket => ticket.emergency === true) //* uses original ticket & returns every ticket to an array
               setFiltered(emergencyTickets) //displaying filtered tickets so you need to update its state to emergencyTickets
            }// array saved in emergencyTickets 
            else {
                setFiltered(tickets) //filters back to all tickets when show all button is pressed. 
            }

        },
        [emergency] //observing emergent tickets
    )

        // lets us get all tickets on initial state and invoked when the button is clicked for claimed tickets
        const getAllTickets = () => {
            fetch(`http://localhost:8088/serviceTickets?_embed=employeeTickets`) ///grabs every ticket made by customers . dont need a return statement before fetch    added the ?_embed=employeeTickets to show who is working on a ticket or if it has yet to be claimed
            .then(response => response.json()) /// get the response, parse the response, turn it back into an array 
            .then((ticketArray) => {
                setTickets(ticketArray)
                
            }) 
        }



    useEffect(
        () => {
            getAllTickets()
            fetch(`http://localhost:8088/serviceTickets?_embed=employeeTickets`) ///grabs every ticket made by customers . dont need a return statement before fetch    added the ?_embed=employeeTickets to show who is working on a ticket or if it has yet to be claimed
                .then(response => response.json()) /// get the response, parse the response, turn it back into an array 
                .then((ticketArray) => {
                    setTickets(ticketArray)
                    
                }) /// ticketArray is a parameter to capture all the data processed from servicetickets database
                    /// database.json //-> serviceTickets -> tickets -> //setTickets-useSTate-useEffect-fetch// ticketArray
                    ///serviceTickets -> tickets -> ticketArray new value
                    fetch(`http://localhost:8088/employees?_expand=user`) ///grabs every ticket made by customers . dont need a return statement before fetch    added the ?_embed=employeeTickets to show who is working on a ticket or if it has yet to be claimed
                    .then(response => response.json()) /// get the response, parse the response, turn it back into an array 
                    .then((employeeArray) => {
                        setEmployees(employeeArray)
                        
                    }) 
        },
        []          // When this array is empty, you are observing initial component state
    )

        useEffect(
            () => {
                if(responsibleUserObject.staff) {
                    setFiltered(tickets)
                }
                else {
                    const myTickets = tickets.filter(ticket => ticket.userId === responsibleUserObject.id)
                    
                    setFiltered(myTickets)
                }
            },
            [tickets]
        )

    useEffect(  // show only completed tickets
        () => {  //function -> if openOnly 
            if (openOnly) { 
                const openTicketArray =  tickets.filter(ticket => {
                    return ticket.userId === responsibleUserObject.id && ticket.dateCompleted === ""   
            })
            setFiltered(openTicketArray)  // shows opened tickets 
            }
            else {
                const myTickets = tickets.filter(ticket => ticket.userId === responsibleUserObject.id) 
                
                setFiltered(myTickets) //brings it back 


            }
        },
        [ openOnly ] //observing openOnly array 

    )

    const bankTotal = () => {
                const completedTickets = tickets.filter(ticket => ticket.dateCompleted?.length > 1 ) //back to all tickets 
                const total = completedTickets.reduce((accumulator, currentValue) => {
                    return accumulator + currentValue.rate;
                }, 0);
        return total
    }

    return <> 
        <div className="bank">
            Bank Total $ {bankTotal()}
        </div>
    <div>


        <fieldset className="please" >

        <legend className="title">To Do List</legend>

        <div className="buttons">

<h1> </h1>
    {
        responsibleUserObject.staff 
        ? <>
        <button onClick={() => updateOpenOnly(true)} className="button">unfinished Todos</button>
            <button onClick={() => updateOpenOnly(false)} className="button">All Todos</button>
        </>
        : <>
            <button onClick={() => navigate("/shop/create")} className="button">Add new item to todo list</button>
            <button onClick={ () => { setEmergency(true) }} className="button">Daily</button>
            <button onClick={ () => { setEmergency(false) }} className="button">Show All</button>
        </>
    }
</div>
    
        <article className="ticket_container">

            {
                filteredTickets.map(
                    (ticket) => <Ticket employees={employees} 
                        getAllTickets={getAllTickets} //same prop name as function reference
                        currentUser={responsibleUserObject} 
                        ticketObject={ticket} />
                )
            }
        </article>
        </fieldset>
        </div>

    </>
}
