import React from 'react'

const CallModal = () => {
  return (
    <div className='fixed h-screen w-screen z-30'>
      <div className='h-full w-full' />
      <div className='absolute top-0 w-screen flex justify-center z-40 pt-6'>
        <div className='flex flex-col gap-5 bg-white p-4 rounded-lg shadow-xl border-[1px] border-solid border-gray-400'>
          <p className='m-0 p-0 font-intermedium text-lg'>Allow this site to open the tel link?</p>
          <p className='font-inter m-0 p-0'>You'll need to choose an application</p>
          <div className='flex items-center gap-1'>
            <input type="checkbox" name="" id="" />
            <p className='p-0 m-0'>Always allow https://creedlance.com to open tel links</p>
          </div>
          <div className='flex items-center gap-2 justify-end'>
            <a href='tel:+2340909000000' className='p-2 bg-gray-100 rounded text-sm text-gray-800'>Choose Application</a>
            <a href='tel:+2340909000000' className='p-2 bg-gray-100 rounded text-sm text-gray-800'>Cancel</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CallModal