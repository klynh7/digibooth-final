import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/style.css'


const FrameL = () => {
  const [selectedLayout, setSelectedLayout] = useState(null);
  const selectedColor = "#333333";
  const navigate = useNavigate();

  const handleSelect = (layout) => {
    setSelectedLayout(layout);
  };

  const handleNext = () => {
    if (!selectedLayout) return;

    sessionStorage.setItem("chosenLayout", selectedLayout);
    sessionStorage.setItem("chosenColor", selectedColor);
    navigate('/frame-c');
  };

  return (
    <div className="container">
      <div className="box">
        <h1>1. Choose Your Frame</h1>

        <div className="layout-selection">
          <div
            className={`layout-preview strip-v ${selectedLayout === "strip-v" ? "selected" : ""
              }`}
            onClick={() => handleSelect("strip-v")}
          >
            <div className="photo-hole" />
            <div className="photo-hole" />
            <div className="photo-hole" />
            <div className="photo-hole" />
          </div>

          <div
            className={`layout-preview strip-3 ${selectedLayout === "strip-3-pose" ? "selected" : ""
              }`}
            onClick={() => handleSelect("strip-3-pose")}
          >
            <div className="photo-hole" />
            <div className="photo-hole" />
            <div className="photo-hole" />
          </div>
        </div>

        <button onClick={handleNext} disabled={!selectedLayout}>
          Next
        </button>
      </div>
    </div>
  );
};

export default FrameL;