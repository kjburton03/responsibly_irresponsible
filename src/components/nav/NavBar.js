import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
import logo from "./logo.png"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="logo">
            <Link className="navbar__link" to="/home">
                <img src={logo} alt="Logo" />
            </Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/todos">Todo List</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/shops">Shop</Link>
            </li>
            {
                localStorage.getItem("responsible_token")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("responsible_token")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}



// import { CustomerNav } from "./CustomerNav"
// import { EmployeeNav } from "./EmployeeNav"

// import "./NavBar.css"



// export const NavBar = () => {
//     const localResponsibleUser = localStorage.getItem("responsible_user")
//     const responsibleUserObject = JSON.parse(localResponsibleUser) 

//     if (responsibleUserObject.staff) {
//         return <EmployeeNav />
//     }
//     else {
//         return <CustomerNav />
//     }  

// }