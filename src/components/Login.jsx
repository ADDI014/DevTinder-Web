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
    <h2 className="card-title flex justify-center">Login</h2>
    <div>
      <fieldset className="fieldset">
  <legend className="fieldset-legend">Email</legend>
  <input type="text" className="input"  onChange={(e) => setEmailId(e.target.value) } />
</fieldset>

    <fieldset className="fieldset">
  <legend className="fieldset-legend">Password</legend>
  <input type="password" className="input"  onChange={(e) => setPassword(e.target.value) } />
</fieldset>
    </div>

    <p className='text-red-700'>{error}</p>
   
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Login
