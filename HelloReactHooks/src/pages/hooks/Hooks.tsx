import React, { ReactElement, useEffect } from "react"
import Toggle from "../../components/Toggle"
import Window from "../../components/Window"
import "./Hooks.css"
import { useDarkMode } from "../../store/darkModeStore"

const HooksPage = (): ReactElement => {
  const isDark = useDarkMode((state) => {
    return state.dark
  })

  useEffect(() => {
    document.body.style.backgroundColor = isDark ? "#292c35" : "#fff"
  }, [isDark])

  useEffect(() => {
    fetch("http://localhost:4000/Pedidos", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      })
  }, [])
/*
  useEffect(() => {
    if (!isDark) {
      const data = {
        id: "a2dcc71f-7705-4db6-8cf4-4f87994203b1",
        name: "Framboesa",
      }

      fetch("http://localhost:4000/api/flavors", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
        })
    }
  }, [isDark])
*/
  return (
    <div className="page">
      <Toggle />

      <div className="container">
        <Window />
        <Window />
      </div>
    </div>
  )
}

export default HooksPage
