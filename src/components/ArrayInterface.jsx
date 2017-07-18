import React from 'react'

const ArrayInterface = ({handleChange}) => (
  <div>
    <h3 style={{color: '#BBB'}}>Provide a whitespace separated array</h3>
    <form>
      <h3 style={{color: '#BBB'}}>[ <input type="text" name="userArrayInput" onChange={handleChange}/> ]</h3>
    </form>
  </div>
)

export default ArrayInterface
