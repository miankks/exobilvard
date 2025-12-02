import { useState } from 'react';
import {toast} from 'react-toastify'
import './UserComments.css'

const UserComments = () => {
  const [userComments, setUserComments] = useState({
    name: '',
    email: '',
    comments: ''
  })

  const handleChange = (e) => {
    setUserComments({
      ...userComments,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    e.preventDefault();

     try {
        const res =  await axios.post(url+'/api/comment/placecomment', userComments)

        if (res.data.success) {
          toast.success(res.data.message)
          navigate('/orderconfirmation')
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
        <input type="text" placeholder='Ditt namn' onChange={handleChange}/>
        <label>email (optional)</label>
        <input type="email" placeholder='email' onChange={handleChange}/>
        <label>Comment</label>
      <textarea 
        placeholder='Write your comment here' 
        rows="6"
        // onChange={onChangeHandler}
        required
        onChange={handleChange}></textarea>
        <button type='button'>Skicka</button>
      </form>
    </div>
  )
}

export default UserComments