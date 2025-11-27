import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './components/HomePage'
import HotelList from './components/HotelList'
import SingleHotelPage from './components/SingleHotelPage'
import BookingPage from './components/BookingPage'
import Successpage from './components/Successpage'
import MyBookings from './components/MyBookings'
import AdminDashboard from './admin/AdminDashboard'
import About from './components/About'
import Auth from './components/Auth'
import Enquiry from './components/Enquiry'

function App() {

  const location=useLocation();

  const hidenavbar=  location.pathname.startsWith("/auth")||
                     location.pathname.startsWith("/admin")
                  


  return (
    <>
      {!hidenavbar && <Navbar />}
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/hotellist' element={<HotelList/>}/>
      <Route path='/hotelpage/:id' element={<SingleHotelPage/>}/>
      <Route path='/booking' element={<BookingPage/>}/>
      <Route path='/success' element={<Successpage/>}/>
      <Route path='/mybookings' element={<MyBookings/>}/>
      <Route path='/admin' element={<AdminDashboard/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/auth' element={<Auth/>}/>
      <Route path='/enquiry' element={<Enquiry/>}/>

    </Routes>
        {!hidenavbar && <Footer />}
    </>
  )
}

export default App
