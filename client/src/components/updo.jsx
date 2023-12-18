import React, { useEffect, useContext, useState } from "react";
import {useNavigate,useLocation} from "react-router-dom"
import './file.css'
import axios from 'axios'
// import  { useState } from "react";
import {useDropzone} from 'react-dropzone'
import Dropzone from 'react-dropzone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from './UserContext';
const Updo = () => {
  useEffect(() => {
    fetch("http://localhost:5000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);
  const { setUserInfo, userInfo } = useContext(UserContext);
const navigate = useNavigate();
const location = useLocation();

  const[backenddata,setbackenddata]=useState([])
  const usermail=userInfo.email;

  const {getRootProps, getInputProps} = useDropzone()
 
    const [selectedFile, setSelectedFile] = useState([]);
    function upload(){
        navigate('/detail')
    }
    function download(){
        navigate('/down')
    }

return (
	<>
<p>Hello {usermail}</p>

 
 

  <button className='upbutton' onClick={upload}><b>Upload</b></button>
  <br></br><br></br>
  <button className='downbutton' onClick={download}><b>Download</b></button>
  
	</>
)
};

export default Updo;
