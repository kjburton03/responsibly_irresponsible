import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
import logo from "./logo.png"

export const CustomerNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                {/* <img src={logo} alt="Logo" /> */}
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/tickets">Todo List</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/shops">Shop</Link>
            </li>
            {
                localStorage.getItem("responsible_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("responsible_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}
