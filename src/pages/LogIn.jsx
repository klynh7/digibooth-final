import '../styles/style.css'
import { Link } from 'react-router-dom';

const LogIn = () => {
  return (
    <>
      This is the Log In page. work in progress
      <Link 
        to="/sign-up" 
        className="font-bold hover:underline transition-all duration-200"
      >
        Sign Up Here
      </Link>
    </>
  );
};

export default LogIn;