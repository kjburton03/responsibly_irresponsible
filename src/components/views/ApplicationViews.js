import { Outlet, Route, Routes } from "react-router-dom";
import { Register } from "../auth/Register";
import { Login } from "../auth/Login";
import { TodoList } from "../todos/TodoList";
import { TodoForm } from "../todos/TodoForm";
import { TodoEdit } from "../todos/TodoEdit";
import { ShopList } from "../shops/ShopList";
import { ShopForm } from "../shops/ShopForm";
import { ShopEdit } from "../shops/ShopEdit";
import { Home } from "../home/home";
import { Authorized } from "./Authorized";

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={<Authorized> 
        <div>
          <div></div>
          <Outlet />
        </div>
      </Authorized>}>

        <Route path="/todos" element={<TodoList />} />
        <Route path="/todoform" element={<TodoForm />} />
        <Route path="/todos/editShop/:todoId" element={<TodoEdit />} />

        <Route path="/shops" element={<ShopList />} />
        <Route path="/shopform" element={<ShopForm />} />
        <Route path="/shops/editshop/:shopId" element={<ShopEdit />} />

        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  );
};





// import { Outlet, Route, Routes } from "react-router-dom"
// import { Register } from "../auth/Register"
// import { Login } from "../auth/Login"
// import { TodoList } from "../todos/TodoList"
// import { TodoForm } from "../todos/TodoForm"
// import { TodoEdit } from "../todos/TodoEdit"
// import { ShopList } from "../shops/ShopList"
// import { ShopForm } from "../shops/ShopForm"
// import { ShopEdit } from "../shops/ShopEdit"
// import { Home } from "../home/home"
// import { Authorized } from "./Authorized"



// export const ApplicationViews = () => {
//     return (
//     <Routes>

//         <Route path="/login" element={ <Login /> } />

//         <Route path="/register" element={ <Register /> } />

//         <Route path="todos" element={ <TodoList /> } />

//         <Route path="todo/create" element={ <TodoForm /> } />

//         {/* <Route path="todos/:todoId/edit" element={ <TodoEdit /> } /> */}

//         <Route path="shops" element={ <ShopList /> } />

//         <Route path="shop/create" element={ <ShopForm /> } /> 

//         <Route path="shops/:shopId/edit" element={ <ShopEdit /> } />

//         <Route path="home" element={ <Home /> } />


// </Routes>
//     );
// }
