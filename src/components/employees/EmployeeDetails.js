import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
//  displayed when a route path employees/:employeeId matches the employee 
export const EmployeeDetails = () => {
    //hook in react router dom is called useParams 
    const {employeeId} = useParams()
    const [employee, updateEmployee] = useState({})
    //captures the employeeID in the return

    useEffect(
        () => {
            fetch(`http://localhost:8088/employees?_expand=user&_embed=employeeTickets&userId=${employeeId}`)
                .then(response => response.json())
                .then((data) => {
                    const singleEmployee = data[0]
                    updateEmployee(singleEmployee)

                })
        },
        [employeeId]
    )
    return <section className="employee" >
         
           <header className="employee__header">{employee?.user?.fullName}</header>
           <div>Email: {employee?.user?.email}</div>
           <div>Specialty: {employee.specialty}</div>
           <div>Price: {employee.rate}</div>
          
           <footer className="employee__footer"> finished  {employee?.employeeTickets?.length} todo items</footer>
          
        </section>
}
// optional chaining operator ---- employee?.user?. 
// localhost:3000/employees/4  <- 4 is userId not employee id 
//  dont forget 


 // ^^ footer could be used for stretch goal of showing what things are or  