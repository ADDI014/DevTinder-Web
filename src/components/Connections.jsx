import axios from 'axios'
import React, { useEffect } from 'react'
import { BASR_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionsSlice'

const Connections = () => {

    const connection = useSelector((store) => store.connection);
    const dispatch = useDispatch();

    const userConnection = async () => {
        try {
            const res =await axios.get(BASR_URL + "/user/connections", {
                withCredentials : true
            });

            console.log(res?.data?.data);
            dispatch(addConnections(res?.data?.data));
        }
        catch(err){
            //hanle error here
        }
    }

    useEffect(() => {
        userConnection();
    },[]);


    if(!connection) return;

    if(connection.length === 0) return <h1>No connection found</h1>;

  return (
    <div className='text-center my-6'>
        <h1 className='font-bold text-2xl'>Connections</h1>

        {connection.map((connection) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about} = connection;
            return (
           <div key={_id} className="flex justify-center items-center py-4 px-4">
  <div className="card card-side bg-base-200 shadow-sm w-full max-w-4xl">
    <figure className="pl-6 flex items-center">
      <img
        className="w-25 h-25 rounded-full object-cover"
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
    </div>
  </div>
</div>

            )
        })}
    </div>
  )
}

export default Connections
