import React from 'react'
import './Template.css'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

import { useContext } from "react";
import { themeContext } from "../../Context";


import resume1 from '../../img/resume1.png'
import resume2 from '../../img/resume2.png'
import resume3 from '../../img/resume3.png'
import resume4 from '../../img/resume4.png'
import resume5 from '../../img/resume5.png'
import resume6 from '../../img/resume6.png'



const Template = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
 
  return (
    <div className='template' id='Template'>

        <span style={{color: darkMode? 'var(--orange)': ''}}>Templates</span>

      <Swiper         
        spaceBetween={30}
        slidesPerView={3}
        grabCursor={true}
        className="template-slider">

        <SwiperSlide> <img src={resume1} alt=""/> </SwiperSlide>
        <SwiperSlide> <img src={resume2} alt=""/> </SwiperSlide>
        <SwiperSlide> <img src={resume3} alt=""/> </SwiperSlide>
        <SwiperSlide> <img src={resume4} alt=""/> </SwiperSlide>
        <SwiperSlide> <img src={resume5} alt=""/> </SwiperSlide>
        <SwiperSlide> <img src={resume6} alt=""/> </SwiperSlide>

      </Swiper>      
    </div>
  )
}

export default Template
