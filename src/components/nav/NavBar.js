import { CustomerNav } from "./CustomerNav"
import { EmployeeNav } from "./EmployeeNav"

import "./NavBar.css"



export const NavBar = () => {
    const localResponsibleUser = localStorage.getItem("responsible_user")
    const responsibleUserObject = JSON.parse(localResponsibleUser) 

    if (responsibleUserObject.staff) {
        return <EmployeeNav />
    }
    else {
        return <CustomerNav />
    }  

}