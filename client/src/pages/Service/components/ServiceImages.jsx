import React, { useState, Fragment, useEffect } from 'react'
import { img1, img6 } from "../../../assets/mike";
import { 
  CameraIcon,
  ChevronLeftIcon,
  ChevronRightIcon 
} from '@heroicons/react/24/outline';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Dialog, Transition } from "@headlessui/react";
import MediaModal from '../../Dashboards/components/MediaModal';

const ServicesImages = ({service}) => {
  const [swiper, setSwiper] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
	const [swipe2, setSwipe2] = useState();
	function closeModal() {
		setIsOpen(false);
	}
	function openModal() {
		setIsOpen(true);
	}


  const PrevButton = () => {
    const goBack = () => {
      if(swiper){
        swiper.slidePrev()
      }
    }

    return (
      <button className='bg-transparent h-full absolute w-14 left-0 cursor-pointer flex items-center justify-center z-[2] top-0 border-none' onClick={goBack}>
        <ChevronLeftIcon className='text-white h-10 w-10' />
      </button>
    )
  }

  const NextButton = () => {
    const goForward = () => {
      if(swiper) {
         swiper.slideNext()
      }
    }

    return (
      <button className='bg-transparent h-full absolute w-14 right-0 cursor-pointer flex items-center justify-center z-[2] top-0 border-none' onClick={goForward}>
        <ChevronRightIcon className='text-white h-10 w-10' />
      </button>
    )
  }

  return (
    <Fragment>
      <div className='bg-white'>
        <div className='relative h-[35vh] lg:h-[60vh]'>
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            // speed={100}
            onSwiper={(swiper) => setSwiper(swiper)}
            onSlideChange={(swiper) => setSlideIndex(swiper.activeIndex)}
          >
            {service?.photos?.map((image, i) => (
              <SwiperSlide key={i} onClick={openModal}>
                <img src={image?.url} alt="job" className='w-full h-[35vh] object-cover lg:h-[60vh]' />
              </SwiperSlide>
            ))}
          </Swiper>
          <span className='absolute bottom-4 left-4 text-white z-[1] flex items-center gap-1 text-sm bg-black bg-opacity-40 p-1 rounded-md'>
            <CameraIcon className='h-4 w-4' />
            {slideIndex + 1}/{service?.photos?.length}
          </span>
          <PrevButton />
          <NextButton />
        </div>
        <div className='flex gap-2 mt-2 mb-0 box-border' style={{marginBottom: 0}}>
          {service?.photos?.slice(0, 5).map((image, i) => {
            return (
              <div className='flex-[0.20] h-[4.5rem] relative lg:h-[8rem]' key={i} onClick={openModal}>
                <img src={image?.url} alt="" className='h-full w-full object-cover' />
                {i === 4 && (
                  <div className='bg-black z-[2] absolute inset-0 bg-opacity-50 flex flex-col justify-center h-full w-full items-center'>
                    <span className='text-white text-2xl font-inter'>+{service?.photos?.length - 5}</span>
                    <span className='text-sm text-white font-inter -mt-2'>images</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
      {/* <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div id="mike" className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full  items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={
                  "bg-white p-6 overflow-hidden rounded-2xl w-max h-max relative"
                }
              >
                <div
                  onClick={() => swipe2.slidePrev()}
                  className="absolute cursor-pointer top-1/2 left-8 z-30 p-2 rounded-full bg-zinc-500/50 text-white"
                >
                  <ChevronLeftIcon className="h-6" />
                </div>
                <div
                  onClick={() => swipe2.slideNext()}
                  className="absolute cursor-pointer top-1/2 right-8 z-30 p-2 rounded-full bg-zinc-500/50 text-white"
                >
                  <ChevronRightIcon className="h-6" />
                </div>
                <Swiper
                  onSwiper={(swiper) => setSwipe2(swiper)}
                  className=" max-w-2xl"
                  spaceBetween={40}
                >
                  {[1, 2, 3].map(() => (
                    <SwiperSlide style={{ width: "max-content" }}>
                      <img
                        as="img"
                        src={img6}
                        style={{ maxHeight: "70vh" }}
                        className="w-max object-contain rounded transform text-left align-middle shadow-xl transition-all"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition> */}
      {isOpen && <MediaModal isPost={false} handleBack={() => setIsOpen(false)} files={[...service?.photos?.map(img => ({
        type: 'image',
        url: img.url
      }))]} />}
    </Fragment>
  )
}

export default ServicesImages