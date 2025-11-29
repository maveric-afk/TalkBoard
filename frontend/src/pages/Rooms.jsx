import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { NavLink ,useNavigate} from 'react-router-dom'
import api from '../api/axios'
import { RoomCard } from '../components/RoomCard'

const Rooms = () => {
  const[rooms,setRooms]=useState([]);

  const navigate=useNavigate();
  useEffect(()=>{
    api.get('/api/room/all')
    .then((res)=>{
      if(res.data.error){
        toast.error(res.data.error);
        navigate('/signin')
      }
      else if(res.data.rooms){
        setRooms(res.data.rooms);
      }
    })
    .catch((e)=>{
      console.log(e);
    })
  })
  return (
    <div>
      <div className='flex justify-between items-center py-12 border-b border-black'>
        <NavLink
        to='/'
        className="py-2 px-4 absolute top-4 left-4 rounded-2xl text-blue-500 border border-blue-500 hover:text-blue-900 hover:border-blue-900 duration-200">
            Back
        </NavLink>

      <div className='flex gap-4 absolute top-4 right-4 items-center'>
         <NavLink
        to='/joinroom'
        className="py-2 px-4 rounded-2xl bg-blue-500 text-white hover:bg-blue-900 duration-200">
            Join
        </NavLink>

         <NavLink
        to='/createroom'
        className="py-2 px-4 rounded-2xl bg-blue-900 text-white hover:bg-blue-500 duration-200">
            Create
        </NavLink>
      </div>
      </div>

    {rooms.length==0
    ?<div className='font-semibold mt-[6rem] md:mt-[12rem] text-black text-lg sm:text-2xl md:text-4xl text-center'>
      No rooms are available yet
    </div>
    :<div className='mx-8 grid grid-cols-1 mt-[3rem] md:mt-[5rem] sm:grid-cols-2 md:grid-cols-4 gap-4'>
       {rooms.map((room)=>(
         <div key={room._id}>
            <RoomCard image={room.Thumbnail} name={room.RoomName} type={room.Type} members={room.Participants}/>
          </div>
       ))}
      </div>}
    </div>
  )
}

export default Rooms
