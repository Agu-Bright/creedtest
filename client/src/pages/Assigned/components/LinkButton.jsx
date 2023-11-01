import React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowTopRightOnSquareIcon
} from "@heroicons/react/24/solid";

const LinkButton = (props) => {
  return (
    <div className='pt-3 pb-[7px] flex gap-x-2 px-2 m-0 main__tab__link'>
      <Link to='/posted/projects' style={{marginBottom: 0}} className='bg-white text-sm flex-1 text-primary-500 text-center pt-3 pb-3 rounded flex items-center gap-2 justify-center m-0'>
        Posted Projects
        <ArrowTopRightOnSquareIcon className='h-4' />
      </Link>
      <Link to='/posted/interviews' style={{marginBottom: 0}} className='bg-white text-sm flex-1 text-primary-500 text-center pt-3 pb-3 rounded flex items-center gap-2 justify-center m-0'>
        Posted Interviews
        <ArrowTopRightOnSquareIcon className='h-4' />
      </Link>
    </div>
  )
}

export default LinkButton