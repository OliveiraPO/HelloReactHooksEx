import React from "react"

interface params {
  children: React.ReactNode
}

const SimpleWithChildren = (values: params): React.ReactNode => {
  return <h1> {values.children} </h1>
}

export default SimpleWithChildren
