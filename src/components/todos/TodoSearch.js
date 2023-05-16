export const TodoSearch = ({ setterFunction }) => {  // returns an input field 
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
