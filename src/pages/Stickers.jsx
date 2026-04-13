import { useEffect, useRef, useState } from 'react';
import Konva from 'konva';
import { useNavigate } from 'react-router-dom';
import '../styles/style.css';

function StickerItem({ src, onAdd }) {
  return (
    <img 
      src={src} 
      className="sticker" 
      alt="decoration"
      onClick={onAdd}
    />
  );
};

function Sticker() {
  const navigate = useNavigate();
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const stageRef = useRef(null);
  const layerRef = useRef(null);
  const trRef = useRef(null);
  const stickerGroupRef = useRef(null);
  const selectedNodeRef = useRef(null); 

  useEffect(() => {
    const photosJSON = sessionStorage.getItem("photoboothImages");
    const capturedPhotos = photosJSON ? JSON.parse(photosJSON) : []; 
    const chosenLayout = sessionStorage.getItem("chosenLayout") || 'strip-v';
    const chosenColor = sessionStorage.getItem("chosenColor") || '#333333';

    const editorSide = document.getElementById('editor-side');
    const VISUAL_WIDTH = editorSide ? editorSide.clientWidth : 350;
    
    const padding = 20;
    const holeWidth = VISUAL_WIDTH - (padding * 2);
    const holeHeight = holeWidth * (3 / 4);
    
    let photoLimit = (chosenLayout === 'strip-3-pose') ? 3 : 4;
    
    const gap = 15;
    const STAGE_HEIGHT = (holeHeight * photoLimit) + (gap * (photoLimit - 1)) + (padding * 2);
    const STAGE_WIDTH = VISUAL_WIDTH;

    const stage = new Konva.Stage({
      container: 'konva-stage',
      width: STAGE_WIDTH,
      height: STAGE_HEIGHT,
    });
    
    const layer = new Konva.Layer();
    stage.add(layer);

    const frameGroup = new Konva.Group();
    const photoGroup = new Konva.Group();
    const stickerGroup = new Konva.Group();
    layer.add(frameGroup, photoGroup, stickerGroup);

    stageRef.current = stage;
    layerRef.current = layer;
    stickerGroupRef.current = stickerGroup;

    const frameBg = new Konva.Rect({
      x: 0, y: 0, width: STAGE_WIDTH, height: STAGE_HEIGHT,
      fill: chosenColor, 
      shadowColor: 'black', shadowBlur: 10, shadowOpacity: 0.2
    });
    frameGroup.add(frameBg);

    capturedPhotos.forEach((photoSrc, index) => {
        if (index >= photoLimit) return;
        const yPos = padding + (index * (holeHeight + gap));
        
        Konva.Image.fromURL(photoSrc, (img) => {
            img.setAttrs({
                x: padding, y: yPos,
                width: holeWidth, height: holeHeight,
                name: 'photo'
            });
            photoGroup.add(img);
        });
    });

    const tr = new Konva.Transformer({
        keepRatio: true,
        enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
    });
    layer.add(tr);
    trRef.current = tr;

    stage.on('click tap', (e) => {
        if (e.target === stage || e.target.hasName('frameElement') || e.target.hasName('photo')) {
            tr.nodes([]);
            selectedNodeRef.current = null;
            setShowDeleteBtn(false);
        }
    });

    return () => {
        stage.destroy();
    };
  }, []); 


  const addSticker = (e) => {
    const src = e.target.src;
    const stage = stageRef.current;
    
    const STICKER_SIZE = stage.width() / 5.5;

    Konva.Image.fromURL(src, (img) => {
        img.setAttrs({
            x: (stage.width() / 2) - (STICKER_SIZE / 2),
            y: (stage.height() / 2) - (STICKER_SIZE / 2),
            width: STICKER_SIZE,
            height: STICKER_SIZE,
            draggable: true,
            name: 'sticker'
        });
        
        stickerGroupRef.current.add(img);
        
        img.on('click tap', () => {
            selectedNodeRef.current = img;
            trRef.current.nodes([img]);
            trRef.current.moveToTop();
            img.moveToTop();
            setShowDeleteBtn(true);
        });

        selectedNodeRef.current = img;
        trRef.current.nodes([img]);
        setShowDeleteBtn(true);
    });
  };

  const handleDelete = () => {
    if (selectedNodeRef.current) {
        selectedNodeRef.current.destroy();
        trRef.current.nodes([]);
        selectedNodeRef.current = null;
        setShowDeleteBtn(false);
        layerRef.current.draw();
    }
  };

  const handleFinish = () => {
    trRef.current.nodes([]);
    setShowDeleteBtn(false);
    
    const uri = stageRef.current.toDataURL({ pixelRatio: 2 });
    setPreviewImage(uri); 
    setModalOpen(true);
  };

  const handleDownload = () => {
    if (previewImage) {
        const link = document.createElement('a');
        link.href = previewImage;
        link.download = 'my-photostrip.png';
        link.click();
    }
  };

  const handleDone = () => {
    navigate('/session-end');
  };


  return (
    <div className="sticker-page">
      <h1>3. Decorate Your Strip</h1>

      <div className="editor-layout">
        
        <div id="editor-side">
          <div id="konva-stage"></div>
          
          <div className="editor-controls">
            <button id="finish-btn" onClick={handleFinish}>Finish</button>
            {showDeleteBtn && (
                <button id="delete-btn" onClick={handleDelete}>Delete</button>
            )}
          </div>
        </div>

        <div id="palette-side">
          <h3>Stickers</h3>
          <div className="palette-items">
            <StickerItem src={`${import.meta.env.BASE_URL}stickers/animal.png`} onAdd={addSticker} />
            <StickerItem src={`${import.meta.env.BASE_URL}stickers/cars.png`} onAdd={addSticker} />
            <StickerItem src={`${import.meta.env.BASE_URL}stickers/love.png`} onAdd={addSticker} />
            <StickerItem src={`${import.meta.env.BASE_URL}stickers/paper_plane.png`} onAdd={addSticker} />
            <StickerItem src={`${import.meta.env.BASE_URL}stickers/rainbow.png`} onAdd={addSticker} />
            <StickerItem src={`${import.meta.env.BASE_URL}stickers/stars.png`} onAdd={addSticker} />
            <StickerItem src={`${import.meta.env.BASE_URL}stickers/stars2.png`} onAdd={addSticker} />
            <StickerItem src={`${import.meta.env.BASE_URL}stickers/sun.png`} onAdd={addSticker} />
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Your Final Photostrip</h2>
                <img src={previewImage} alt="Final Result" className="preview-img" />
                
                <div className="modal-buttons">
                    <button id="modal-close-btn" onClick={() => setModalOpen(false)}>Close</button>
                    <button id="modal-download-btn" onClick={handleDownload}>Download</button>
                    <button id="modal-done-btn" onClick={handleDone}>Done</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}

export default Sticker;