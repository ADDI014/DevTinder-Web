import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { BASR_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';
import devSangLogo from "../assests/devSang.png";


const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASR_URL + "/logout" , {} , {
        withCredentials : true,
      })

      dispatch(removeUser());
      return navigate("/login");
    }
    catch(err){
      //Error Logic
    }
  }


  return (
      <div className="navbar fixed top-0 z-50 bg-gradient-to-r from-base-200 to-base-50 shadow-md">
        <div className="flex-1">
          <Link to={"/"} className="btn btn-ghost text-xl"><img src={devSangLogo} alt='devSang Logo' className='h-10'></img></Link>
        </div>

        <div className="flex items-center gap-4 mr-5">
          {user && (
            <>
              <p className="text-base font-medium hidden md:block">Welcome, {user.firstName}</p>

              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img alt="User photo" src={user.photoUrl} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-200 rounded-box z-10 mt-3 w-52 p-2 shadow"
                >
                  <li><Link to={"/profile"} className="justify-between">Profile</Link></li>
                  <li><Link to={"/connections"}>Connections</Link></li>
                  <li><Link to={"/requests"}>Requests</Link></li>
                  <li><a onClick={handleLogout}>Logout</a></li>
                </ul>
              </div>
            </>
          )}
          
        </div>
      </div>
  );
};

export default Navbar;
