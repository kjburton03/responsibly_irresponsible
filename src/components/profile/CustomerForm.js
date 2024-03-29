import { useEffect, useState } from "react"

export const CustomerForm = () => {
    // TODO: Provide initial state for profile
    const [profile, updateProfile] = useState({
        address: "",
        phoneNumber: 0,
        userId: 0
    })

    const localResponsibleUser = localStorage.getItem("responsible_user")
    const responsibleUserObject = JSON.parse(localResponsibleUser) 
    // devtools -> application -> storage -> localhost -> now shows the value of staff and id under it 
    //stole from ticketList.js

    // TODO: Get employee profile info from API and update state
    useEffect(() => {
        fetch(`http://localhost:8088/customers?userId=${responsibleUserObject.id}`)
            .then(response => response.json())
            .then((data) => {
                const customerObject = data[0]
                updateProfile(customerObject)
            })
    }, [])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */
    return fetch(`http://localhost:8088/customers/${profile.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(profile)

    })
            .then(response => response.json())
            .then(() => {
                setFeedback("Customer profile successfully saved")
            })
        }
            const [feedback, setFeedback] = useState("")

            useEffect(() => {
                if (feedback !== "") {
                    // Clear feedback to make entire element disappear after 3 seconds
                    setTimeout(() => setFeedback(""), 3000);
                }
            }, [feedback])
    
    return (
        <>
        <form className="profile">
            <h2 className="profile__title">Edit your personal info</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.address}
                        onChange={
                            (evt) => {
                                // TODO: Update specialty property
                                const copy = {...profile}
                                copy.address = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Phone Number:</label>
                    <input type="text" //it is a number but it is a string in this case 
                        className="form-control"
                        value={profile.phoneNumber}
                        onChange={
                            (evt) => {
                                // TODO: Update rate property
                                // even tho the type is number it will always return a string
                                // unlessss you wrap it in a parse 
                                const copy = {...profile}
                                copy.phoneNumber = evt.target.value
                                // copy.phoneNumber = evt.target.value  //dont need parse for phone number ;float is for decimal, 2 is for decimal amount .20        components -> applicationviews -> employeeviews -> profile -> employee form -> changes state
                                //got initial state fethed from the api for the permanent state and updated the  component state and now capturing what the user did .next step saving
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
    {feedback}
</div>
      </>  
    )
}