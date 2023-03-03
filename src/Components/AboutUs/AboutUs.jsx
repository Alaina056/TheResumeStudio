import React from 'react'
import FloatinDiv from '../FloatingDiv/FloatingDiv'
import './AboutUs.css'
import Crown from "../../img/crown.png"
import { useContext } from "react";
import { themeContext } from "../../Context";
import { Link } from 'react-scroll';

const AboutUs = () => {

    const transition = { duration: 2, type: 'spring'}

    const theme = useContext(themeContext);
    const darkMode = theme.state.darkMode;

    return (
        <div className='about' id='AboutUs'>
            <div className='about-text'>
                <span style={{color: darkMode? 'var(--orange)': ''}}>About Us </span>
                <span style={{color: darkMode? 'white': ''}}> One of the most time-consuming elements of applying for new jobs is customizing
    your resume for each new role that you apply for. With our free resume builder, you
    can create multiple resumes for different job roles and download them.
     <br/>Moreover, the templates used in our website are professional approved, so you
    don’t have to worry about how they look—because they already look great! But you
    always change colors of the templates. <br/>
    So Let us help you with gathering your skills and landing you your dream job.</span>

            </div>

            <div className='about-cards1'> 
                
                <div>
                <div style={{margin:'10px'}}><FloatinDiv img={Crown}text1={"Awesome & Elegant"} text2={"Resume Creation"}/></div>
                <div style={{margin:'10px'}}><FloatinDiv img={Crown}text1={"Update your Resume"} text2={"When Your Want!!"}/></div>
                <div style={{margin:'10px'}}><FloatinDiv img={Crown}text1={"Generate"} text2={"Your Resume as PDF"}/></div>
                </div>
            </div>

            <div className='about-cards2'>
            <div>
                <div style={{margin:'10px'}} ><FloatinDiv img={Crown}text1={"Professional Resume"} text2={"Template For Everyone"}/></div>
                <div style={{margin:'10px'}}><FloatinDiv img={Crown}text1={"Easy And "} text2={"Simple To Use Website"}/></div>
                <div style={{margin:'10px'}}><FloatinDiv img={Crown}text1={"Save Your"} text2={"Precious Time With Us"}/></div>
            </div> 
            </div> 
          
        </div>
        
      )
}

export default AboutUs
