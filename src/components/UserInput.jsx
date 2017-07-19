import React from 'react'

const UserInput = ({handleChange, val}) => (
  <div>
    <h3 style={{color: '#BBB'}}>Provide char values for an array</h3>
    <form>
      <h3 style={{color: '#BBB'}}>[ <input type="text" name="userArrayInput" value={val} onChange={handleChange}/> ]</h3>
    </form>
  </div>
)

export default UserInput
