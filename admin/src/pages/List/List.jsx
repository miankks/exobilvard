import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast} from 'react-toastify'
import './List.css'

const List = ({url}) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${url}/api/car/listcar`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      
      if (response.data.success) {
        setList(response.data.data)
      } else {
        toast.error('Error')
      }
    } catch (error) {
      toast.error("Error fetching orders");
    }
  }

  useEffect(() => {
    fetchList();
  }, [])

  const removeCar = async (carId) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${url}/api/car/removecar`, {id: carId}, {
       headers: {
          Authorization: `Bearer ${token}`
        }
    })
    await fetchList();
    response.data.success ? toast.success(response.data.message) : toast.error('Error')
  }
  return (
    <div className='list add flex-col'>
      <p>All Car list</p>
      <div className="list-table">
        <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Action</b>
            <b>Edit</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <button type='button' className='cursor delete-button' onClick={() => removeCar(item._id)}>x</button>
              <button>edit</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List