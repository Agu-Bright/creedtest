import React from 'react'
import { Pagination } from '@mui/material'
import { Grid } from '../../Dashboards/browse/Grid'

export const SimilarServices = () => {
  return (
    <div className='bg-white mt-2 lg:p-6 lg:pb-3'>
      <h2 className='m-0 p-0 text-xl mb-3 px-2 pt-2 font-inter lg:p-0'>Similar Services</h2>
      <Grid />
      {/* <Pagination count={10} /> */}
    </div>
  )
}

