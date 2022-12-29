// second page 
/// the applicationViews component watches the browser URL & displays the correct component
//////////////////////////in this page////////////////////////////
//////custom routing per ticket type
///// application views has been split into 2 different views. copy pasta application views over to employee & client , then modify for both
//// application views will now show an if else statement for employeeViews vs CustomerViews depending on isStaff or not
///////////////higher order component

import { Outlet, Route, Routes } from "react-router-dom"
import { TodoList } from "../todos/TodoList"  //in ticketContainer
import { TodoForm } from "../todos/TodoForm" /// dont want staff to have the ability to create tickets
import { TodoSearch } from "../todos/TodoSearch" //in ticketContainer
import { TodoContainer } from "../todos/TodoContainer" //parent
import { ShopForm } from "../giftShop/ShopForm"
import { ShopContainer } from "../giftShop/ShopContainer"
// import { VipList } from "../vips/VipList"



////// dont forget to change from ApplicationViews to Employee Views
export const VipViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Responsible Irresponsible</h1>
                    <div>Live Your Life Luxuriously</div>

                    <Outlet />
                </>
            }>

                <Route path="todos" element={ <TodoContainer /> } />
                                            {/* links to ticketContainer which is the parent of ticket search and ticket list */}
                <Route path="todo/create" element={ <TodoForm /> } />

                <Route path="shops" element={ <ShopContainer /> } />

                <Route path="shop/create" element={ <ShopForm /> } />

                                             {/* links to ticket form page. found under TicketList & Ticket */} */
                  {/* <Route path="vips" element={ <VipList /> } />
                                                    route to employee list */}
            </Route>
        </Routes>
    )
}










//  starter code below
// export const ApplicationViews = () => {
// 	return <>
// 		<h1 className="title--main">Honey Rae Repairs</h1>
// 		<div>Your one-stop shop for repairing your tech</div>
// 	</>
// }

{/* <Route path="tickets" element={ 
    <>
        <TicketSearch />
        <TicketList />
    </>
} /> */}
                            // route used before parent was made in ticketContainer
                            // links to tickets page & ticket search for employees - now two components - > changes to react fragment and now siblings*/}
                            // Ticket list and ticket search cannot talk to each other without a parent - they arent inside each other they are next to each other
                           ///  ****parent is made in ticketContainer******  

        