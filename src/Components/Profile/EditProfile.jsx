import React from 'react';
import Navbar from '../Navbar/Navbar';
import "./Style.css";
import { useContext ,useEffect,useState} from "react";
import { themeContext } from "../../Context";
import {doc,updateDoc,collection} from "@firebase/firestore"
import { db } from "../../firebase";
import { auth  } from "../../firebase";
import Swal from 'sweetalert2';

//import App from '../App';
import { getAuth, updateProfile ,updatePassword,reauthenticateWithCredential ,  EmailAuthProvider,
  updatePhoneNumber } from "firebase/auth";

//import setBodyImage from '../setBodyImage';
import {query,getDocs,where} from "firebase/firestore"
export default function EditProfile() {
 // setBodyImage({bgimg:"linear-gradient(to right ,#e9c6ff,#DDF8FE)"})
 const theme = useContext(themeContext);
 const darkMode = theme.state.darkMode;
 const [userdetails, setUseractive] = useState('');
 const [docid, setdocid] = useState('');
 const [authenticated, setAuthenticated] = useState(false)
 const [file , setFile] = useState('')
 
 const [error, seterror]=useState(false);
 const [firstName, setfirstName]=useState();
 const [lastName, setlastName]=useState();
 const [PhoneNumber, setPhoneNumber]=useState();
 const [Password, setPassword]=useState();
 const [Email, setEmail]=useState();

////////////////////set user authentication///////////////////////////
useEffect(() => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      setAuthenticated(true)
      setUseractive(user)
     console.log(user)
  } else {
      setAuthenticated(false)
    }
  })
}, [])
console.log(authenticated)

 //////check for invalid input//////////
  const set=()=>{  
  seterror(true)
}

const userid=userdetails.uid
////////////////////////gets user from uid////////////////////////////////
const getdocbyq=async(id)=>{
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
console.log(res[0].id)
setFile(res[0].id)
console.log(file)
} 

//////////////////////////////////////////////////////////////////////////////////////////

const handlesubmit = (e) => {
  if(!firstName || !lastName || !PhoneNumber || !Password){
    e.preventDefault();
    console.log("provide information")}
    else{

      //Swal.fire('Profile updated successfully!', '', 'success')

      updatemyprofile()
      
      e.preventDefault();
      setfirstName('')
      setlastName('')
      setPassword('')
      setPhoneNumber('')
    }
  };


/////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////updates user table in db/////////////////////////////////
  const updatemyprofile=async()=>{
 // getdocbyq(userid)
 //console.log(id)
const collref=collection(db,'user')
const q=query(collref,where("user_id","==",userid))
const docrefs=await getDocs(q);
const res=[]
docrefs.forEach(resume=>{
  res.push({
    id:resume.id,...resume.data()
})
})
console.log(res[0].id)
//setFile(res[0].id)
//console.log(file)
  console.log(userid)
  //console.log(file)
  const collsref=doc(db,`/user/${res[0].id}`)
  await updateDoc(collsref,{'user_id': userid ,'firstname': firstName,'lastname':lastName,
  'phone':PhoneNumber,'password':Password});
  ////////////update profile//////////
  const auth = getAuth();
  updateProfile(auth.currentUser, {
  displayName: firstName, photoURL: ""
 })
///////////////////////updates password//////////////////////////////

  const users = auth.currentUser;
  updatePassword(users, Password).then(() => {
    //const oldPassword = '123456' // Get the value of the old password
    /*console.log(Password)
    const credentials = EmailAuthProvider.credential(users.email,Password);
    console.log('credentials')
    console.log(credentials)
    reauthenticateWithCredential(users, credentials);*/
  console.log('success')
  Swal.fire('Profile updated successfully! You need to sign in again.', '', 'success')

}).catch((error) => {
  console.log(error)
  // An error ocurred
}); 
  }
  return (   
<>     
    <link rel="stylesheet" href="Style.css"/>
    {/* Font Awesome */}
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" />
    {/* Google Fonts */}
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    {/* Bootstrap core CSS */}
    <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css" rel="stylesheet" />
    {/* Material Design Bootstrap */}
    <link href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.19.1/css/mdb.min.css" rel="stylesheet" />
          <Navbar>
          </Navbar>
    <div className="App"
        style={{
        background: darkMode ? "black" : "",
        }}
        >
        <div  className="container">
      <form onSubmit={(event)=>handlesubmit(event)}>
      <div className="row1 d-flex justify-content-center">
        <div className="col-md-10 mt-4 pt-4">
          <div className="row1 z-depth-3">
            <div className="col-sm-12 bg-white rounded-right">
              <h3 className="mt-3 text-center">Edit Profile</h3>
              <hr className="sectionsep"/>
              <div className="row1">
                <div className="col-sm-6">
                  <p className="fonts-bold">First Name</p>
                    <input id="fn" className="icon-rtlfn" type='text' required={true} 
                     value={firstName} placeholder='Gina'
                     maxLength="20" pattern='^[A-Za-z]+$' title='*This field requires alphabets only' 
                     onInvalid={e => set(e)} onChange={(event)=>{setfirstName(event.target.value);}}>
                    </input>
                </div>
                <div className="col-sm-6">
                  <p className="fonts-bold">Last Name</p>
                  <input id="ln" className="icon-rtlln" type='text' required={true} maxLength="20" placeholder='Linneti'
                  value={lastName} pattern='^[A-Za-z]+$' title='*This field requires alphabets only' onInvalid={e => set(e)} 
                  onChange={(event)=>{setlastName(event.target.value);}}/>
                </div>
                </div>
                <br>
              </br>
              <div className="row1">
                <div className="col-sm-6">
                  <p className="fonts-bold">Phone Number</p>
                  <input className="icon-rtlp" type='tel' placeholder="03345789678" pattern="[0-9]{4}[0-9]{7}" 
                  value={PhoneNumber} title='*Please fill out this field in 03345789678 format' required={true}  
                  maxlength="11" onChange={(event)=>{setPhoneNumber(event.target.value);}}/>
                </div>
           
                <div className="col-sm-6">
                  <p className="fonts-bold">Password</p>
                  <input className="icon-rtlpw" type='password' value={Password}
                  placeholder='******' required={true} minLength="6" maxLength='20'
                  onChange={(event)=>{setPassword(event.target.value);}}/>
                </div>
                </div>
                <br>
              </br>
             
              <div className="row1">
              <input  id='submit'type="submit"  value="Save" />
              </div>
            </div>
          </div>
        </div>
      </div>
      </form>
        </div>
        </div>
        </>
  )
}
