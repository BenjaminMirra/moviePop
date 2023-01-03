import React, { useEffect} from 'react'
import Sitenso from '../../../Utils/Images/sitenso.svg'
import './DesktopHeader.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseChimney, faStar, faMagnifyingGlass, faRightFromBracket, faRightToBracket } from '@fortawesome/free-solid-svg-icons'

export const DesktopHeader = ({handleLogout, logged, isLogged}) => {

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      isLogged(true);
    } else {
      isLogged(false)
    }
  }, [isLogged,logged])


  return (
    <div className="DesktopHeader">
      <div className="DesktopHeader-items">
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
