import React, { useState } from 'react'
import { img1, img6 } from "../../../assets/mike";
import { Link } from 'react-router-dom'
import { StarIcon } from '@heroicons/react/24/solid';
import { 
  StarIcon as StarIconOutline, 
  EyeIcon, 
  BookmarkIcon, 
  CameraIcon,
  ChevronLeftIcon,
  ChevronRightIcon 
} from '@heroicons/react/24/outline';
import { Swiper, SwiperSlide } from 'swiper/react'
import ServicesImages from './ServiceImages';
import ContactMobile from './ContactMobile';
import ServiceDescription from './ServiceDescription';
import { SimilarServices } from './SimilarServices';

const Details = ({service}) => {
  return (
    <div className='lg:w-full lg:bg-white'>
      {service?.photos?.length>0&&<ServicesImages service={service} />}
      
      <ContactMobile service={service}  />
      <ServiceDescription service={service} />
      <SimilarServices />
    </div>
  )
}

export default Details