import { useState } from 'react'
import './App.css'
import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import Home from './pages/Home'
import Boards from './pages/Boards'
import Rooms from './pages/Rooms'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import {Toaster} from 'react-hot-toast'
import Dashboard from './pages/Dashboard'
import JoinRoom from './pages/JoinRoom'
import CreateRoom from './pages/CreateRoom'
import ChatRoom from './pages/ChatRoom'

const router=createBrowserRouter([
  {
    path:'/',
    element:<div>
      <Home/>
    </div>
  },
  {
    path:'/boards',
    element:<div>
      <Boards/>
    </div>
  },
  {
    path:'/rooms',
    element:<div>
      <Rooms/>
    </div>
  },
  {
    path:'/signup',
    element:<div>
      <Signup/>
    </div>
  },
  {
    path:'/signin',
    element:<div>
      <Signin/>
    </div>
  },
  {
    path:'/dashboard',
    element:<div>
      <Dashboard/>
    </div>
  },
  {
    path:'/joinroom',
    element:<div>
      <JoinRoom/>
    </div>
  },
  {
    path:'/createroom',
    element:<div>
      <CreateRoom/>
    </div>
  },
  {
    path:'/rooms/:id',
    element:<div>
      <ChatRoom/>
    </div>
  }
])
function App() {

  return (
    <>
    <RouterProvider router={router}>

    </RouterProvider>
    <Toaster/>
    </>
  )
}

export default App
