import React, { ReactElement, useState } from "react"
import "./window.css"
import { useDarkMode } from "../../store/darkModeStore"

const Window = (): ReactElement => {
  const isDark = useDarkMode((state) => {
    return state.dark
  })
  const [open, setOpen] = useState(true)

  const backgorundColor = isDark ? "#0e4a66" : "#0e4aaa"
  const textColor = isDark ? "#ffff00" : "#ffffff"

  return (
    <div className="window" style={{ background: backgorundColor, color: textColor }}>
      <h3>{open ? "Open" : "Closed"}</h3>
      <button
        className="window-button"
        onClick={() => {
          setOpen(!open)
        }}
      >
        Open/Close
      </button>
    </div>
  )
}

export default Window
