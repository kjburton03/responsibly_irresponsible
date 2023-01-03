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

// devtools -> components -> ticketSearch -> props -> yummy placenta 
                                            // source -> ticketContainer.js 9

// return <>
// props on a single object -> no matter how many you make you can deconstruct them
// <TicketSearch setterFunction={setSearchTerms}/>   // give one the parents function object keys and values, variable = values
// <TicketList searchTermState={searchTerms}/>   // the other its state 
       // cannot directly send state to each other. 
       // put the states they want to share in a parent 
       // tw
// </>

// this is the parent component that will maintain the state and ticket list and ticket search are going to get
// access to this state via props 

//// the value of the setSearchTerms variable is a function

///// ticketSearch does not contain the state of searchTerms or the function of setSearchTerms , the parent ticketContainer does


/////// ticketsearch needs access to setSearchTerms function -> settter function  

///// ticketList needs acces to the actual state -> searchTermState

/// passing values down to child components 

//// setterFunction is name of key