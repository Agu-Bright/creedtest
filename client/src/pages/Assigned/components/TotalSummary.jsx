import React from 'react'

const backgroundStyle = {
  background: 'conic-gradient(from 180deg at 50% 50%, #FFFFFF 0deg, #FFFFFF 60.65deg, #FFF2AE 93.75deg, #FFEF9A 166.87deg, #FFFCEB 305.62deg, #FFFFFF 360deg)',
  filter: 'blur(0.8px)',
  backdropFilter: 'blur(2.09px)',
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  zIndex: 1
}

const gradientTextStyle = {
  background: 'linear-gradient(180deg, #76A0C0 39.06%, #02101B 100%)',
  webKitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent'
}

const TotalSummary = ({title, summary}) => {
  return (
    <div className='relative pt-3 pb-3 lg:mb-3 lg:py-4'>
      <div style={backgroundStyle} />
      <div className='z-[2] relative lg:flex lg:items-center lg:px-8'>
        <h1 className='text-base font-semibold m-0 text-center mb-2 lg:text-2xl'>{title}</h1>
        <div className='pl-3 pr-3 flex flex-col gap-1 lg:flex-row lg:items-center lg:flex-1 lg:justify-evenly'>
          {
            Object.entries(summary).map(sum => (
              <div className='flex justify-between items-center lg:flex-col-reverse'>
                <b className='text-sm'>{sum[0]}</b>
                <p style={gradientTextStyle} className='m-0 font-interbolder lg:text-2xl xl:text-3xl'>{sum[1]}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default TotalSummary