// second page 
/// the applicationViews component watches the browser URL & displays the correct component
//////////////////////////in this page////////////////////////////
//////custom routing per ticket type
///// application views has been split into 2 different views. copy pasta application views over to employee & client , then modify for both
//// application views will now show an if else statement for employeeViews vs CustomerViews depending on isStaff or not
///////////////higher order component

import { Outlet, Route, Routes } from "react-router-dom"
import { TicketList } from "../tickets/TicketList"  //in ticketContainer
import { TicketForm } from "../tickets/TicketForm" /// dont want staff to have the ability to create tickets
import { TicketSearch } from "../tickets/TicketSearch" //in ticketContainer
import { TicketContainer } from "../tickets/TicketContainer" //parent
import { EmployeeList } from "../employees/EmployeeList"
import { EmployeeDetails } from "../employees/EmployeeDetails"
import { CustomerList } from "../customers/CustomerList"
import { CustomerDetails } from "../customers/CustomerDetails"
import { Profile } from "../profile/Profile"


////// dont forget to change from ApplicationViews to Employee Views
export const EmployeeViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Honey Rae Repair Shop</h1>
                    <div>Your one-stop-shop to getting all your electronics fixed</div>

                    <Outlet />
                </>
            }>

                <Route path="tickets" element={ <TicketContainer /> } />
                                            {/* links to ticketContainer which is the parent of ticket search and ticket list */}
                <Route path="employees" element={ <EmployeeList /> } />
                                                    {/* route to employee list */}
                <Route path="employees/:employeeId" element={ <EmployeeDetails/> } />
                                                {/* employee/employeeId leads to individual employees  */} 
                <Route path="customers" element={ <CustomerList /> } />

                <Route path="customers/:customerId" element={ <CustomerDetails/> } />

                <Route path="profile" element={ <Profile/> } />
            </Route>
        </Routes>
    )
}
