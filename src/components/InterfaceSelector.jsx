import React from 'react'

const InterfaceSelector = ({handleChange, structName}) => {
  return (
    <button onClick={handleChange} name={structName}>{structName}</button>
  )
}

export default InterfaceSelector
