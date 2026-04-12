import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './styles/sidebar-style.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navLinkClass = ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link');

  return (
    <>
      <button className="menu-btn" onClick={toggleSidebar}>☰</button>
      
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <ul>
          <li><NavLink to="/" onClick={toggleSidebar} className={navLinkClass}>Home</NavLink></li>
          <hr />
          <li><NavLink to="/about" onClick={toggleSidebar} className={navLinkClass}>About Us</NavLink></li>
          <hr />
          <li><NavLink to="/privacy" onClick={toggleSidebar} className={navLinkClass}>Privacy Policy</NavLink></li>
          <hr />
          <li><NavLink to="/faq" onClick={toggleSidebar} className={navLinkClass}>FaQs</NavLink></li>
          <hr />
          <li><NavLink to="/contact" onClick={toggleSidebar} className={navLinkClass}>Contact Us</NavLink></li>
          <hr />
          <li><NavLink to="/reviews" onClick={toggleSidebar} className={navLinkClass}>Reviews</NavLink></li>
          <hr />
          <li><NavLink to="/spotlight" onClick={toggleSidebar} className={navLinkClass}>Spotlight</NavLink></li>
          <hr />
          <li><NavLink to="/history" onClick={toggleSidebar} className={navLinkClass}>History</NavLink></li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;