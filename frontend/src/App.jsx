import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import HamroKistaHomepage from './HamroKistaHomepage'
import HamroSaveDashboard from './Components/Userdashboard/HamroSaveDashboard'

const App = () => {
  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<HamroKistaHomepage />}/>
    <Route path="/home" element={<HamroSaveDashboard />}/>
   </Routes>
  
   </BrowserRouter>
   
   </>
  )
}

export default App
