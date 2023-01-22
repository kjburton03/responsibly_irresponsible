// second page 
/// the applicationViews component watches the browser URL & displays the correct component
//////////////////////////in this page////////////////////////////
//////custom routing per ticket type
///// application views has been split into 2 different views. copy pasta application views over to employee & client , then modify for both
//// application views will now show an if else statement for employeeViews vs CustomerViews depending on isStaff or not
///////////////higher order component



import { Outlet, Route, Routes } from "react-router-dom"
import { TicketList } from "../tickets/TicketList"
import { TicketForm } from "../tickets/TicketForm"
import { TicketSearch } from "../tickets/TicketSearch"
import { TicketContainer } from "../tickets/TicketContainer" // needed for employees
import { Profile } from "../profile/Profile"
import { TicketEdit } from "../tickets/TicketEdit"
import { ShopList } from "../shops/ShopList"
import { ShopForm } from "../shops/ShopForm"
import { ShopEdit } from "../shops/ShopEdit"

////// dont forget to change from ApplicationViews to CustomerViews
export const CustomerViews = () => {
	return (
        
        <Routes>
            <Route path="/" element={
                    <div>
                    {/* <h1>Responsibly Irresponsible</h1>
                    <div>are you ready to live your life luxuriously?</div> */}

                    <Outlet />
                </div>
            }>

                <Route path="tickets" element={ <TicketList /> } />
                                            {/* customer doesn't need to view the ticketContainer, just the ticket list, no need to tag the parent */}
                <Route path="ticket/create" element={ <TicketForm /> } />
                                             {/* links to ticket form page. found under TicketList & Ticket */}
                {/* <Route path="profile" element={ <Profile /> } /> */}

                <Route path="tickets/:ticketId/edit" element={ <TicketEdit /> } />

                

                <Route path="shops" element={ <ShopList /> } />

                <Route path="shop/create" element={ <ShopForm /> } /> 

                <Route path="shops/:shopId/edit" element={ <ShopEdit /> } />
            </Route>
        </Routes>
    )
}
