import axios from 'axios'
import React, { useEffect } from 'react'
import { BASR_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import FeedCard from './FeedCard'

const Feed = () => {

  const feed = useSelector((store) => store.feed);


  const dispatch = useDispatch();

 const getFeed = async () => {
  if(feed) return;
  try{
    const res = await axios.get(BASR_URL + "/user/feed" , {
      withCredentials : true,
    });
    // console.log(res?.data);
    dispatch(addFeed(res?.data));
  }
  catch(err){
    //error handling logic here...
  }

  }
  useEffect(() => {
  getFeed();
  }, []);


  if(!feed) return;

  if(feed.length <= 0) return <h1 className='flex justify-center font-bold my-10'>No New User Exists</h1>
  

  return feed && (
    <div>
      <FeedCard user={feed[0]}/>
    </div>
  )
}

export default Feed
