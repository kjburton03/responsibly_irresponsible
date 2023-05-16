import { useState } from "react"
import { TodoList } from "./TodoList"
import { TodoSearch } from "./TodoSearch"   

export const TodoContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")  

    return <>
        <TodoSearch setterFunction={setSearchTerms} keyColon={"value"} example={120} placenta={"yummy"}/> 
        <TodoList className="penis" searchTermState={searchTerms}/>
            
    </>
}
