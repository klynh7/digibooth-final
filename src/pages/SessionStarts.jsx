import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SessionStart() {
  const navigate = useNavigate();  
  const videoRef = useRef(null);
  const intervalRef = useRef(null);
  const countdownRef = useRef(null);
  const streamRef =useRef(null);

  const [capturing, setCapturing] = useState(false);
  const [capturedImages, setCapturedImages] = useState([]);
  const [countdown, setCountdown] = useState(null);

  const maxPhotos = 4;

  useEffect(() => {
    if (streamRef.current) return;
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "user" } })
      .then((stream) => {
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch(() => alert("Camera access denied."));

    return () => {
      clearInterval(intervalRef.current);
      clearInterval(countdownRef.current);
      stopCamera();
    };
  }, []);

  const stopCamera = () => {
    const stream = streamRef.current;
      stream?.getTracks().forEach((track)=> track.stop());
      streamRef.current = null;
      if (videoRef.current) videoRef.current.srcObject = null;
  };


  const showCountdown = (seconds, callback) => {
    clearInterval(countdownRef.current);
    let counter = seconds;
    setCountdown(counter);

    countdownRef.current = setInterval(() => {
      counter -= 1;
      if (counter <= 0) {
        clearInterval(countdownRef.current);
        setCountdown(null);
        callback();
      } else {
        setCountdown(counter);
      }
    }, 1000);
  };

  const captureFrame = () => {
    if (!videoRef.current || capturedImages.length >= maxPhotos) return;

    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const videoRatio = video.videoWidth / video.videoHeight;
    const targetRatio = 4 / 3;

    let sWidth, sHeight, sx, sy;

    if (videoRatio > targetRatio) {
      sHeight = video.videoHeight;
      sWidth = video.videoHeight * targetRatio;
      sx = (video.videoWidth - sWidth) / 2;
      sy = 0;
    } else {
      sWidth = video.videoWidth;
      sHeight = video.videoWidth / targetRatio;
      sx = 0;
      sy = (video.videoHeight - sHeight) / 2;
    }

    canvas.width = sWidth;
    canvas.height = sHeight;

    ctx.drawImage(video, sx, sy, sWidth, sHeight, 0, 0, sWidth, sHeight);

    setCapturedImages((prev) => [...prev, canvas.toDataURL("image/png")]);
  };

  const startCapture = () => {
    clearInterval(intervalRef.current);
    setCapturedImages([]);
    setCapturing(true);

    intervalRef.current = setInterval(() => {
      showCountdown(3, captureFrame);
    }, 4000);

    showCountdown(3, captureFrame);
  };

  const stopCapture = () => {
    clearInterval(intervalRef.current);
    clearInterval(countdownRef.current);
    setCapturing(false);
    setCountdown(null);
  };

  useEffect(() => {
    if (capturedImages.length === maxPhotos) {
      stopCapture();
      stopCamera();
    }
  }, [capturedImages]);

  const goNext = () => {
    stopCamera();
    sessionStorage.setItem("photoboothImages", JSON.stringify(capturedImages));
    navigate('/frame-l')
  };

  return (
    <div className="app-container">
      <div className="preview-section">
        <video ref={videoRef} autoPlay playsInline />

        {countdown && <div className="countdown-overlay">{countdown}</div>}

        {capturing && capturedImages.length < maxPhotos && (
          <div className="photo-progress">
            {capturedImages.length + 1}/{maxPhotos}
          </div>
        )}

        <div className="controls">
          {!capturing && capturedImages.length === 0 && (
            <button className="capture-btn" onClick={startCapture}>
              Capture
            </button>
          )}

          {capturing && (
            <button className="stop-btn" onClick={stopCapture}>
              Stop Auto Capture
            </button>
          )}

          {capturedImages.length === maxPhotos && (
            <button className="next-btn" onClick={goNext}>
              Next
            </button>
          )}
        </div>
      </div>

      <div className="photo-strip">
        {capturedImages.map((src, i) => (
          <img key={i} src={src} alt={`capture-${i}`} />
        ))}
      </div>
    </div>
  );
}
