import React, { useState ,useEffect} from 'react'
import { Link } from 'react-scroll';
import Toggle from '../Toggle/Toggle'
import './Navbar.css'
import UserProfile from '@iconscout/react-unicons/icons/uil-user'
import { useContext } from "react";
import { themeContext } from "../../Context";
import { useNavigate } from 'react-router-dom';
//import Dropdown from './Dropdown';
import { auth } from "../../firebase";

const Navbar = () => {

    const theme = useContext(themeContext);
    const darkMode = theme.state.darkMode;
    
    const [open, setOpen] = useState(false);
    const [authenticated, setAuthenticated] = useState(false)
    const [useractive, setUseractive] = useState('');

    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setAuthenticated(true)
          setUseractive('Log Out')

        } else {
          setAuthenticated(false)
          setUseractive('Sign Up')

        }
      })
    }, [])
    //console.log(authenticated)

    const directUser=()=>{
      if (authenticated){
        console.log('logout')
        logout()
      }
      else{
        routeChangeSignup()
      }

    }
    const GotoProf=()=>{
      if (authenticated){
        routeChangeProfile()
    }
      else{
        console.log('please log in to view profile')
      }
    }
    let navigate = useNavigate();
    const routeChange = () => {
      let path = '/';
      navigate(path);
    }

    const routeChangeResume = () => {
      let path = '/resume';
      navigate(path);
    }

    const routeChangeSignup  = () => {
      let path = '/signup';
      navigate(path);
    }
    const routeChangeLogin  = () => {
      let path = '/login';
      navigate(path);
    }

    const routeChangeProfile  = () => {
      let path = '/profile';
      navigate(path);
    }
    const logout  = () =>{
      //auth.signOut()
       auth.signOut()
       setAuthenticated(false)
    }

  return (
    <div className="n-wrapper" id='Navbar'>
        <div className="n-left">
            <div className="n-webname">The Resume Studio</div>
            <Toggle/>
        </div>
        <div className="n-right">
            <div className="n-list">
                <ul>
                    <li className='menu-container'>
                    <Link spy={true}  smooth={true}>
                    <ul onClick={routeChange} onDoubleClick={()=>{setOpen(!open)}}>Home</ul>
                    </Link>


                    <div style={{color: darkMode? 'var(--orange)': ''}} className={`dropdown-menu ${open? 'active' : 'inactive'}`} > 
                      <ul>

                      <Link spy={true} to= 'AboutUs' smooth={true}>
                        <DropdownItem text={"About Us"}/>
                      </Link>

                      <Link spy={true} to= 'ContactUs' smooth={true}>
                        <DropdownItem text={"Contact Us"}/>
                      </Link>
                      
                      <Link spy={true} to= 'Template' smooth={true}>
                        <DropdownItem text={"Template"}/>
                      </Link>

                      <Link spy={true} to= 'Help' smooth={true}>
                        <DropdownItem text={"Help"}/>
                      </Link>

                      </ul>
                    </div>
                    </li>
                  
                    <li style={{color: darkMode? 'white': ''}} onClick={routeChangeResume}>BuildResume</li>
                    <li style={{color: darkMode? 'white': ''}} onClick={directUser}>{useractive}</li>
                    <li style={{color: darkMode? 'white': '' ,visibility: authenticated? 'hidden':''}} onClick={routeChangeLogin} >Sign In</li>

                </ul>
            </div>
            
        <div className="n-profile">
            
                  <div className='menu-trigger' onClick={GotoProf} style={{visibility: authenticated? 'visible':''}}>
                  <UserProfile className='profvisiblity' style={{color: darkMode? 'var(--orange)': '' ,visibility: authenticated? 'visible':''}}/>          
                  </div>

        </div>
        </div>       
    </div>
  )
}
function DropdownItem(props) {
  return(
    <li className='dropdownItem'>
      <a> {props.text}</a>
    </li>
  ); 
}
export default Navbar
