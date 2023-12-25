import React, { useEffect, useContext, useState } from "react";
import axios from 'axios'
import fileDownload from 'js-file-download'
import './file2.css'
import {useNavigate,useLocation} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from "./UserContext";

const Down = () => {
  useEffect(() => {
    fetch(process.env.React_App_Host_Api+"/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);
  const { setUserInfo, userInfo } = useContext(UserContext);
  const navigate = useNavigate();
// const location = useLocation();
  const email  = userInfo.email; 
  // const username=username2;
  const[download,setdow]=useState('')
  const [downloadProgress, setDownloadProgress] = useState(0);
  const[backenddata,setbackenddata]=useState([])
  var user5 = {
    email:email
  }
//   axios.post('/api/site',user5)
// .then(res=>{
//   console.log(res)
//   setbackenddata(res.data);
//   });
  function handleDownload () {
    if(download=='')
    {
      toast.error("please write file name")
    }
    else{
    var user={
      download:download,
      email:email
    }
    axios.post(process.env.React_App_Host_Api+'/api/down',user, {
      responseType: 'blob',
      onDownloadProgress: (progressEvent) => {
        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        setDownloadProgress(progress);
      },
    })
    .then((res) => {
      toast.success('success')
      fileDownload(res.data, download)
      setDownloadProgress(0);
    })
    .catch(()=>
    {
      toast.error("file not found")
    })
  }}
 
    const [files, setFiles] = useState([]);
  function show() {
      var user = {
        email: email,
      };
    
      axios.post(process.env.React_App_Host_Api + '/api/files', user)
        .then((response) => {
          const files = response.data;
    
          if (files.length === 0) {
            toast.error("No files found");
          }
    
          setFiles(files);
        })
        .catch(() => {
          toast("An error occurred while fetching files");
        });
    }
  // function show(){
  //   var user={
  //     email:email
  //   }
  //   axios.post(process.env.React_App_Host_Api+'/api/files',user)
  //     .then((response) => {
  //       setFiles(response.data);
  //     })
  // }
 function dow(file){
  
  setdow(file);
  

 }
 function del(){
  if(download=='')
    {
      toast.error("please write file name")
    }
    else{

  var user={
    download:download,
    email:email
  }
  axios.post(process.env.React_App_Host_Api+'/api/delete',user).then((res)=>{
    toast.success("Deleted");
    show();
  }).catch((err)=>{
    toast.error("File not found and Not deleted")
  })

  
    }
 } 

   
  return(  
    <>
    <p>{email}</p>
  <div className="down">
<input className="inputdown" type='text' placeholder="enter file name" value={download} onChange={(e)=>{setdow(e.target.value)}} ></input>
<br></br>
  <button className="download" onClick={handleDownload}>Download</button>
  <button className="show" onClick={show}>Show files:</button>
  <button className="delete" onClick={del}>Delete</button>
  {downloadProgress > 0 && (
        <div className='progress-bar' style={{ width: `${downloadProgress}%` }}>
          {downloadProgress}%
        </div>
      )}
  <ToastContainer/>
  <div>
        <h1>Files Available:</h1>
        {/* <ol> */}
          {files.map((file, index) => (
            <h6 key={index}>{file}<button onClick={()=>dow(file)}>download</button></h6>
          ))}
        {/* </ol> */}
      </div>
  </div>
  </>
  )
  
}

export default Down;
