import React from 'react'

const FeedCard = ({user}) => {

    const {firstName , lastName , photoUrl, age, gender, about} = user;
  return (
    <div className='flex justify-center my-10'>
      <div className="card bg-base-300 w-64 shadow-sm">
  <figure>
    <img
      src={photoUrl}
      alt="user Photo"/>
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
    {age && gender && <p>{age + " " + gender}</p>}
    <p>{about}</p>
    <div className="card-actions justify-center my-4">
      <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-secondary">Interested</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default FeedCard
