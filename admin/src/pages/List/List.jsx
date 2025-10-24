import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast} from 'react-toastify'
import './List.css'

const List = ({url}) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/car/list`)
    
    if (response.data.success) {
      setList(response.data.data)
    } else {
      toast.error('Error')
    }
  }

  useEffect(() => {
    fetchList();
  }, [])

  const removeCar = async (carId) => {
    const response = await axios.post(`${url}/api/car/remove`, {id: carId})
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
            <b>Pris</b>
            <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price} {" "}sek</p>
              <p className='cursor' onClick={() => removeCar(item._id)}>x</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List