// start of profiles for users



import { CustomerForm } from "./CustomerForm"
// import { CustomerViews } from "./CustomerViews"
import { EmployeeForm } from "./EmployeeForm"
// import { EmployeeViews } from "./EmployeeViews"




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
