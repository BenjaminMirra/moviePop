import React, { useEffect, useState } from 'react'
import './Header.css'
import { DesktopHeader } from './Versions/DesktopHeader'
import { MobileHeader } from './Versions/MobileHeader'

export const Header = () => {

  const [logged, isLogged] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      isLogged(true);
    } else {
      isLogged(false)
    }
  }, [isLogged])

  const handleLogout = () => {
    localStorage.removeItem("jwt")
    localStorage.removeItem("userData")
  }

  const [headerDisplayed, setHeaderDisplayed] = useState(<><DesktopHeader logout={logged} isLogged={isLogged} handleLogout={handleLogout} /></>)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth]);

  useEffect(() => {
    if (windowWidth < 768) {
      setHeaderDisplayed(<MobileHeader logged={logged} isLogged={isLogged} handleLogout={handleLogout} />)
    }
    else if (windowWidth >= 768) {
      setHeaderDisplayed(<DesktopHeader logged={logged} isLogged={isLogged} handleLogout={handleLogout} />)

    }

  }, [windowWidth, logged, isLogged]);
  return (
    <>
      {headerDisplayed}
    </>
  )
}
