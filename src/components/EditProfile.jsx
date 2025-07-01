import React, { useState } from 'react'
import FeedCard from './FeedCard';
import axios from 'axios';
import { BASR_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({user}) => {

    // const {firstName, lastName , age , gender, photoUrl, skills , about} = user;

    const [firstName , setFirstName] = useState(user.firstName);
    const [lastName , setLastName] = useState(user.lastName);
    const [age , setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [skills, setSkills] = useState(user.skills);
    const [about, setAbout] = useState(user.about);
    const [error, setError] = useState("");
    const [toast , setToast] = useState(false);
    const dispatch = useDispatch();

    const saveProfile = async () => {

      //clear Error
      setError("");
      try{
        const res = await axios.patch(BASR_URL + "/profile/edit" , {
        firstName, lastName , age , gender, photoUrl, skills , about
        },
        {
          withCredentials : true
        }
      );

      dispatch(addUser(res?.data.data));
      setToast(true);
      setTimeout( () => {
        setToast(false);
      }, 5000)

      }
      catch(err){
        setError(err.response.data);
      }
    }



  return (
    <>
  <div
  className="min-h-screen bg-cover bg-center flex justify-center items-center px-4"
  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1600&q=80')" }}
>
  {/* Combined Card Container */}
  <div className="bg-base-200 bg-opacity-90 rounded-2xl shadow-lg flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
    
    {/* Edit Profile Form */}
    <div className="w-full md:w-1/2 p-6">
      <h2 className="text-xl font-bold text-center mb-4">Edit Profile</h2>

      <fieldset className="mb-3">
        <legend className="text-sm">First Name</legend>
        <input
          type="text"
          className="input input-bordered input-sm w-full"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </fieldset>

      <fieldset className="mb-3">
        <legend className="text-sm">Last Name</legend>
        <input
          type="text"
          className="input input-bordered input-sm w-full"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </fieldset>

      <fieldset className="mb-3">
        <legend className="text-sm">Age</legend>
        <input
          type="text"
          className="input input-bordered input-sm w-full"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </fieldset>

      <fieldset className="mb-3">
        <legend className="text-sm">Gender</legend>
        <input
          type="text"
          className="input input-bordered input-sm w-full"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
      </fieldset>

      <fieldset className="mb-3">
        <legend className="text-sm">Photo URL</legend>
        <input
          type="text"
          className="input input-bordered input-sm w-full"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
        />
      </fieldset>

      <fieldset className="mb-3">
        <legend className="text-sm">Skills</legend>
        <input
          type="text"
          className="input input-bordered input-sm w-full"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
      </fieldset>

      <fieldset className="mb-3">
        <legend className="text-sm">About</legend>
        <input
          type="text"
          className="input input-bordered input-sm w-full"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
      </fieldset>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <div className="text-center mt-4">
        <button className="btn btn-primary btn-sm" onClick={saveProfile}>
          Save Profile
        </button>
      </div>
    </div>

    {/* Preview Card */}
    <div className="w-full md:w-1/2 p-6 flex justify-center items-center border-t md:border-t-0 md:border-l border-gray-300">
      <FeedCard
        user={{ firstName, lastName, age, gender, photoUrl, skills, about }}
        showActions={false}
      />
    </div>
  </div>

  {/* Toast Notification */}
  {toast && (
    <div className="toast toast-top toast-center">
      <div className="alert alert-success">
        <span>Profile saved successfully.</span>
      </div>
    </div>
  )}
</div>

     </>
  )
}

export default EditProfile
