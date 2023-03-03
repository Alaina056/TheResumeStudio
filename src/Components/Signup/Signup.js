import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {addDoc,collection} from "@firebase/firestore"
import InputControl from "../InputControl/InputControl";
import { auth } from "../../firebase";
import { db } from "../../firebase";
import Swal from 'sweetalert2';
import styles from "./Signup.module.css";
import Navbar from '../Navbar/Navbar';

function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.firstname || !values.lastname || !values.email ||!values.phone|| !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.firstname,
        });

        ////////////////////add user in db///////////
        const ref=collection(db,"user");
        let data={user_id:user.uid,email:values.email,firstname:values.firstname,lastname:values.lastname,
        phone:values.phone,password:values.pass};
            try{
              //ref.doc('id').set(data);
              console.log(data)
                addDoc(ref,data);
            }
            catch(e){
                console.log(e);
            }
            Swal.fire('Your account been created successfully!', '', 'success')

        navigate("/");
      
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  return (
    <>                <Navbar/>
    
    <div className={styles.container}>

      <div className={styles.innerBox}>
        <h1 className={styles.signup}id='signup'>SIGNUP</h1>

        <InputControl
          label="First Name"
          placeholder="Enter your first name"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, firstname: event.target.value }))
          }
        />
        <InputControl
          label="Last Name"
          placeholder="Enter your last name"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, lastname: event.target.value }))
          }
        />
        <InputControl
          label="Email"
          placeholder="Enter email address"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <InputControl
          label="Phone No"
          placeholder="Enter your phone No"
          onChange={(event)=>
            setValues((prev) => ({ ...prev, phone: event.target.value}))
          } 

        />
        <InputControl
          label="Password"
          placeholder="Enter password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
        />

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button onClick={handleSubmission} disabled={submitButtonDisabled}>
            Signup
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}

export default Signup;
