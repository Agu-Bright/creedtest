import React from 'react'
import Nav from './components/nav/Nav'
import Footer from '../../components/Footer/Footer'
import projectsImage from '../../assets/browse/projects.gif'
import workersImage from '../../assets/browse/workers.gif'
import interviewsImage from '../../assets/browse/interviews.gif'
import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

const BrowseJobs = () => {
  return (
    <div className='bg-[#ddd]'>
      <Nav />
      <div className='pb-4 lg:pb-14'>
        <h1 className='text-black text-xl text-center lg:text-3xl xl:text-4xl font-inter mb-8 mt-8 lg:mb-14 lg:mt-10'>What are you searching for ?</h1>
        <div className='flex flex-col lg:flex-row items-center justify-center gap-4 px-4 flex-wrap max-w-[1200px] xl:mx-auto'>
          <Link to='/browse/projects' className='p-4 lg:px-6 flex gap-x-3 bg-white items-center lg:flex-[0.35] w-full lg:min-w-[40%] box-border border hover:border-primary-500 border-solid border-transparent transition duration-200'>
            <div className='flex-1 text-black min-w-fit'>
              <p className='text-xl font-intersemibold lg:text-3xl lg:font-intermedium lg:gap-x-8'>Projects</p>
              <p className=''>One off jobs and tasks</p>
              <p className='text-[#daa520] flex items-center gap-x-1'>See all projects <ArrowRightIcon className='h-6' /></p>
            </div>
            <div className='flex-1 h-32 lg:h-52'>
              <img src={projectsImage} className='w-full h-full object-contain' alt="" />
            </div>
          </Link>
          <Link to='/browse/interviews' className='p-4 lg:px-6 flex gap-x-3 bg-white items-center lg:flex-[0.35] w-full lg:min-w-[40%] box-border border hover:border-primary-500 border-solid border-transparent transition duration-200'>
            <div className='flex-1 text-black min-w-fit'>
              <p className='text-xl font-intersemibold lg:text-3xl lg:font-intermedium lg:gap-x-8'>Interviews</p>
              <p className=''>Monthly payment jobs</p>
              <p className='text-[#daa520] flex items-center gap-x-1'>See all interviews <ArrowRightIcon className='h-6' /></p>
            </div>
            <div className='flex-1 h-32 lg:h-52'>
              <img src={interviewsImage} className='w-full h-full object-contain' alt="" />
            </div>
          </Link>
          <Link to='/browse/workers' className='p-4 lg:px-6 flex gap-x-3 bg-white items-center lg:flex-[0.35] w-full lg:min-w-[45%] box-border border hover:border-primary-500 border-solid border-transparent transition duration-200'>
            <div className='flex-1 text-black min-w-fit'>
              <p className='text-xl font-intersemibold lg:text-3xl lg:font-intermedium lg:gap-x-8'>Workers</p>
              <p className='max-w-[80%]'>Are you an employer? <br /> searching for workers, this is for you</p>
              <p className='text-[#daa520] flex items-center gap-x-1'>See all workers <ArrowRightIcon className='h-6' /></p>
            </div>
            <div className='flex-1 h-32 lg:h-52'>
              <img src={workersImage} className='w-full h-full object-contain' alt="" />
            </div>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default BrowseJobs