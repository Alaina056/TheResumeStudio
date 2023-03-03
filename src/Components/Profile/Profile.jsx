import React from 'react'
import "./Style.css";
import Navbar from '../Navbar/Navbar';
import ListGroup from 'react-bootstrap/ListGroup';
import { useContext,useEffect,useState } from "react";
import { themeContext } from "../../Context";
import { auth } from "../../firebase";
import { db } from '../../firebase';
import { collection } from 'firebase/firestore';
import {query,getDocs,where} from "firebase/firestore"

import {
   Link
} from 'react-router-dom';
import EditProfile from './EditProfile';
//import setBodyImage from '../setBodyImage';

export default function Profile() {
  const [authenticated, setAuthenticated] = useState(false)
  const [userdetails, setUseractive] = useState('');
  
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true)
        setUseractive(user)

      } else {
        setAuthenticated(false)

      }
    })
  }, [])
  //console.log(authenticated)
  //setBodyImage({bgimg:"linear-gradient(to right,#DDF8FE,#e9c6ff,#fca61f73)"});
  //let url="https://www.w3schools.com/react/react_css_styling.asp";
///////////////////////////////////////HTML FOR RESUME LIST////////////////////

  ////////////////////////////GET RESUME////////////////////////////////////
 
  const [file , setFile] = useState([])
  const [userfile , setuserFile] = useState('')
  //const [resume , setresume] = useState(false)
  const userid=userdetails.uid
 // console.log(userid)

  const getdocbyq=async(id)=>{
  const collref=collection(db,'resume')
  const q=query(collref,where("user_id","==",id))
  const docrefs=await getDocs(q);
  //console.log(docrefs)
const res=[]
docrefs.forEach(resume=>{
  res.push({
    id:resume.id,...resume.data()
})
})
setFile(res)
}
getdocbyq(userid)


//////////////////get details from user db////////////////
const getuserdocbyq=async(id)=>{
  //console.log(id)
  const collref=collection(db,'user')
  const q=query(collref,where("user_id","==",id))
  const docrefs=await getDocs(q);
  const res=[]
  docrefs.forEach(resume=>{
    res.push({
      id:resume.id,...resume.data()
  })
  })
  //console.log(res[0])
  setuserFile(res[0])
 //console.log(userfile)
  } 
 getuserdocbyq(userid)


const theme = useContext(themeContext);
const darkMode = theme.state.darkMode;
return (
  <body className='profile'>
        <div className="App"
        style={{
        background: darkMode ? "black" : "",
        color: darkMode ? "white" : "",
        }}
        >
        <Navbar/>
          <title>Profile</title>
          <link rel="stylesheet" href="Style.css"/>

          {/* Font Awesome */}
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" />
          {/* Google Fonts */}
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          {/* Bootstrap core CSS */}
          <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css" rel="stylesheet" />
          {/* Material Design Bootstrap */}
          <link href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.19.1/css/mdb.min.css" rel="stylesheet" />

      </div>
      <div className="App"
        style={{
        background: darkMode ? "black" : "",
        }} >
          <div  className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-md-10 mt-1 pt-4">
                <div className="row1 z-depth-3">
                  <div className="col-sm-12 bg-white rounded-right">
                    <h3 className="mt-3 text-center"> Profile<div className="ediprofhover">
                      <Link style={{color:'#FCA61F'}} to="/editprofile">
                      <i className="far fa-edit fa-2x mb-4" style={{color:'#FCA61F'}}> </i>
                      <p>Edit Profile</p></Link>
                    </div></h3>
                    <hr className="sectionsep"/>
                    <div className="row1" >
                      <div className="col-sm-6">
                        <p  className="font-weight-bold">First Name</p>
                        <h6 className=" text-muted">{userdetails.displayName}</h6>
                      </div>
                      <div className="col-sm-6">
                        <p className="font-weight-bold">Last Name</p>
                        <h6 className=" text-muted">{userfile.lastname}</h6>
                      </div>
                      </div>
                    <div className="row1">
                      <div className="col-sm-6">
                        <p className="font-weight-bold">Email</p>
                        <h6 className=" text-muted">{userdetails.email}</h6>
                      </div>
                      <div className="col-sm-6">
                        <p className="font-weight-bold">Phone</p>
                        <h6 className="text-muted">{userfile.phone}</h6>
                      </div>
                    </div>
                    <h3 className="mt-3 text-center">Saved Resumes</h3>
                    <hr className="sectionsep" />
                    <div className="row1">
                      <div id='resume' className="col-sm-12" >
                                      <ListGroup>
   {
        file?.map((resume,i)=>(

            <ListGroup.Item  className="fw-bold ms-2"
            key={i} action  href={resume.resumefile}>Resume{i}.pdf
</ListGroup.Item>
        ))
    }
  </ListGroup> 
                      </div>
                      </div>
                     
                    <br>
                    </br>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
  </body>
        );
      }

