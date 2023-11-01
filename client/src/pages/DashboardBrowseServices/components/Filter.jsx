import React, { useRef, useEffect, useState } from 'react'
import './Filter.css'
import StarIcon from "@mui/icons-material/Star";
import { motion, useDragControls } from "framer-motion"
import PickCategory from '../../../components/common/PickCategory'
import styled from 'styled-components'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
// import { categoryData } from '../components/PickCategory/data'

const Filter = ({ hide, isKeyboardVisible, setFixTab }) => {
  const formRef = useRef();
  const filterRef = useRef();
  const renderCount = useRef(0);
  const [justifyContent, setJustifyContent] = useState('');
  const [selectedJobCategory, setSelectedJobCategory] = useState('Web design');
  const [selectedSubCategory, setSelectedSubCategory] = useState('Wordpress development');
  const [showPickCategory, setShowPickCategory] = useState(false);
  const [showPickSubCategory, setShowPickSubCategory] = useState(false);

  const makeSticky = () => {
    if (window.innerWidth >= 769){
      if (document.querySelector("html").scrollTop >= 458){
        filterRef.current.style.position = "fixed"
        filterRef.current.style.top = "1rem"
        filterRef.current.style.overflow = "auto" // window.innerHeight >= 940 ? "hidden" : "auto"
        filterRef.current.style.height = "fit-content"
        filterRef.current.style.width = "25%"
        filterRef.current.style.maxWidth = "322px"
        filterRef.current.style.maxHeight = "95vh"
        filterRef.current.style.zIndex = 10
        filterRef.current.style.left = window.innerWidth < 900 ? "0" : window.innerWidth < 1000 ? "0" : window.innerWidth < 1073 ? "0" : window.innerWidth < 1200 ? "0" : window.innerWidth < 1400 ? `${(window.innerWidth - 1215) / 2}px` : window.innerWidth < 2000 ? `${(window.innerWidth - 1215) / 2}px` : `${(window.innerWidth - 1222) / 2}px`
        // formRef.current.style.paddingTop = '1rem'
      }else{
        filterRef.current.style.position = "static"
      }
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", makeSticky);

    return () => {
      window.removeEventListener("scroll", makeSticky)
    }
  }, [])

  useEffect(() => {
    window.addEventListener("resize", makeSticky);

    return () => {
      window.removeEventListener("resize", makeSticky)
    }
  }, [])
  
  const handleDrag = (e, info) => {
    if(info.offset.y > 100) {
      setJustifyContent('flex-end')
      setFixTab(false)
      hide()
    }
  }

  const dragControls = useDragControls();

  const onDragStart = (event, info) => {
    if (!event.target.classList.contains("no-drag")) {
      dragControls.start(event);
    } else {
      dragControls.componentControls.forEach((entry) => {
        entry.stop(event, info);
      });
    }
  };

  // useEffect(() => {
  //   const inputList = document.querySelectorAll('.dashboard-filter input[type="number"]');
  //   inputList.forEach(input => {
  //     if(window.innerWidth <= 650) {
  //       input.addEventListener('focus', () => {
  //         setMarginBottom('-60px')
  //       })
  //     }
  //   })

  //   return () => inputList.forEach(input => input.removeEventListener('focus', () => {}))
  // }, [])

  useEffect(() => {
    renderCount.current = renderCount.current + 1
    formRef.current.focus()
  })

  useEffect(()=>{
    if(renderCount.current > 2) {
      if(window.innerWidth <= 650) {
        setJustifyContent('flex-end')
        if(isKeyboardVisible) {
          // setMarginBottom('60px')
        }else {
          setFixTab(false)
        } 
      }
    }
  }, [isKeyboardVisible])

  return (
    <React.Fragment>
      <Container
        ref={filterRef}
        as={motion.div} 
        className='dashboard-filter-overlay'
        // initial={{ y: "100%" }}
        // animate={{ y: "0%" }}
        // exit={{y: "100%"}}
      >
        <motion.div 
          className="dashboard-filter"
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{y: "100%"}}
          transition={{ type: 'none' }}
          drag='y'
          dragDirectionLock
          dragConstraints={{ top: 0, bottom: 100 }}
          dragElastic={{
              // top: 0,
              bottom: 0.5
          }}
          dragSnapToOrigin
          dragControls={dragControls}
          onPointerDown={onDragStart}
          onDragEnd={handleDrag}

          style={{
            justifyContent: justifyContent,
            // marginBottom
          }}
        >
          <div 
            className="drag-handle"
          ></div>
            <motion.form 
              dragListener={false}
              className='no-drag relative'
              ref={formRef}
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="form-header">
                <h3>Filters</h3>
                {/* <CloseIcon onClick={hide} /> */}
              </div>
              <div className="form-body no-drag">

                {/* Project type */}
                <div className="filter no-drag">
                  <div className="filter-top no-drag">
                    <h4>Project type</h4>
                    <button>Clear</button>
                  </div>
                  <div className="checkbox no-drag">
                    <input type="checkbox" />
                    <span>Fixed price</span>
                  </div>
                  <div className="checkbox no-drag">
                    <input type="checkbox" />
                    <span>Hourly price</span>
                  </div>
                </div>

                {/* Job type */}
                <div className="filter no-drag job__type">
                  <div className="filter-top no-drag">
                    <h4>Job type</h4>
                    <button>Clear</button>
                  </div>
                  <div className="checkbox no-drag">
                    <input type="checkbox" />
                    <span>Full time</span>
                  </div>
                  <div className="checkbox no-drag">
                    <input type="checkbox" />
                    <span>Part time</span>
                  </div>
                  <div className="checkbox no-drag">
                    <input type="checkbox" />
                    <span>Contractor</span>
                  </div>
                  <div className="checkbox no-drag">
                    <input type="checkbox" />
                    <span>Internship</span>
                  </div>
                </div>

                {/* Fixed price */}
                <div className="filter no-drag">
                  <div className="filter-top no-drag">
                    <h4>Fixed Price</h4>
                    <button>Clear</button>
                  </div>
                  <label>min</label>
                  <div className="input-box no-drag">
                    <p className='symbol no-drag'>(₦)</p>
                    <input type="number" placeholder='0' />
                    <p className='tag no-drag'>NGN</p>
                  </div>
                  <label>max</label>
                  <div className="input-box no-drag">
                    <p className='symbol no-drag'>(₦)</p>
                    <input type="number" placeholder='0' />
                    <p className='tag no-drag'>NGN</p>
                  </div>
                </div>

                {/* Hourly price */}
                <div className="filter no-drag">
                  <div className="filter-top no-drag">
                    <h4>Hourly Price</h4>
                    <button>Clear</button>
                  </div>
                  <label>min</label>
                  <div className="input-box no-drag">
                    <p className='symbol no-drag'>(₦)</p>
                    <input type="number" placeholder='0' />
                    <p className='tag no-drag'>NGN</p>
                  </div>
                  <label>max</label>
                  <div className="input-box no-drag">
                    <p className='symbol no-drag'>(₦)</p>
                    <input type="number" placeholder='0' />
                    <p className='tag no-drag'>NGN</p>
                  </div>
                </div>

                {/* Reviews */}
                <div className="filter no-drag">
                  <div className="filter-top no-drag">
                    <h4>Review</h4>
                    <button>Clear</button>
                  </div>
                  <div className="double-label no-drag">
                    <label>min</label>
                    <label>max</label>
                  </div>
                  <div className="double-input no-drag">
                    <input type="number" placeholder='0' />
                    <p>-</p>
                    <input type="number" placeholder='500' />
                  </div>
                </div>

                {/* Ratings */}
                <div className="filter no-drag">
                  <div className="filter-top no-drag">
                    <h4>Ratings</h4>
                    <button>Clear</button>
                  </div>
                  <div className="stars no-drag">
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                  </div>
                </div>
              </div>
            </motion.form>
        </motion.div>
      </Container>
      {showPickCategory && (
        <PickCategory 
          data={categoryData}
          heading={'Select Job Category'}
          searchPlaceHolder='Search category'
          setValue={(value) => setSelectedJobCategory(value)}
          hide={() => {
            setShowPickCategory(false)
            document.querySelector('html').classList.remove('modal__open');
          }} 
        />
      )}
      {showPickSubCategory && (
        <PickCategory 
          data={categoryData}
          heading={'Select Sub Category'}
          setValue={value => setSelectedSubCategory(value)}
          searchPlaceHolder='Search sub category'
          hide={() => {
            setShowPickSubCategory(false)
            document.querySelector('html').classList.remove('modal__open');
          }} 
        />
      )}
    </React.Fragment>
  )
}

export default Filter

const Container = styled(motion.div)`
  .dashboard-filter form .form-body {
    scrollbar-color: #cdccca #f1f1f1;
    scrollbar-width: thin;

    /* width */
    &::-webkit-scrollbar {
      width: 5px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: #f1f1f1; 
    }
    
    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #cdccca; 
      height: 20px !important;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: #989696; 
    }
  }

  @media screen and (min-width: 447px) {
    .dashboard-filter .input-box {
      width: 95%;
    }
  }

  @media screen and (min-width: 567px) {
    .dashboard-filter .input-box {
      width: 96%;
    }
  }

  @media screen and (min-width: 768px) {
    background-color: transparent;
    position: sticky;
    /* flex: 0.35; */
    min-width: 322px;
    max-width: 322px;
    top: 0;
    overflow-y: auto;

    > .dashboard-filter {
      background-color: transparent;
      height: fit-content;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding: 0 0 1em;
      box-sizing: border-box;
      max-height: 98vh;
    }

    > .dashboard-filter .input-box {
      margin: 0 auto;
      width: 92%;
    }

    > .dashboard-filter .input-box > input {
      margin: 0;
      width: 100%;
    }

    > .dashboard-filter .input-box > p {
      width: fit-content;
    }

    > .dashboard-filter form {
      border-radius: 16px;
    }

    > .dashboard-filter form .form-header > .MuiSvgIcon-root {
      display: none;
    }

    > .dashboard-filter .drag-handle {
      margin-top: 15px;
      background-color: transparent;
    }

    > .dashboard-filter form .form-body > .filter {
      margin-bottom: 2em;
    }
    
    > .dashboard-filter .input-box {
      width: 97%;
    }
  }

  @media screen and (min-width: 1024px) {
    .dashboard-filter .input-box {
      width: 92%;
    }
  }
`

const SelectCategoryButton = styled.div`
  background: #E9E9ED;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 35px;
  padding: 0 0.5rem;
  margin-top: 10px;
  border-radius: 4px;
  cursor: pointer;

  > p {
    font-size: 0.875rem;
  }
`