export const TicketSearch = ({ setterFunction }) => {  // returns an input field 
    return (
        <div>
        <input 
            onChange={
                (changeEvent) => {
                    setterFunction(changeEvent.target.value)
                }
            }
        type="text" placeholder="Enter search terms" /> 
        </div>
    )
}

// applicationViews is where we set up our routes

// div separates it from the other buttons

///chapter 9... i got bored 


//// devtools components ticketContainer -> ticketSearch -> props setterFunction:ƒ bound dispatchSetState() {}