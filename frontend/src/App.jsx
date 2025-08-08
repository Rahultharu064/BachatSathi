import React from 'react'
import { Toaster } from 'react-hot-toast'
import {createBrowserRouter , RouterProvider} from 'react-router-dom'
import  HamroKistaHomepage from  "./HamroKistaHomepage"
import RegisterPage from './Components/Form/RegisterPage'
import LoginPage from './Components/Form/LoginPage'
import ForgotPasswordPage from './Components/Form/ForgotPasswordPage'
import HamroSaveDashboard from './Components/Userdashboard/HamroSaveDashboard'




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
    <Toaster position="top-center" />
    </>
  )
}

export default App
