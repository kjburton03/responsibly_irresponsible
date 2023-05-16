import { useState } from "react"
import { ShopList } from "./ShopList"
import { ShopSearch } from "./ShopSearch"

export const ShopContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <ShopSearch setterFunction={setSearchTerms} keyColon={"value"} example={120} placenta={"yummy"}/> 
        <ShopList searchTermState={searchTerms}/>
            
    </>
}