import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASR_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {

    if(userData) return;

    try{
       const res = await axios.get(BASR_URL + "/profile/view" , {
      withCredentials : true,
    })

    dispatch(addUser(res.data));
    }
    catch(err) {
      navigate("/login");
      console.error(err);
    }
  }

  useEffect(() => {
      fetchUser();
  },[])






  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>

  )
}

export default Body
