import axios from 'axios'
import React, { useEffect } from 'react'
import { BASR_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from '../utils/requestSlice'

const Requests = () => {

    const requests = useSelector((store) => store?.request);

    const dispatch = useDispatch();

    const reviewRequest = async (status, _id) => {
        try{
            const res = await axios.post(BASR_URL+ "/request/review/" + status + "/" + _id, {} , {
                withCredentials : true,
            });


            dispatch(removeRequest(_id));
        }
        catch(err){
            //handle error here
        }
    }

    const fetchRequests = async () => {
     try {
        const res = await axios.get(BASR_URL + "/user/requests/received", {
            withCredentials : true,
        })

        dispatch(addRequests(res?.data?.data));
     }
     catch(err){
        //error handle here
     }
    }

    useEffect(() => {
        fetchRequests();
    }, []);

    if(!requests) return;

       if(requests.length === 0) return <h1 className='flex justify-center font-bold my-20'>No Requests found</h1>;




  return (
    <div className='text-center my-25'>
        <h1 className='font-bold text-2xl'>Requests</h1>

        {requests.map((request) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about} = request.fromUserId;
            return (
          <div key={_id} className="flex justify-center items-center py-4 px-4">
  <div className="card card-side bg-base-200 shadow-sm w-full max-w-4xl">
    <figure className="pl-6 flex items-center">
      <img
        className="w-24 h-24 rounded-full object-cover"
        src={photoUrl}
        alt="photo"
      />
    </figure>

    <div className="card-body p-4 items-center">
      <h2 className="card-title text-base">
        {firstName + " " + lastName}
      </h2>
      <p className="text-sm text-gray-600">About: {about}</p>
      <p className="text-sm text-gray-600">Age: {age}</p>
      <p className="text-sm text-gray-600 capitalize">Gender: {gender}</p>

      <div className="card-actions justify-end mt-4">
        <button className="btn btn-success btn-sm" onClick={ () => reviewRequest("accepted" , request._id)}>Accept</button>
        <button className="btn btn-error btn-sm" onClick={ () => reviewRequest("rejected" , request._id)}>Reject</button>
      </div>
    </div>
  </div>
</div>


            )
        })}
    </div>
  )
}

export default Requests
