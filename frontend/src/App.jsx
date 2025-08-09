import React from 'react'
import { Toaster } from 'react-hot-toast'
import {createBrowserRouter , RouterProvider} from 'react-router-dom'
import  HamroKistaHomepage from  "./HamroKistaHomepage"
import RegisterPage from './Components/Form/RegisterPage'
import LoginPage from './Components/Form/LoginPage'
import ForgotPasswordPage from './Components/Form/ForgotPasswordPage'
import HamroSaveDashboard from './Components/Userdashboard/HamroSaveDashboard'
<<<<<<< HEAD
import { Home, LogIn } from 'lucide-react'
import Login from './Components/Form/Login'
import Register from './Components/Form/Register'
import OtpLogin from './Components/Form/OtpLogin'
import Dashboard from './Components/ADashboard/Dashboard'
import Navbar from './Components/Layout/Navbar/Navbar'
=======
import { LogIn } from 'lucide-react'
import OtpLogin from './Components/Form/OtpLogin'
import Dashboard from './Components/ADashboard/Dashboard'
import ProfilePage from './Components/Userdashboard/profile/ProfilePage'
>>>>>>> 61f1e6b8a67143cee8421434c5373ecc3b87edc1

const App = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path:"/navbar",
      element: <Navbar />
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
    },
    {
      path:"/profile",
      element: <ProfilePage />
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
