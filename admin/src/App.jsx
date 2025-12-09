import React from 'react'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './components/Orders/Orders';
import CompletedOrders from './pages/CompletedOrders/CompletedOrders';
import RejectedOrders from './pages/RejectedOrders/RejectedOrders';
import AcceptedOrders from './pages/AcceptedOrders/AcceptedOrders';
import AdminSignup from './pages/AdminSignup/AdminSignup';
import AdminLogin from './pages/AdminLogin/AdminLogin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookingsSummary from './pages/BookingsSummary/BookingsSummary';
import CompletedOrdersDetails from './components/completedOrdersDetails/CompletedOrdersDetails';
import RejectedOrdersDetails from './components/RejectedOrdersDetails/RejectedOrdersDetails';
import AcceptedOrdersDetails from './components/AcceptedOrdersDetails/AcceptedOrdersDetails';
import AdminProfile from './components/AdminProfile/AdminProfile';
import { StoreProvider } from "./context/StoreContext";
import { AuthProvider } from './context/AuthContext';
import { AdminProvider } from './context/AdminContext';


const App = () => {
  const url = 'http://localhost:3000';

  const API_URL = import.meta.env.VITE_API_URL;
  fetch(`${API_URL}/api/comment/getallcomments`)
      .then(res => res.json())
      .then(console.log("success")
      )

  return (
    <div>
      <AuthProvider url={url}>
        <AdminProvider url={url}>
          <ToastContainer />
          <Navbar url={url}/>
          <div className="app-content">
            <Sidebar />
            <Routes>
              <Route path='/addcar' element={<Add url={url}/>} />
              <Route path='/adminprofile' element={<AdminProfile url={url}/>} />
              <Route path='/listcar' element={<List url={url}/>} /> 
              <Route path='/orders/' element={<BookingsSummary url={url}/>} /> 
              <Route path='/orders/:id' element={<Orders url={url}/>} /> 
              <Route path='/completedorders' element={<CompletedOrders url={url}/>} /> 
              <Route path='/completedorders/:id' element={<CompletedOrdersDetails url={url}/>} /> 
              <Route path='/acceptedorders' element={<AcceptedOrders url={url}/>} /> 
              <Route path='/acceptedorders/:id' element={<AcceptedOrdersDetails url={url}/>} /> 
              <Route path='/rejectedorders' element={<RejectedOrders url={url}/>} /> 
              <Route path='/rejectedorders/:id' element={<RejectedOrdersDetails url={url}/>} /> 
              <Route path='/signup' element={<AdminSignup url={url}/>} /> 
              <Route path='/login' element={<AdminLogin url={url}/>} /> 
            </Routes >
            </div>
          </AdminProvider>
        </AuthProvider>
    </div>
  )
}

export default App