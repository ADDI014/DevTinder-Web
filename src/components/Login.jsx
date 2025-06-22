import axios from 'axios';
import React, { useState } from 'react'





const Login = () => {


  
const [emailId , setEmailId] = useState("chintu@gmail.com");
const [password, setPassword] = useState("Chintu@123");

const handleLogin = async () => {
  try{
     const result = axios.post("http://localhost:7777/login" , {
      emailId ,
      password
     },
      {withCredentials : true}
    
    )
  }
  catch(err){
    console.error(err);
  }
}
  return (
    <div className='flex justify-center my-10'>
      <div className="card card-border bg-base-300 w-96">
  <div className="card-body">
    <h2 className="card-title flex justify-center">Login</h2>
    <div>
      <fieldset className="fieldset">
  <legend className="fieldset-legend">Email</legend>
  <input type="text" className="input"  onChange={(e) => setEmailId(e.target.value) } />
</fieldset>

    <fieldset className="fieldset">
  <legend className="fieldset-legend">Password</legend>
  <input type="text" className="input"  onChange={(e) => setPassword(e.target.value) } />
</fieldset>
    </div>
   
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Login
