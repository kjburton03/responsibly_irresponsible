import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const CustomerNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/tickets">Todo List</Link>
            </li>
        
            <li className="navbar__item active">
                <Link className="navbar__link" to="/shops">Shop</Link>
            </li>
        
            {
                localStorage.getItem("honey_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("honey_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}

//  link  for logout : 
// {
//     localStorage.getItem("honey_user")
//         ? <li className="navbar__item navbar__logout">
//             <Link className="navbar__link" to="" onClick={() => { ///// on click 
//                 localStorage.removeItem("honey_user")    //// onclick removes honey_user logging them out
//                 navigate("/", {replace: true})          //// navigates back to home screen to login
//             }}>Logout</Link> <---- link  creates hyper link /// shows logout on navbar
//         </li>
//         : ""
// }