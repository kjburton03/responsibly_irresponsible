import { Link } from "react-router-dom"

export const Ticket = ({ticketObject, currentUser, employees, getAllTickets}) => {
    // .. Find the assigned employee for the current ticket 
    let assignedEmployee = null

    // if (ticketObject.employeeTickets.length > 0) {
    //     const ticketEmployeeRelationship = ticketObject.employeeTickets[0]
    //     assignedEmployee = employees.find(employee => employee.id === ticketEmployeeRelationship.employeeId)
    // }
    /// to match erd links idfk too brain dead to care at this point ** data relationships v important 11:30+ is recap on video of claim tickets
    // fine the employee profile object for the current user 
    const userEmployee = employees.find(employee => employee.userId === currentUser.id)

    // function that determines if the current user can close the ticket 
    //only appears for the employee working on it 
    // is the button closed true or fals and when should the button be displayed
    // update the api
    // make sure the employee id and the assigned employee match anddd that the ticket is not already completed. 
    const canClose = () => {
        if (userEmployee?.id === assignedEmployee?.id && ticketObject.dateCompleted === "") {
            return <button onClick={closeTicket} className="ticket__finish"> Completed  </button>
        }
        else {
            return ""
        }

    }


    const deleteButton = () => {
        if (!currentUser.staff) {
            return <button onClick={() => {
                fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
                    method: "DELETE"
                })
                    // .then(response => response.json()) <--- dont need it since we arent sending anything
                    .then(() => { 
                        getAllTickets()

                    })
            }} className="ticket__delete"> Delete </button> //network -> name -> headers & preview
        }
        else {
            return ""
        }

    }

    // function that updates the ticket with a new date completed
    const closeTicket = () => {
        const copy = {
            userId: ticketObject.userId,
            description: ticketObject.description,
            emergency: ticketObject.emergency,
            dateCompleted: new Date() ,
            rate: ticketObject.rate

        }

        return fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(copy)

        })
            .then(response => response.json())
            .then(getAllTickets) //pull new api state back in

    }

    const buttonOrNoButton = () => {
        if (currentUser.staff) {
            return <button 
                     onClick={() => {
                        fetch(`http://localhost:8088/employeeTickets`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                employeeId: userEmployee.id, // was currentUser.id but that returns undefined. video saved for future help... claiming tickets in capstone needs find operattion, id and user id must match
                                serviceTicketId: ticketObject.id
                            })
                        })
                            .then(response => response.json()) //network-> 201
                            .then(() => {
                                //GET the state from the API again
                                getAllTickets()
                            }) 
                     }}
                    >Claim dont need this</button>
        }
        else {
            return ""
        }
    }

    //footer and header both have conditional logic
    // button does fetch to get api state and modify it , gets new data and rerenders all tickets 
    return <fieldset className="sendPrayer">
    <section className="ticket" key={`ticket--${ticketObject.id}`}>
        <header>
            {
                currentUser.staff
                    ?  `Ticket ${ticketObject.id}`
                    :  <Link to={`/tickets/${ticketObject.id}/edit`}> {ticketObject.description}</Link>


            }
        </header> 
        {/* <section>{ticketObject.description}</section> */}
        <section>Earn $ {ticketObject.rate}</section>
        <section>Daily: {ticketObject.emergency ? "yah" : "nah"}</section>
        <footer>
            {
                ticketObject.employeeTickets.length
                    ? `currently being worked on by ${assignedEmployee !== null ? assignedEmployee?.user?.fullName : ""}`
                    : buttonOrNoButton()
            }
            {
                canClose()
            }
            {
                deleteButton()
            }
        </footer>

    
    </section>
    </fieldset>
}

// button has nested ternary objects turned into a function to return the correct thing.
{/* <footer>
{
    ticketObject.employeeTickets.length
        ? `currently being worked on by ${assignedEmployee !== null ? assignedEmployee?.user?.fullName : ""}`
        : <button 
         onClick={() => {
            fetch(`http://localhost:8088/employeeTickets`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    employeeId: userEmployee.id, // was currentUser.id but that returns undefined. video saved for future help... claiming tickets in capstone needs find operattion, id and user id must match
                    serviceTicketId: ticketObject.id
                })
            })
                .then(response => response.json()) //network-> 201
                .then(() => {
                    //GET the state from the API again
                    getAllTickets()
                }) 
         }}
        >Claim</button>
}
</footer> */}


// //        <header>
// <Link to={`/tickets/${ticketObject.id}/edit`}>Ticket {ticketObject.id} </Link>
// </header>
// <section>{ticketObject.description}</section>
// <footer>Emergency: {ticketObject.emergency ? "duh" : "Nuh"}</footer>