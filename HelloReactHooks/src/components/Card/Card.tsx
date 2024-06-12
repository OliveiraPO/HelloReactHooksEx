import React, { ReactElement, ReactNode } from "react"
import "./Card.css"

interface params {
  name: string
  age: number
}

const Card = (values: params): ReactElement => {
  let title: ReactNode

  if (values.age > 10) {
    title = <h1>{values.name}</h1>
  } else {
    title = <h3>{values.name}</h3>
  }

  return (
    <div className="card">
      {title}
      <img src="/yoroi_02_50.png" width={256} height={256} alt="Pixel Art Samurai" />
    </div>
  )
}

export default Card
