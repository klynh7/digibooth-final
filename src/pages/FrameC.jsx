import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/style.css';

const FrameC = () => {
  const navigate = useNavigate();
  
  const [photos, setPhotos] = useState([]);
  const [selectedColor, setSelectedColor] = useState('#333333');

  useEffect(() => {
    const photosJSON = sessionStorage.getItem("photoboothImages");
    if (photosJSON) {
      setPhotos(JSON.parse(photosJSON));
    } else {
      setPhotos(["https://via.placeholder.com/300x200", "https://via.placeholder.com/300x200", "https://via.placeholder.com/300x200"]);
    }

    const storedColor = sessionStorage.getItem("chosenColor");
    if (storedColor) {
      setSelectedColor(storedColor);
    }
  }, []);

  const handleNext = () => {
    sessionStorage.setItem("chosenColor", selectedColor);
    
    navigate('/stickers'); 
  };

  const colors = [
    { hex: '#333333', name: 'Dark Grey' },
    { hex: '#EFEFEF', name: 'White' },
    { hex: '#a6b78d', name: 'Olive Green' },
    { hex: '#fbf5e9', name: 'Cream' },
    { hex: '#FFB6C1', name: 'Light Pink' },
    { hex: '#ADD8E6', name: 'Light Blue' },
  ];

  return (
    <div className="colour-page"> 
      <h1>2. Choose Frame Color</h1>
      <div className="main-layout">
        <div id="photostrip-side">
          <div id="photostrip-container" style={{ backgroundColor: selectedColor }}>
            {photos.map((src, index) => (
              <img key={index} src={src} alt={`Pose ${index + 1}`} />
            ))}
          </div>
        </div>

        <div id="controls-side">
          <h3>Colors</h3>
          <div className="color-palette">
            {colors.map((c) => (
              <button
                key={c.hex}
                className={`color-button ${selectedColor === c.hex ? 'selected' : ''}`}
                style={{ backgroundColor: c.hex }}
                onClick={() => setSelectedColor(c.hex)}
              ></button>
            ))}
          </div>
          <button id="next-to-sticker-btn" onClick={handleNext}>
            Add Stickers
          </button>
        </div>
      </div>
    </div>
  );
};

export default FrameC;