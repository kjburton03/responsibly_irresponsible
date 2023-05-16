import React, { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"


export const Home = () => {

return (
    <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
      height: '100vh' // Set the container height to full viewport height
    }}>
    <img src="https://i.imgur.com/nJrUCG0.jpg" alt="My Image" />
    </div>
);
}