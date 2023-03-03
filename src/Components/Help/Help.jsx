import React from 'react'
import { Container } from 'react-bootstrap';
import './Help.css'
import { useContext } from "react";
import { themeContext } from "../../Context";
 
const Help = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  return (
    <Container id='Help'>
    <div className='help'>
        <div className='help-text'> 
          <span style={{color: darkMode? 'white': ''}}> Need Help? </span>
          <span style={{color: darkMode? 'var(--orange)': ''}}>Here we are......</span>
          </div>
        <div className='help-videos'>
            <video width="520" height='240' controls>
              <source src='/Videos/helpVideo2.mp4'/>
            </video>

            <video width="520" height='240' controls>
              <source src='/Videos/helpVideo5.mp4'/>
            </video>

        </div>
    </div>
    </Container>
  )
}

export default Help
