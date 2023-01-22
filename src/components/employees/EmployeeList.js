import { useEffect, useState } from "react"
import { Employee } from "./Employee"
import "./Employees.css"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/users?isStaff=true`) //question mark  //// if you put return before fetch you will get this -> react_devtools_backend.js:4012 Warning: useEffect must not return anything besides a function, which is used for clean-up.
                .then(response => response.json())
                .then((employeeArray) => {
                    setEmployees(employeeArray)
                }
                )
        },
        []
    )
    return <article className="employees">
        {
            employees.map(employee => <Employee key={`employee--${employee.id}`}
                id={employee.id} 
                fullName={employee.fullName} 
                email={employee.email} />)
        }
    </article>
}
// key stays on employee list instead of transfering to employee.js
