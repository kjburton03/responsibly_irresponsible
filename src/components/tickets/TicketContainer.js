import { useState } from "react"
import { TicketList } from "./TicketList"
import { TicketSearch } from "./TicketSearch"    // combines these two with parent

export const TicketContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")   // keeping the state of search terms in here  // empty string

    return <>
        <TicketSearch setterFunction={setSearchTerms} keyColon={"value"} example={120} placenta={"yummy"}/> 
        <TicketList searchTermState={searchTerms}/>
            
    </>
}
