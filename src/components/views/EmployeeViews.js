// import { Outlet, Route, Routes } from "react-router-dom"
// import { TicketList } from "../tickets/TicketList"  //in ticketContainer
// import { TicketForm } from "../tickets/TicketForm" /// dont want staff to have the ability to create tickets
// import { TicketSearch } from "../tickets/TicketSearch" //in ticketContainer
// import { TicketContainer } from "../tickets/TicketContainer" //parent
// import { EmployeeList } from "../employees/EmployeeList"
// import { EmployeeDetails } from "../employees/EmployeeDetails"
// import { CustomerList } from "../customers/CustomerList"
// import { CustomerDetails } from "../customers/CustomerDetails"
// import { Profile } from "../profile/Profile"

// export const EmployeeViews = () => {
// 	return (
//         <Routes>
//             <Route path="/" element={
//                 <>
//                     <h1> Responsibly Irresponsible</h1>
//                     <div>Are you ready to live your life luxuriously</div>

//                     <Outlet />
//                 </>
//             }>

//                 <Route path="tickets" element={ <TicketContainer /> } />
//                                             {/* links to ticketContainer which is the parent of ticket search and ticket list */}
//                 <Route path="employees" element={ <EmployeeList /> } />
//                                                     {/* route to employee list */}
//                 <Route path="employees/:employeeId" element={ <EmployeeDetails/> } />
//                                                 {/* employee/employeeId leads to individual employees  */} 
//                 <Route path="customers" element={ <CustomerList /> } />

//                 <Route path="customers/:customerId" element={ <CustomerDetails/> } />

//                 <Route path="profile" element={ <Profile/> } />
//             </Route>
//         </Routes>
//     )
// }
