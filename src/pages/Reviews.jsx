import '../styles/style.css'
import { Link } from 'react-router-dom';

const Reviews = () => {
  return (
    <>
      This is the Reviews page. work in progress
      <Link 
        to="/write-review" 
        className="font-bold hover:underline font-bold transition-all duration-200"
      >
        Write a Review
      </Link>
    </>
  );
};

export default Reviews;