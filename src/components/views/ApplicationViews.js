import { CustomerViews } from "./CustomerViews"
import { EmployeeViews } from "./EmployeeViews"




export const ApplicationViews = () => {
    const localResponsibleUser = localStorage.getItem("responsible_user")
    const responsibleUserObject = JSON.parse(localResponsibleUser) 

    if (responsibleUserObject.staff) {
        return <EmployeeViews />
    }  
    else {
        return <CustomerViews />
    }  
}
