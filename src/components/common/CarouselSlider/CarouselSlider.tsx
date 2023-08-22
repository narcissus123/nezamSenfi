import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import "./CarouselSlider.scss"
import { Carousel } from 'react-responsive-carousel';

export interface IPropsType {
  images: any

}

const CarouselSlider: React.FC<IPropsType> = ({ images }) => {
  console.log('images---',images);
  
  return (
    <div style={{ direction: "initial" }}>
      <Carousel showArrows={true} swipeable={true} infiniteLoop  >
        {images.map((row: any, key: any) => {
          return (
            <div key={key}>
              <img src={row} alt="تصویر" />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
 
export { CarouselSlider }