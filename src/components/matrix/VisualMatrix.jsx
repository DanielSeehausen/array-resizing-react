import React from 'react'
import Row from './Row'

const VisualMatrix = ({matVals, parentStruc}) => {
  return (
    <table style={{width: '1000px', height: '80%', margin: '0 auto'}}>
      <tbody>{matVals.map((row, idx) => <Row key={idx} vals={row} parentStruc={parentStruc} />)}</tbody>
    </table>
  )
}

export default VisualMatrix
