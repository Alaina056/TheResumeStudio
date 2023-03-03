import React, { useState } from "react";
import './ContactUs.css'
import { useContext } from "react";
import { themeContext } from "../../Context";
import{ db } from '../../firebase';
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
// import './InputContact';

const initialState = {
  firstname: "",   
  lastname: "",
  phonenumber: "",
  email: "",
  message: ""
};


const Contact = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});


  const { firstname, lastname, phonenumber, email, message} = state;

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setState({...state, [name]: value});
  };
  // const userCollectionRef =collection(db, "contactdatabase");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!firstname || !lastname || !phonenumber || !email || !message){
    // if (!firstname.length===3 && !firstname.length===20 ){
      toast.error("provide information")
    };
    if (firstname && lastname && phonenumber && email && message){
      addDoc(collection(db,'contactdatabase'),state);
      toast.success("Thank You For Your Feedback!!!");
      const {name, value} = e.target;
      setState({...initialState, [name]:value});
      };
    };
 
  return (
    <>
      <section className="contactus-section" id="ContactUs">
        <div className="contactus-text">
                <div className="contactus-heading">
                  <span style={{color: darkMode? 'white': ''}}>
                    Give Your <br/> 
                  </span>
                  <span style={{color: darkMode? 'var(--orange)': ''}}>Valuable Feedback</span>
                  <div className="blur s-blurl" style={{ background: "#ABF1FF94"}}></div>
                </div>
        </div>

            <div className="contact-form">

                {/* right side contact form  */}
                <div className="contact-rightside">
                  <form onSubmit={handleSubmit}>

                    <div className="row-contact">
                      
                        <input 
                          id="firstname"
                          name="firstname"
                          value={firstname}
                          type="text"
                          className="form-control"
                          placeholder="First Name"
                          required={true} minLength='3' maxlength="20" pattern='^[A-Za-z]+$' title='*This field requires alphabets only'
                          onChange={handleInputChange}
                        />

                      </div>
                    <div className="row-contact">
                        <input 
                          id="lastname"
                          name="lastname"
                          value={lastname}
                          type="text"
                          className="form-control"
                          placeholder="Last Name"
                          required={true} minLength='3' maxlength="20" pattern='^[A-Za-z]+$' title='*This field requires alphabets only'
                          onChange={handleInputChange}
                        />

                      
                    </div>
                    <div className="row-contact">
                      
                        <input
                        id='phonenumber'
                        name="phonenumber"
                        value={phonenumber}
                          type="tel"
                          className="form-control"
                          placeholder="Phone Number "
                          pattern="[0-9]{4}[0-9]{7}" title='*Please fill out this field in 03345789678 format' required={true} maxlength="11"
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="row-contact">
                        <input
                          type="email"
                          id='email'
                          name="email"
                          value={email}
                          className="form-control"
                          placeholder="Email ID"
                           maxlength='30' required={true} pattern='[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'
                   title='*Please fill out this field in abc@gmail.com format ' onChange={handleInputChange}/>

                      
                    </div>

                    <div className="row-contact">
                      
                        <textarea 
                        id="message"
                        name="message"
                        value={message}
                        required={true}
                          type="text"
                          className="form-control"
                          placeholder="Enter Your Message"
                          onChange={handleInputChange}
                        />
                      
                    </div>
                    <div class="form-check form-checkbox-style">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckChecked"
                      />
                      <label style={{color: darkMode? 'white': ''}}
                        class="form-check-label"
                        className="main-hero-para">
                        I agree that the 'The Resume Studio' may contact me at the
                        email address or phone number above
                      </label>
                    </div>
                    <input type='submit' value='Submit' />

                    <span className="static-msg"></span>
                    
                  <div className="blur c-blurl"
                     style={{ background: "var(--purple)"}}></div>

                  </form>
                </div>
              </div>
      </section>
    </>
  );
};

export default Contact;
