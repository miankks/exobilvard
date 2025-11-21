import React from 'react'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import { Orders } from './pages/Orders/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CompletedOrders from './pages/CompletedOrders/CompletedOrders';
import RejectedOrders from './pages/RejectedOrders/RejectedOrders';
import AcceptedOrders from './pages/AcceptedOrders/AcceptedOrders';

const App = () => {
  const url = 'http://localhost:3000';
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path='/addcar' element={<Add url={url}/>} />
          <Route path='/listcar' element={<List url={url}/>} /> 
          <Route path='/orders' element={<Orders url={url}/>} /> 
          <Route path='/completedorders' element={<CompletedOrders url={url}/>} /> 
          <Route path='/acceptedorders' element={<AcceptedOrders url={url}/>} /> 
          <Route path='/rejectedorders' element={<RejectedOrders url={url}/>} /> 
        </Routes >
      </div>
    </div>
  )
}

export default App