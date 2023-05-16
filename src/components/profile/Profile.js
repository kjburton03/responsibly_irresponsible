import { CustomerForm } from "./CustomerForm"
import { EmployeeForm } from "./EmployeeForm"




export const Profile = () => {
    const localResponsibleUser = localStorage.getItem("responsible_user")
    const responsibleUserObject = JSON.parse(localResponsibleUser) 

    if (responsibleUserObject.staff) {
        return <EmployeeForm />
    }  
    else {
        return <CustomerForm />
    }  
}
