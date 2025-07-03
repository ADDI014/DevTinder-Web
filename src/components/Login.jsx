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


const handleSignUp = async () => {
  try{
    const res = await axios.post(BASR_URL + "/signup", {firstName, lastName, emailId, password}, {
      withCredentials :  true,
    })

    dispatch(addUser(res?.data?.data));
    return navigate("/profile");
  }
  catch(err){
       setError(err?.response?.data || "something went wrong...");
  }
}

  return (
    <div className='flex justify-center items-center min-h-screen bg-cover bg-center' style={{backgroundImage : "url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1350&q=80')"}}>
      <div className="card bg-base-100 bg-opacity-90 shadow-2xl w-full max-w-md p-4 rounded-2xl">
  <div className="card-body">
    <h2 className="card-title flex justify-center text-2xl font-bold mb-4 text-purple-700">{isLogin ? "Login to DevSang 💻❤️" : "Sign Up for DevSang 💻🔥"}</h2>
      {!isLogin &&<div>
      <fieldset className="mb-3">
  <legend className="text-sm font-semibold text-gray-500">FirstName</legend>
  <input type="text" className="input input-bordered w-full my-1" value={firstName}  onChange={(e) => setFirstName(e.target.value) } />
</fieldset>

    <fieldset className="mb-3">
  <legend className="text-sm font-semibold text-gray-500">LastName</legend>
  <input type="text" className="input input-bordered w-full my-1" value={lastName} onChange={(e) => setLastName(e.target.value) } />
</fieldset>
    </div>}
    <div>
      <fieldset className="mb-3">
  <legend className="text-sm font-semibold text-gray-500">Email</legend>
  <input type="text" className="input input-bordered w-full my-1" value={emailId} onChange={(e) => setEmailId(e.target.value) } />
</fieldset>

    <fieldset className="mb-3">
  <legend className="text-sm font-semibold text-gray-500">Password</legend>
  <input type="password" className="input input-bordered w-full my-1"  value={password} onChange={(e) => setPassword(e.target.value) } />
</fieldset>
    </div>

    {error && <p className='text-red-600 text-center mb-2'>{error}</p>}
   
    <div className="card-actions justify-center">
      <button className="btn btn-primary w-full" onClick={isLogin ?  handleLogin : handleSignUp}>{isLogin ? "Login" : "Sign Up"}</button>
    </div>

    <p className='text-center mt-4 text-blue-600 underline cursor-pointer' onClick={() => setIsLogin((value) => !value)}>{isLogin ? "New User? Register Here" : "Existing User? Login Here"}</p>

  </div>
</div>
    </div>
  )
}

export default Login
