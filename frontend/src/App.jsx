import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from './Pages/Home'
import About from './Pages/About'
import Signin from './Pages/Signin'
import Profile from './Pages/Profile'
import Signup from './Pages/Signup'
import Header from './Components/Header'
import PrivateRoute from './Pages/PrivateRoute'
import Listing from './Pages/Listing'
import UpdateListing from './Pages/UpdateListing'

const App = () => {
  return (
   <BrowserRouter>
   <Header/>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/sign-in' element={<Signin/>}/>
  
    <Route path='/sign-up' element={<Signup/>}/>
    <Route element={<PrivateRoute/>}>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/create-listing' element={<Listing/>}/>
    <Route path='/update-listing/:listingId' element={<UpdateListing/>}/>
    </Route>
   </Routes>
   </BrowserRouter>
  )
}

export default App

