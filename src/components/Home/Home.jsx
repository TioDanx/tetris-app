import React from 'react'
import {Link} from "react-router-dom"
import title from "../../assets/title.png"

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
  fontSize: 16,
  backgroundColor: "black",
  padding: "20px 30px",
  borderRadius: "10px"
}

export const Home = () => {
  return <div className="home-container">
      <div className="home">
          <img src={title} alt="" />
          <p>Daniel Campuzano</p>
          <Link style={linkStyle} to="/game">Play</Link>
      </div>
  </div>
}

export default Home;
