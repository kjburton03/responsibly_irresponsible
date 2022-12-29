//////copypasta applicationViews


import { CustomerNav } from "./CustomerNav"
// import { CustomerViews } from "./CustomerViews"
import { VipNav } from "./VipNav"
// import { VipViews } from "./VipViews"
import "./NavBar.css"



export const NavBar = () => {
    const localResponsibleUser = localStorage.getItem("responsible_user")
    //  grabs honey_user out of storage
    // ^string, needs to be converted into an objext
    const responsibleUserObject = JSON.parse(localResponsibleUser) 
    // devtools -> application -> storage -> localhost -> now shows the value of staff and id under it 
    //stole from ticketList.js/////////////////

    if (responsibleUserObject.staff) {
        //return employee views 
        return <VipNav />
    }  // devtools -> components -> applicationViews -> employeeViews -> ticket container ticket search ticket 
    else {
        //return customer views
        return <CustomerNav />
    }  // devtools -> components -> applicationViews -> customerViews -> ticketList  (under create ticket it shows create form)


///two separate return statements in the if statement
}






/////////// before nav waqs split between customers and employees

// import { Link, useNavigate } from "react-router-dom"
// import "./NavBar.css"

// export const NavBar = () => {
//     const navigate = useNavigate()

//     return (
//         <ul className="navbar">
//             <li className="navbar__item active">
//                 <Link className="navbar__link" to="/tickets">Tickets</Link>
//             </li>
//             <li className="navbar__item active">
//                 <Link className="navbar__link" to="/employees">Employees</Link>
//             </li>
//             {
//                 localStorage.getItem("honey_user")
//                     ? <li className="navbar__item navbar__logout">
//                         <Link className="navbar__link" to="" onClick={() => {
//                             localStorage.removeItem("honey_user")
//                             navigate("/", {replace: true})
//                         }}>Logout</Link>
//                     </li>
//                     : ""
//             }
//         </ul>
//     )
// }

// //  link  for logout : 
// // {
// //     localStorage.getItem("honey_user")
// //         ? <li className="navbar__item navbar__logout">
// //             <Link className="navbar__link" to="" onClick={() => { ///// on click 
// //                 localStorage.removeItem("honey_user")    //// onclick removes honey_user logging them out
// //                 navigate("/", {replace: true})          //// navigates back to home screen to login
// //             }}>Logout</Link> <---- link  creates hyper link /// shows logout on navbar
// //         </li>
// //         : ""
// // }
