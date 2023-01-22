// one parameter should be defined for the props object if a child is expecting props from a parent

import { Link } from "react-router-dom"

//employee key stays on employeelist 

export const Employee = ({ id, fullName, email }) => {
    // link employees 

    // devtools -> component -> employee list  changes to employeeDetails when clicking on a name
    //  /////neveeeer forget the $ symbol just almost restarted the entire project over that typo
        return <section className="employee" >
        
            <div>
                <Link to={`/employees/${id}`}> Name: {fullName} </Link>
            </div>
            <div>Email: {email}</div>
        </section>
}