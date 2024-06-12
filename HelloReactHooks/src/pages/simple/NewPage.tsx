import React, { ReactElement } from "react"
import Card from "../../components/Card/Card"

const NewPage = (): ReactElement => {
  return (
    <div className="card-container">
      <Card name={"age 10"} age={10} />
      <Card name={"age 20"} age={20} />
    </div>
  )
}

export default NewPage
