import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
 // Erstellen Sie diese CSS-Datei, um das Styling zu definieren

const Slideshow = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentIndex(nextIndex);
    }, 3000); // Wechsel alle 3 Sekunden (3000 Millisekunden)

    return () => clearInterval(interval);
  }, [currentIndex, images]);

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
  };

  return (
    <div className="slideshow-container ">
      <Carousel selectedItem={currentIndex} showArrows={false} showStatus={false} showThumbs={false}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Carousel>
        <button className='b1' id='bb' onClick={handlePrev}> &#10094;</button>
        <button className='b2' id='bb' onClick={handleNext}>&#10095;</button>
    </div>
  );
};

export default Slideshow;