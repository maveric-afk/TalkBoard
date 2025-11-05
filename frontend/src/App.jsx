import { useState } from 'react'
import './App.css'
import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import Home from './pages/Home'
import Boards from './pages/Boards'
import Rooms from './pages/Rooms'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import {Toaster} from 'react-hot-toast'

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
