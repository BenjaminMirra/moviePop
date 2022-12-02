import React, { useEffect, useState } from 'react'
import Sitenso from '../../Utils/Images/sitenso.svg'
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseChimney, faStar, faMagnifyingGlass, faRightFromBracket, faRightToBracket } from '@fortawesome/free-solid-svg-icons'

export const Header = () => {

  const [logged, isLogged] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      isLogged(true);
    } else {
      isLogged(false)
    }
  }, [logged])

  const handleLogout = () => {
    localStorage.removeItem("jwt")
    localStorage.removeItem("userData")
  }

  return (
    <div className="header">
      <div className="header-image">
        <img src={Sitenso} alt="logo" />
      </div>
      <div className="header-items">
        {logged ? (
          <>
            <a href="/"><FontAwesomeIcon icon={faHouseChimney} /></a>
            <a href="/movies"><FontAwesomeIcon icon={faMagnifyingGlass} /></a>
            <a href="/favorites"><FontAwesomeIcon icon={faStar} /></a>
            <a href="/"><FontAwesomeIcon icon={faRightFromBracket} onClick={handleLogout} /></a>
          </>) : (
          <>
            <a href="/"><FontAwesomeIcon icon={faHouseChimney} /></a>
            <a href="/movies"><FontAwesomeIcon icon={faMagnifyingGlass} /></a>
            <a href="/login"><FontAwesomeIcon icon={faRightToBracket} /></a>
          </>)}

      </div>
    </div>
  )
}
