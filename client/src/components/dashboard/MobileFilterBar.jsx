import React from 'react'
import TuneIcon from '@mui/icons-material/Tune';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import './MobileFilterBar.css'

const MobileFilterBar = ({showFilter}) => {
  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 30,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      color: '#fff1cf',
      '&.Mui-checked': {
        transform: 'translateX(14px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#4d483e' : '#DAA520',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : '#4d483e',
      boxSizing: 'border-box',
    },
  }));
  
  return (
    <div className="filter__bar">
      <button onClick={showFilter}>
        Filter
        <TuneIcon />
      </button>
      <div className="alert">
        <NotificationsActiveIcon />
        <p>Receive alerts for this search</p>
        <AntSwitch inputProps={{ 'aria-label': 'ant design' }} />
      </div>
    </div>
  )
}

export default MobileFilterBar