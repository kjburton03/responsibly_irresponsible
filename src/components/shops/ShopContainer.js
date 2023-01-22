import { useState } from "react"
import { ShopList } from "./ShopList"
import { ShopSearch } from "./ShopSearch"    // combines these two with parent

export const ShopContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")   // keeping the state of search terms in here  // empty string

    return <>
        <ShopSearch setterFunction={setSearchTerms} keyColon={"value"} example={120} placenta={"yummy"}/> 
        <ShopList searchTermState={searchTerms}/>
            
    </>
}


/// passing values down to child components 

//// setterFunction is name of key