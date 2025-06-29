import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { BASR_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';

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
    <div>
      <div className="navbar bg-base-200 shadow-sm">
        <div className="flex-1">
          <Link to={"/"} className="btn btn-ghost text-xl">👨‍💻devTinder</Link>
        </div>

        <div className="flex items-center gap-4 mr-5">
          {user && (
            <>
              <p className="text-base font-medium">Welcome, {user.firstName}</p>

              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img alt="User" src={user.photoUrl} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
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
    </div>
  );
};

export default Navbar;
