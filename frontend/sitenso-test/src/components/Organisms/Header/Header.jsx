import React from 'react'
import Sitenso from '../../Utils/Images/sitenso.svg'
import { Link } from "react-router-dom";
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseChimney, faStar, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export const Header = () => {
  return (
    <div className="header">
      <div className="header-image">
        <img src={Sitenso} alt="logo" />
      </div>
      <div className="header-items">
        <FontAwesomeIcon icon={faHouseChimney} />
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <FontAwesomeIcon icon={faStar} />
      </div>
    </div>
  )
}
