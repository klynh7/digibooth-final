import { Link, useNavigate } from 'react-router-dom';
import '../styles/style.css'

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
    <Link to="/log-in" className="login-link">Log In</Link>


    <div className="intro-text">
      <h1>Welcome to Digibooth</h1>
      <p>Influenced by our love of photobooths, this website is your personal photobooth at home!</p>
      <p>Click start to begin your session!</p>
      
      <button 
        className="start-btn" 
        onClick={() => navigate('/session-starts')}
      >
        Start Session
      </button>
      
      <p>You will get to take 4 pics per session, 3 seconds for every pic.</p>
    </div>
    </>
    
  );
};

export default Home;