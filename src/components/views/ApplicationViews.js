import { CustomerViews } from "./CustomerViews"
import { EmployeeViews } from "./EmployeeViews"




export const ApplicationViews = () => {
    const localHoneyUser = localStorage.getItem("honey_user")
    //  grabs honey_user out of storage
    // ^string, needs to be converted into an objext
    const honeyUserObject = JSON.parse(localHoneyUser) 
    // devtools -> application -> storage -> localhost -> now shows the value of staff and id under it 
    //stole from ticketList.js/////////////////

    if (honeyUserObject.staff) {
        //return employee views 
        return <EmployeeViews />
    }  // devtools -> components -> applicationViews -> employeeViews -> ticket container ticket search ticket 
    else {
        //return customer views
        return <CustomerViews />
    }  // devtools -> components -> applicationViews -> customerViews -> ticketList  (under create ticket it shows create form)


///two separate return statements in the if statement
}











////////////////// before application views was split between employee and customer ////////////////////



// // second page 
// /// the applicationViews component watches the browser URL & displays the correct component
// //////////////////////////in this page////////////////////////////
// //////custom routing per ticket type

// import { Outlet, Route, Routes } from "react-router-dom"
// import { TicketList } from "../tickets/TicketList"
// import { TicketForm } from "../tickets/TicketForm"
// import { TicketSearch } from "../tickets/TicketSearch"
// import { TicketContainer } from "../tickets/TicketContainer"

// export const ApplicationViews = () => {
// 	return (
//         <Routes>
//             <Route path="/" element={
//                 <>
//                     <h1>Honey Rae Repair Shop</h1>
//                     <div>Your one-stop-shop to getting all your electronics fixed</div>

//                     <Outlet />
//                 </>
//             }>

//                 <Route path="tickets" element={ <TicketContainer /> } />
//                                             {/* links to ticketContainer which is the parent of ticket search and ticket list */}
//                 <Route path="ticket/create" element={ <TicketForm /> } />
//                                              {/* links to ticket form page. found under TicketList & Ticket */}
//             </Route>
//         </Routes>
//     )
// }










// //  starter code below
// // export const ApplicationViews = () => {
// // 	return <>
// // 		<h1 className="title--main">Honey Rae Repairs</h1>
// // 		<div>Your one-stop shop for repairing your tech</div>
// // 	</>
// // }

// {/* <Route path="tickets" element={ 
//     <>
//         <TicketSearch />
//         <TicketList />
//     </>
// } /> */}
//                             // route used before parent was made in ticketContainer
//                             // links to tickets page & ticket search for employees - now two components - > changes to react fragment and now siblings*/}
//                             // Ticket list and ticket search cannot talk to each other without a parent - they arent inside each other they are next to each other
//                            ///  ****parent is made in ticketContainer******  

        