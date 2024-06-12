import React, { useState } from "react"
import "./RequiredFieldForm.css"

const RequiredFieldForm = () => {
  const [inputValue, setInputValue] = useState("")
  const [error, setError] = useState("")

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setInputValue(value)

    // Validate if the input is not empty
    if (!value.trim()) {
      setError("This field is required.")
    } else {
      setError("")
    }
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    // previne o comportamento padrão porque é um SPA
    e.preventDefault()

    if (!inputValue.trim()) {
      setError("This field is required.")
    } else {
      setError("")
    }

    if (!error) {
      // Submit form
    }
  }

  return (
    <div className="page">
      <div className="container-form">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Email" value={inputValue} onChange={handleInputChange} />
          <p>{error}</p>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default RequiredFieldForm
