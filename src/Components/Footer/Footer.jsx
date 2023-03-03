import React from 'react'
import './Footer.css'
import Wave from '../../img/wave.png'
import LinkedIn from '@iconscout/react-unicons/icons/uil-linkedin'
import Facebook from '@iconscout/react-unicons/icons/uil-facebook'
import Github from '@iconscout/react-unicons/icons/uil-github'

const Footer = () => {
  return (
    <div className='footer'>
        <img src={Wave} alt='' style={{width: '100%'}}/>
        <div className="f-content">
            <span>theResumeStudio@gmail.com</span>
            <div className='f-icons'>
                <a href='http://www.linkedin.com'><LinkedIn color='white' size='3rem'/></a>
                <a href='http://www.facebook.com'><Facebook color='white' size='3rem'/></a>
                <a href='http://www.github.com'><Github color='white' size='3rem'/></a>
                 
            </div>

        </div>
    
    </div>
  )
}

export default Footer
