

import { Route, Routes } from "react-router-dom"
import { Authorized } from "./components/views/Authorized"
import { ApplicationViews } from "./components/views/ApplicationViews"
import { NavBar } from "./components/nav/NavBar"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import "./Responsibly.css"


export const Responsibly = () => {
	return <Routes>


		<Route path="*" element={
			<Authorized>
				<>
					<NavBar />
					<ApplicationViews />
				</>
			</Authorized>

		} />
	</Routes>                  
}

