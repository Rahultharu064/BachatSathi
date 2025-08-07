import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import HamroKistaHomepage from './HamroKistaHomepage'
import HamroSaveDashboard from './Components/Userdashboard/HamroSaveDashboard'
import { LogIn } from 'lucide-react'
import Login from './Components/Form/Login'
import Register from './Components/Form/Register'
import OtpLogin from './Components/Form/OtpLogin'
import Dashboard from './Components/ADashboard/Dashboard'

const App = () => {
  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<HamroKistaHomepage />}/>
    <Route path="/home" element={<HamroSaveDashboard />}/>
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
    <Route path="/otp-login" element={<OtpLogin />} />
     <Route path="/dashboard" element={<Dashboard />} />
   </Routes>
  
   </BrowserRouter>
   
   </>
  )
}

export default App
