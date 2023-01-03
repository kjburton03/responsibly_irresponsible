import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
//  displayed when a route path employees/:employeeId matches the employee 
export const CustomerDetails = () => {
    //hook in react router dom is called useParams 
    const {customerId} = useParams()
    const [customer, updateCustomer] = useState({})
    //captures the employeeID in the return

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user&_embed=serviceTickets&userId=${customerId}`)
                .then(response => response.json())
                .then((data) => {
                    const singleCustomer = data[0]
                    updateCustomer(singleCustomer)

                })
        },
        [customerId]
    )
    return <section className="employee" >
         
           <header className="employee__header">{customer?.user?.fullName}</header>
           <div>Email: {customer?.user?.email}</div>
           <div>Address: {customer.address}</div>
           <div>Phone Number: {customer.phoneNumber}</div>
           <footer className="employee__footer">Currently working On {customer?.serviceTickets?.length} to-do list items</footer>
        </section>
}
// optional chaining operator ---- employee?.user?. 
// localhost:3000/employees/4  <- 4 is userId not employee id 
//  dont forget 