import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./UserComments.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import { CarContext } from "../../context/CarContext";

const UserComments = () => {
  const { url } = useContext(CarContext);
  const [userComments, setUserComments] = useState({
    name: "",
    email: "",
    comments: "",
    rating: 0,
  });
  const stars = [1, 2, 3, 4, 5];
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserComments({
      ...userComments,
      [name]: value,
    });
  };

  const handleRatingChange = (value) => {
    setUserComments((prev) => ({
      ...prev,
      rating: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        url + "/api/comment/placecomment",
        userComments
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };
  return (
    <div className="comment-container">
      <h2>Leave a comment</h2>
      <form onSubmit={handleSubmit}>
        <label>Namn</label>
        <input
          type="text"
          placeholder="Ditt namn"
          onChange={handleChange}
          name="name"
          value={userComments.name}
        />
        <label>email (optional)</label>
        <input
          type="email"
          placeholder="email"
          onChange={handleChange}
          name="email"
          value={userComments.email}
        />
        <label>Comment</label>
        <textarea
          name="comments"
          placeholder="Write your comment here"
          rows="6"
          value={userComments.comments}
          required
          onChange={handleChange}
        ></textarea>
        <label>Rating</label>
        <div className="star-rating">
          {stars.map((star) => (
            <span
              key={star}
              style={{
                color: star <= userComments.rating ? "gold" : "gray",
              }}
              onClick={() => handleRatingChange(star)}
            >
              {star <= userComments.rating ? (
                <FaStar color="gold" /> // filled star
              ) : (
                <FaRegStar color="gray" /> // empty star
              )}
            </span>
          ))}
        </div>
        <button type="submit">Skicka</button>
      </form>
    </div>
  );
};

export default UserComments;
