////where honey_user is created i think
import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Login = () => {
    const [email, set] = useState("kimIsCool@WhatAmIDoing.com")
    // puts thate email in as placeholder 
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
// where honey_user is created .... i think?
// fetch call looks at users and searches ? for emails that match
// you can verify honey_user on dev tools by gooing application -> storage -> local storage -> localhost:3000 (disappears when logged out)
        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("responsible_user", JSON.stringify({
                        id: user.id,
                        vip: user.isVip
                    }))

                    navigate("/")
                }
                else {
                    window.alert("who are you?")
                }
            })
    }

    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Welcome Back To A Life Of Luxury</h1>
                    <h2>Sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Ready to change your world?</Link>
            </section>
        </main>
    )
}

