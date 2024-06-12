import React, { ReactElement } from "react"

// definição do objeto de parâmetro
interface params {
  name: string
  age?: number
}

const SimpleWithParam = (values: params): ReactElement => {
  return <h1> {values.name} </h1>
}

export default SimpleWithParam
