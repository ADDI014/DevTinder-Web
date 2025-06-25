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
    <div className='flex justify-center my-10'>
      <div className='flex justify-center items-center'>
      <div className="card card-border bg-base-300 w-full max-w-md mb-20">
  <div className="card-body">
    <h2 className="card-title flex justify-center text-sm">Edit Profile</h2>
    <div>
      <fieldset className="fieldset">
  <legend className="fieldset-legend">FirstName:</legend>
  <input type="text" className="input input-sm w-full"  value={firstName}  onChange={(e) => setFirstName(e.target.value) } />
</fieldset>

    <fieldset className="fieldset">
  <legend className="fieldset-legend">LastName:</legend>
  <input type="text" className="input input-sm w-full" value={lastName}  onChange={(e) => setLastName(e.target.value) } />
</fieldset>

   <fieldset className="fieldset">
  <legend className="fieldset-legend">Age:</legend>
  <input type="text" className="input input-sm w-full" value={age}  onChange={(e) => setAge(e.target.value) } />
</fieldset>


   <fieldset className="fieldset">
  <legend className="fieldset-legend">Gender:</legend>
  <input type="text" className="input input-sm w-full" value={gender}  onChange={(e) => setGender(e.target.value) } />
</fieldset>

  <fieldset className="fieldset">
  <legend className="fieldset-legend">PhotoUrl:</legend>
  <input type="text" className="input input-sm w-full" value={photoUrl}  onChange={(e) => setPhotoUrl(e.target.value) } />
</fieldset>

  <fieldset className="fieldset">
  <legend className="fieldset-legend">Skills:</legend>
  <input type="text" className="input input-sm w-full" value={skills}  onChange={(e) => setSkills(e.target.value) } />
</fieldset>

  <fieldset className="fieldset">
  <legend className="fieldset-legend">About:</legend>
  <input type="text" className="input input-sm w-full" value={about}  onChange={(e) => setAbout(e.target.value) } />
</fieldset>
    </div>
   
    <div className="card-actions justify-center">
      <button className="btn btn-primary btn-sm" onClick={saveProfile}>Save Profile</button>
    </div>
  </div>
  <p>{error}</p>
</div>
    </div>

    <FeedCard user={{firstName , lastName, age, gender, photoUrl , skills, about}}/>
    </div>

  { toast && <div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>Profile saved successfully.</span>
  </div>
</div>}
     </>
  )
}

export default EditProfile
