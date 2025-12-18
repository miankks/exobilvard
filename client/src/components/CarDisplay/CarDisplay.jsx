import { useContext, useEffect, useState } from 'react'
import './CarDisplay.css'
import CarItem from '../CarItem/CarItem'
import { Link } from 'react-router-dom'
import { FaStar, FaRegStar  } from "react-icons/fa";
import { CommentContext } from '../../context/CommentContext'
import { CarContext } from '../../context/CarContext';
import MobileOnlyText from '../MobileOnlyText/MobileOnlyText';



// import { useObjectEnabled } from '../../Customhooks/useObjectEnabled'

const CarDisplay = ({ category }) => {
    const [isMobile, setIsMobile] = useState(false)
    const { userComments } = useContext(CommentContext);
    const { car_list} = useContext(CarContext);
    const totalStars = 5;

    const handleStars = (rating) => {
      return Array.from({ length: totalStars }, (_, i) => {
        const starNumber = i + 1;
        return starNumber <= rating ? (
          <FaStar key={i} color="gold" />
          ) : (
          <FaRegStar key={i} color="gray" />
        );
      });
    };

    useEffect(() => {
      const HandleResize = () => {setIsMobile(window.innerWidth < 701)};
      HandleResize();
      window.addEventListener('resize', HandleResize);
      return () => window.removeEventListener('resize', HandleResize);
    }, [])

  return ( 
    <div className='car-display' id='car-display'>
        <h2>Våra tjänster</h2>
        {/* mobile view */}
        {isMobile && (
          <MobileOnlyText category={category}/>
        )}

        {/* desktop view */}
        {/* DESKTOP VIEW */}
          {!isMobile && (
            <div className="car-display-list">
              {car_list.map((item, index) => {
                if (category === "All" || category === item.category) {
                  return (
                    <CarItem
                      key={index}
                      id={item._id}
                      name={item.name}
                      description={item.description}
                      image={item.image}
                    />
                  );
                }
                return null;
              })}
            </div>
          )}
          <div className='cart-button-section'>
            <Link to='/cart' className='btn'>
              Proceed to cart
            </Link>
          </div>

          <div className='comment-section'>
            <p>Lämna in en kommentar till Exobilvårdscenter</p>
            <Link to='/usercomments' className='btn'>
              till komment
            </Link>
          </div>
        { userComments &&
          <div className="marquee-container">
            <div className="marquee">
                {userComments.map((comment, index) => (
                    <div className="card" key={index}>
                      <h4>"{comment.name}"</h4>
                      <p>{comment.comments}</p>
                      <div className="stars">
                        {handleStars(comment.rating)}
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        }
    </div>
  )
}

export default CarDisplay
