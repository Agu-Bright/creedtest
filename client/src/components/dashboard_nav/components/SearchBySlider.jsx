import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const SearchBySlider = ({handleDrag, setShowSearch}) => {
  return (
    <motion.div
        key='search__by'
        className='search__by'
        // initial={{ opacity: 0 }}
        // animate={{ opacity: [0, 1] }}
        // exit={{opacity: 0}}
    >
        <div className="dismiss__overlay" onClick={() => setShowSearch(false)}></div>
        <motion.div 
            className="search__by__container"
            drag='y'
            dragConstraints={{ top: 0, bottom: 100 }}
            dragElastic={{
                // top: 0,
                bottom: 0.5
            }}
            dragSnapToOrigin
            onDragEnd={handleDrag}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{y: "100%"}}
            transition={{type: 'none'}}
        >
            <div className="drag__handle"></div>
            <div className="content">
                <h3>Search by type</h3>
                <p>Browse for workers, projects, interviews or services</p>
                <div className="links">
                    <Link 
                        to='/dashboard/browse/workers'
                        onClick={() => setTimeout(() => setShowSearch(false), 300)}
                    >
                        Workers
                    </Link>
                    <Link 
                        to='/dashboard/browse/projects'
                        onClick={() => setTimeout(() => setShowSearch(false), 300)}
                    >
                        Projects
                    </Link>
                    <Link 
                        to='/dashboard/browse/interviews'
                        onClick={() => setTimeout(() => setShowSearch(false), 300)}
                    >
                        Interviews
                    </Link>
                    <Link 
                        to='/dashboard/browse/services'
                        onClick={() => setTimeout(() => setShowSearch(false), 300)}
                    >
                        Services
                    </Link>
                </div>
            </div>
        </motion.div>
    </motion.div>
  )
}

export default SearchBySlider