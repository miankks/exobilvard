import { useContext, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";
import {useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import './UserComments.css'

const UserComments = () => {
  const { url } = useContext(StoreContext);
  const [userComments, setUserComments] = useState({
    name: '',
    email: '',
    comments: ''
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setUserComments({
      ...userComments,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

     try {
        const res =  await axios.post(url+'/api/comment/placecomment', userComments)
        if (res.data.success) {
          toast.success(res.data.message)
          navigate('/')
        } else {
          toast.error(res.data.message)
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong. Please try again.");
      }
  }
  return (
    <div className='comment-container'>
      <h2>Leave a comment</h2>
      <form onSubmit={handleSubmit}>
        <label>Namn</label>
        <input type="text" placeholder='Ditt namn' onChange={handleChange} name='name' value={userComments.name}/>
        <label>email (optional)</label>
        <input type="email" placeholder='email' onChange={handleChange} name='email' value={userComments.email}/>
        <label>Comment</label>
      <textarea 
        name="comments"
        placeholder='Write your comment here' 
        rows="6"
        value={userComments.comments}
        required
        onChange={handleChange}></textarea>
        <button type='submit'>Skicka</button>
      </form>
    </div>
  )
}

export default UserComments