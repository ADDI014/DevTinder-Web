import axios from 'axios';
import React from 'react'
import { BASR_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeRequestFeed } from '../utils/feedSlice';

const FeedCard = ({user}) => {

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
    <div className='flex justify-center mb-20'>
      <div className="card bg-base-300 w-64 shadow-sm">
  <figure>
    <img className='h-60 w-60 object-center'
      src={photoUrl}
      alt="user Photo"/>
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
    {age && gender && <p>{age + " " + gender}</p>}
    <p>{skills}</p>
    <p>{about}</p>

    <div className="card-actions justify-center my-4">
      <button className="btn btn-primary" onClick={() => handleRequest("ignored", _id)}>Ignore</button>
      <button className="btn btn-secondary" onClick={() => handleRequest("interested" , _id)}>Interested</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default FeedCard
