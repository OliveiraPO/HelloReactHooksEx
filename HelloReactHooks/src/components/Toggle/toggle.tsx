import React from "react"
import "./toggle.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons"

import { useDarkMode } from "../../store/darkModeStore"

const Toggle = () => {
  const changeState = useDarkMode((state) => {
    return state.change
  })

  return (
    <div id="darkmode">
      <input
        type="checkbox"
        className="checkbox"
        id="checkbox"
        onChange={() => {
          changeState()
        }}
      />
      <label htmlFor="checkbox" className="label">
        <FontAwesomeIcon icon={faMoon} color="yellow" size="xs" style={{ padding: "2px" }} />
        <FontAwesomeIcon icon={faSun} color="white" size="xs" style={{ padding: "2px" }} />
        <div className="ball"></div>
      </label>
    </div>
  )
}

export default Toggle
