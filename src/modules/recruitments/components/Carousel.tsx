'use client';

import React from 'react';
import Slider from 'react-slick';
import { styled } from '@mui/material';

const SliderWrapper = styled(Slider)(({ theme }) => ({
  height: '40vh',
  transform: 'translate(0, -1rem)',
  '& .slick-list': {
    height: '40vh',
  },
}));

const ImageWrapper = styled('div')(({ theme }) => ({
  height: '40vh',
  width: '100%',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));

const Carousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: 'linear',
  };

  return (
    <div style={{ width: '100%', height: '40vh' }}>
      <SliderWrapper {...settings}>
        <ImageWrapper>
          <img
            className="object-cover"
            src="https://bka.hcmut.edu.vn/FileManager/Download/?filename=%5cimage_upload%5c4a20a936-360b-4769-9a70-f5687925ebe5.jpg"
            alt="test"
          />
        </ImageWrapper>
        <ImageWrapper>
          <img
            className="object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFkZ-OWEv8IfKBqCJSWZrbt01GboH_JPdRmmLb84IZ4STKQZEyYxSwgEHsk32Dyjeck4Q&usqp=CAU"
            alt="test"
          />
        </ImageWrapper>
      </SliderWrapper>
    </div>
  );
};

export default Carousel;
