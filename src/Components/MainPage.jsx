import React from 'react'
import Navbar from './Navbar/Navbar'
import AboutUs from './AboutUs/AboutUs'
import ContactUs from './ContactUs/ContactUs'
import Template from './TemplateSlider/Template'
import Footer from './Footer/Footer'
import UpperPart from './UpperPart/UpperPart'
import Help from './Help/Help'


export default function MainPage() {
  return (
    <div>
      <Navbar/>
      <UpperPart/>
      <AboutUs/> 
      <ContactUs/>
      <Template/>
      <Help/>
      <Footer/>
    </div>
  )
}