import React from 'react'
import api from '../api/axios'
import { useNavigate,NavLink } from 'react-router-dom'
import toast from 'react-hot-toast'

const Dashboard = () => {

    const navigate=useNavigate()

    function handleLogout(){
        api.get('/api/user/logout')
        .then((res)=>{
            if(res.data.error){
                toast.error(res.data.error);
                navigate('/signin')
            }
            else if(res.data.success){
                toast.success(res.data.success)
                navigate('/')
            }
        })
        .catch((e)=>{
            console.log(e);
        })
    }

  return (
    <div>
        <NavLink
                to='/'
                className="py-2 px-4 absolute top-4 left-4 rounded-2xl text-blue-500 border border-blue-500 hover:text-blue-900 hover:border-blue-900 duration-200">
                    Back
                </NavLink>
      <button
    onClick={handleLogout}
    className="py-2 px-4 absolute bottom-4 left-4 rounded-2xl text-blue-500 border border-blue-500 hover:text-blue-900 hover:border-blue-900 duration-200">
        Logout
    </button>
    </div>
  )
}

export default Dashboard
