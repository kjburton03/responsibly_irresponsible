//copypasta applicationViews


import { CustomerNav } from "./CustomerNav"
import { EmployeeNav } from "./EmployeeNav"

import "./NavBar.css"



export const NavBar = () => {
    const localHoneyUser = localStorage.getItem("honey_user")
    //  grabs honey_user out of storage
    // ^string, needs to be converted into an objext
    const honeyUserObject = JSON.parse(localHoneyUser) 
    // devtools -> application -> storage -> localhost -> now shows the value of staff and id under it 

    if (honeyUserObject.staff) {
        //return employee views 
        return <EmployeeNav />
    }  // devtools -> components -> applicationViews -> employeeViews -> ticket container ticket search ticket 
    else {
        //return customer views
        return <CustomerNav />
    }  // devtools -> components -> applicationViews -> customerViews -> ticketList  (under create ticket it shows create form)


///two separate return statements in the if statement
}