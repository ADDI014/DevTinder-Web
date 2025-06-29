import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASR_URL } from '../utils/constants';


const Login = () => {

const [emailId , setEmailId] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const [firstName , setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [isLogin, setIsLogin] = useState(true);


const dispatch = useDispatch();
const navigate = useNavigate();

const handleLogin = async () => {
  try{
     const result =await axios.post(BASR_URL+ "/login" , {
      emailId ,
      password
     },
      {withCredentials : true}
    
    )
    dispatch(addUser(result.data));
     return navigate("/");
  }
  
  catch(err){
    setError(err?.response?.data || "something went wrong...");
  }
}


  return (
    <div className='flex justify-center my-10'>
      <div className="card card-border bg-base-300 w-96">
  <div className="card-body">
    <h2 className="card-title flex justify-center">{isLogin ? "Login" : "Sign Up"}</h2>
      {!isLogin &&<div>
      <fieldset className="fieldset">
  <legend className="fieldset-legend">FirstName</legend>
  <input type="text" className="input" value={firstName}  onChange={(e) => setFirstName(e.target.value) } />
</fieldset>

    <fieldset className="fieldset">
  <legend className="fieldset-legend">LastName</legend>
  <input type="password" className="input" value={lastName} onChange={(e) => setLastName(e.target.value) } />
</fieldset>
    </div>}
    <div>
      <fieldset className="fieldset">
  <legend className="fieldset-legend">Email</legend>
  <input type="text" className="input" value={emailId} onChange={(e) => setEmailId(e.target.value) } />
</fieldset>

    <fieldset className="fieldset">
  <legend className="fieldset-legend">Password</legend>
  <input type="password" className="input"  value={password} onChange={(e) => setPassword(e.target.value) } />
</fieldset>
    </div>

    <p className='text-red-700'>{error}</p>
   
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={handleLogin}>{isLogin ? "Login" : "Sign Up"}</button>
    </div>

    <p className='m-auto my-5 cursor-pointer' onClick={() => setIsLogin((value) => !value)}>{isLogin ? "New User ? register Here" : "Existing User ? Login Here"}</p>

  </div>
</div>
    </div>
  )
}

export default Login
