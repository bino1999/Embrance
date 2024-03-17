import React, { useState, useEffect } from 'react';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';

export default function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0); // State to track active slide index

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []); // Empty dependency array ensures effect runs only once on mount

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  // Define your slides data
  const slides = [
    { id: 1, imageUrl: img1, caption: 'Slide 1' },
    { id: 2, imageUrl: img2, caption: 'Slide 2' },
    { id: 3, imageUrl: img3, caption: 'Slide 3' },
  ];

  return (
    <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel" style={{ margin: '10px', height: '400px', overflow: 'hidden' }}>
      <div className="carousel-inner" style={{ height: '100%' }}>
        {slides.map((slide, index) => (
          <div key={slide.id} className={`carousel-item ${index === activeIndex ? 'active' : ''}`} style={{ height: '100%' }}>
            <img src={slide.imageUrl} className="d-block w-100" alt={`Slide ${slide.id}`} style={{ height: '100%', objectFit: 'cover' }} />
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" onClick={handlePrev}>
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" onClick={handleNext}>
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
