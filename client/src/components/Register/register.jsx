import React from 'react';
import {useNavigate} from "react-router-dom"
import './reg.css'
import axios from 'axios'
import  { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
const navigate = useNavigate();


const[backenddata,setbackenddata]=useState([])

  const[username,setusername]=useState("")
  const[password,setpass]=useState("")
  const[fullname,setfull]=useState("")
  const[email,setgamil]=useState("")
  // function senddata(){ 

  //   var user = {
  //     username:username,
  //     password:password,
  //     fullname:fullname,
  //     email:email
  //   }
  //   axios.post('/api/register',user)
  //   .then(res=>{
  //     console.log(res)
  //  //   setbackenddata(res.data)
  //  if(res.data==='registered')
  //  toast.success("Registered")
  //  else
  //     toast.error(res.data)
  //   }).catch(err=>{
  //     setbackenddata(err);
  //   })
   

  // }
  async function senddata(ev) {
    ev.preventDefault();
    const response = await fetch(process.env.React_App_Host_Api+"/register", {
      method: "POST",
      body: JSON.stringify({ username, password,fullname,email }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      toast("Registration successful");
      
    } else {
      toast("Registration failed");
    }
  }

  

  

return (
<>

<div className='form2'>
<label for="username">Username:</label>
  <input type="text" placeholder='Username' value={username} onChange={(ev)=>{setusername(ev.target.value)}} /><br></br>
  <label for="password">Password:</label>
  <input type="password" placeholder='Password' value={password} onChange={(ev)=>{setpass(ev.target.value)}} /><br></br>
  <label for="fullname">Fullname:</label>
  <input type="fullname" placeholder='Fullname' value={fullname} onChange={(ev)=>{setfull(ev.target.value)}} /><br></br>
  <label for="email">email:</label>
  <input type="email" placeholder='Email' value={email} onChange={(ev)=>{setgamil(ev.target.value)}} /><br></br><br></br>
  <button className='log' onClick={senddata}>Register</button>
  <ToastContainer />  
<br></br>
  <a href='/login'>Back to login</a>
  </div>

</>
)
};

export default Register;
