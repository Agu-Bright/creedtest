import React from 'react'
import StarIcon from '@mui/icons-material/Star'
import LocationIcon from '../../../assets/Dashboard/location.svg'
import MessageIcon from '@mui/icons-material/Message';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import WatchLaterIcon from '@mui/icons-material/WatchLater'

const ClientInfo = () => {
  return (
    <div className="client__info">
      <h2>About the client</h2>
      <p>
        <img src={LocationIcon} alt="" />
        River
      </p>
      <div className="rating__box">
        <div className="rating">
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <p>0.0</p>
        </div>
        <p className="review">
          <MessageIcon />
          0.0
        </p>
      </div>
      <p>
        <WatchLaterIcon />
        Member since Mar 3, 2022
      </p>

      {/* client verifications */}
      <h3>Client Verification</h3>
      <p>
        <MailIcon />
        Email verified
      </p>
      <p>
        <AccountCircleIcon />
        Profile completed
      </p>
      <p>
        <PhoneIcon />
        Phone verified
      </p>
    </div>
  )
}

export default ClientInfo