import React from 'react'
import MobileFilterBar from '../../components/dashboard/MobileFilterBar';
import ResultBar from '../../components/dashboard/ResultBar';
import {Grid} from './Grid'
import './ServicesContainer.css'

const ServicesContainer = ({showFilter, searchValue, showAuthModal, filter,location}) => {
  return (
    <div className='browse__services'>
      <div className="browse__services__container">
        {/* Mobile filter bar */}
        <MobileFilterBar showFilter={showFilter} />

        {/* Result bar */}
        <ResultBar />

        {/* projects list */}
        {/* <div className="project__list">
          {data.map(project => (
            <ProjectCard 
              key={project.id}
              bid={project.bid}
              title={project.title}
              description={project.description}
            />
          ))}
        </div> */}
        <div className="services__list">
          <Grid searchValue={searchValue} filter={filter} showAuthModal={showAuthModal} location={location} />
        </div>
      </div>
    </div>
  )
}

export default ServicesContainer