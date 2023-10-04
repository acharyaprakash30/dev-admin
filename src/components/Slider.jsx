import React from 'react';
import { FaLaptopHouse } from 'react-icons/fa';
import Slider from 'react-slick';
import { Card, Image, Skeleton } from 'antd';
import { Label } from 'reactstrap';
import ProductImg from '../assets/images/ecommerce/banner.jpg';
import {fileURLReader} from '../utils/index';

export const SimpleSlider = ({ items,type,setter }) => {
  const settings = {
    dots: FaLaptopHouse,
    autoplay: false,
    infinte: false,
    speed: 300,
    slidesToShow: 7,
    slidesToScroll: 1,
    centerMode: true,
    dots: false,
    
    responsive: [
      {
        breakpoint: 1160,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1078,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 730,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 2,
          dots:false
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
          dots:false
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          dots:false

        },
      },
    ],
  };
  return (
    <div>
      {items?.length ? (
        <Slider {...settings}>
          {type === "images" && items?.map((data) => (
            <div className="d-flex flex-column carouselItem  justify-content-center align-items-center">
              <Image
                preview={false}
                height={'180px'}
                src={
                  data?.images[0]
                    ? fileURLReader(data?.images[0]?.url)
                    : ProductImg
                }
              ></Image>
              <p className="mt-2 px-2">{data?.name}</p>
              <p>Nrs {data?.salePrice}</p>
            </div>
          ))}
          {type === "vendor" && items?.length > 0 &&  items?.map((data,i) => (
            <div className="d-flex flex-column vendor-carouselItem relative   justify-content-center align-items-center">
              <Image
                preview={false}
                height={'110px'}
                width="110px"
                src={
                  data?.avatar
                    ? fileURLReader(data?.avatar)
                    : ProductImg
                }
              ></Image>
              <div className='countVendor'>{data?.orderCount}</div>
              <p onClick={()=>setter(data.id) } className=" px-2 text-center">{data?.name.toUpperCase()}</p>
            </div>
          ))}
        </Slider>
      ) : (
        <div>
          <Skeleton active />
        </div>
      )}
    </div>
  );
};

export default SimpleSlider;
