import React from 'react'
import { Toaster } from 'react-hot-toast'
import {createBrowserRouter , RouterProvider} from 'react-router-dom'
import  HamroKistaHomepage from  "./HamroKistaHomepage"
import RegisterPage from './Components/Form/RegisterPage'
import LoginPage from './Components/Form/LoginPage'
import ForgotPasswordPage from './Components/Form/ForgotPasswordPage'
import HamroSaveDashboard from './Components/Userdashboard/HamroSaveDashboard'
import { LogIn } from 'lucide-react'
import Login from './Components/Form/Login'
import Register from './Components/Form/Register'
import OtpLogin from './Components/Form/OtpLogin'
import Dashboard from './Components/ADashboard/Dashboard'

const App = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HamroKistaHomepage />
    },
    {
      path: "/register",
      element: <RegisterPage />
    },
    {
      path: "/login",
      element: <LoginPage />
    },
    {
      path: "/forgot-password",
      element: <ForgotPasswordPage />
    },
    {
      path:"/User-dashboard",
      element: < HamroSaveDashboard />
    }
  ])
  return (
   <>
   <RouterProvider router={router} />
   <Toaster   position="middle" />
   </>
  )
}

export default App
