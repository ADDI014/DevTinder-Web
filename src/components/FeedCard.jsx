import axios from 'axios';
import React from 'react'
import { BASR_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeRequestFeed } from '../utils/feedSlice';

const FeedCard = ({user }) => {
    const { _id , firstName , lastName , photoUrl, age, gender, about, skills} = user;
    const dispatch = useDispatch();

    const handleRequest = async (status , userId) => {
      try {
        const res = await axios.post(BASR_URL + "/request/send/" + status + "/"+ userId , {} , {
          withCredentials : true,
        });

        dispatch(removeRequestFeed(userId));
      }
      catch(err) {
          //handle error here
      }
    }


  return (
<div
  className="flex justify-center min-h-screen"
  style={{
    backgroundImage: `url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1350&q=80')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>

      <div className="card bg-white shadow-2xl w-full max-w-sm rounded-xl overflow-hidden my-20">
  <figure className='bg-gray-100 p-4'>
    <img className='h-48 w-48  object-cover rounded-full mx-auto'
      src={photoUrl}
      alt="user Photo"/>
  </figure>
  <div className="card-body items-center text-center p-6">
    <h2 className="card-title text-2xl font-semibold mb-1 text-gray-700">{firstName + " " + lastName}</h2>
    {age && gender && <p className='text-sm text-gray-600 mb-1'>{age + " | " + gender}</p>}
    {skills && <p className='text-sm text-gray-600 mb-1'>Skills : {skills}</p> }
    {about && <p className='text-sm text-gray-600 mb-3'>{about}</p>}

    <div className="card-actions flex justify-center gap-4 mt-4">
      <button className="btn btn-outline btn-error hover:scale-105 transition" onClick={() => handleRequest("ignored", _id)}>Ignore</button>
      <button className="btn btn-outline btn-success hover:scale-105 transition" onClick={() => handleRequest("interested" , _id)}>Interested</button>
    </div>
  </div>
      </div>
    </div>
  )
}

export default FeedCard
