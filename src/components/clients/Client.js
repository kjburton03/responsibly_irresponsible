import { Link } from "react-router-dom"

export const Client = ({ id, fullName, email }) => {

    return <section className="client" >
        <div>
            <Link to={`/clients/${id}`}>Name: {fullName} </Link>
        </div>
        <div>Email: {email}</div>
    </section>
}