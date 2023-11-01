import React from 'react'
import {
  ArrowLeftIcon,
  EllipsisHorizontalIcon
} from "@heroicons/react/24/solid";
import './TopBar.css'

const TopBar = ({handleBack, title, handleMore}) => {
  return (
    <div className='flex items-center justify-center h-12 sm:h-14 md:h-16 lg:h-12 media__modal__top__bar'>
      <div className="flex justify-between items-center w-[95%]">
        <ArrowLeftIcon className='h-6 text-white sm:h-8 md:h-10 lg:text-black lg:h-8' onClick={handleBack} />
        <p className='text-white font-inter text-sm overflow-hidden whitespace-nowrap text-ellipsis max-w-[65%] sm:text-base title capitalize lg:text-black'>{title}</p>
        <EllipsisHorizontalIcon className={`h-6 lg:h-8 ${handleMore ? 'text-white lg:text-black' : 'text-transparent'}`} />
      </div>
    </div>
  )
}

export default TopBar