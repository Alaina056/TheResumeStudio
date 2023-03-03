import React from 'react'
import Resume1 from "../../img/resume1.png";
import Resume2 from "../../img/resume2.png";
import './UpperPart.css'
import { useContext } from "react";
import { themeContext } from "../../Context";
import { useNavigate } from 'react-router-dom';
 
const UpperPart = () => {

  let navigate = useNavigate();
  const routeChange = () => {
    let path = '/resume';
    navigate(path);
    
  }

  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
    return (
        <div className='header'>
          <div className="head-left">
              <div className="head-text">
                  <span style={{color: darkMode? 'white': ''}}>The Resume</span>
                  <span>Studio</span>
                  <span style={{color: darkMode? 'white': ''}}>"If opportunity doesn't knock, build a door." ― Milton Berle..... That is why build your brand-new resume with our website for free.</span>
              </div>
  
              <button onClick={routeChange} className='button head-button' >Build Resume</button>
          </div>

          <div className="head-right">
            <div className='yellow'></div>
            <div className='blue-dark'style={{background: darkMode? '':"url('/src/img/yellow.png')"}}></div>
            <div className='blue-light'></div>
            {/*blur div*/}
            {/* <div className='blur' style={{background : "rgb(238 210 255)"}}> </div>
            <div className='blur' style={{background: '#C1F5FF',top: '17rem', width: '21rem' ,height: '11rem', left: '-9rem'}}> </div> */}
          </div>
  
        </div>
      )
}

export default UpperPart
