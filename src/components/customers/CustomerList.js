import { useEffect, useState } from "react"
import { Customer } from "./Customer"

export const CustomerList = () => {
    const [customers, setCustomers] = useState([])

    useEffect(
         () => {
            fetch(`http://localhost:8088/users?isStaff=false`) //question mark  //// if you put return before fetch you will get this -> react_devtools_backend.js:4012 Warning: useEffect must not return anything besides a function, which is used for clean-up.
                .then(response => response.json())
                .then((customerArray) => {
                    setCustomers(customerArray)
                }
                )
         },
        []
    )
    return <article className="employees">
        {
            customers.map(customer => <Customer key={`customer--${customer.id}`}
                id={customer.id} 
                fullName={customer.fullName} 
                email={customer.email} />)
        }
    </article>
}
// key stays on employee list instead of transfering to employee.js
                {/* return <section className="employee" key={`employee--${employee.id}`}>
                    <div>Name: {fullName}</div>
                    <div>Email: {email}</div>
                </section> */}
                {/* //^^^^ return moved to Employee.js */}
            