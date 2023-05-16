import { Outlet, Route, Routes } from "react-router-dom"
import { TodoList } from "../todos/TodoList"
import { TodoForm } from "../todos/TodoForm"
import { TicketSearch } from "../todos/TodoSearch"
import { TicketContainer } from "../todos/TodoContainer" // needed for employees
import { Profile } from "../profile/Profile"
import { TodoEdit } from "../todos/TodoEdit"
import { ShopList } from "../shops/ShopList"
import { ShopForm } from "../shops/ShopForm"
import { ShopEdit } from "../shops/ShopEdit"
import { Home } from "../home/home"



export const ApplicationViews = () => {
    return (
    <Routes>
    <Route path="/" element={
        <div>

            <div>are you ready to live your life luxuriously?</div> 

            <Outlet />
        </div>
    }>

        <Route path="todos" element={ <TodoList /> } />

        <Route path="todo/create" element={ <TodoForm /> } />

        <Route path="todos/:todoId/edit" element={ <TodoEdit /> } />

        <Route path="shops" element={ <ShopList /> } />

        <Route path="shop/create" element={ <ShopForm /> } /> 

        <Route path="shops/:shopId/edit" element={ <ShopEdit /> } />

        <Route path="home" element={ <Home /> } />

    </Route>
</Routes>
    );
}
//     const localResponsibleUser = localStorage.getItem("responsible_user")
//     const responsibleUserObject = JSON.parse(localResponsibleUser) 

//     if (responsibleUserObject.staff) {
//         return <EmployeeViews />
//     }  
//     else {
//         return <CustomerViews />
//     }  
// }
