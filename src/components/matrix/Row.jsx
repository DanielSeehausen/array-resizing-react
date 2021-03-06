import React from 'react'
import ArrayCell from './ArrayCell'
import ListCell from './ListCell'

const Row = ({vals, parentStruc}) => {
  if (parentStruc === 'Array') {
    var cells = vals.map((val, idx) => <ArrayCell key={idx} val={val} />)
  } else {
    var cells = vals.map((val, idx) => <ListCell key={idx} val={(val) ? val[0] : null} pointer={(val) ? val[1] : null}/>)
  }

  return (
    <tr style={{height: "10%"}}>
      {cells}
    </tr>
  )
}

export default Row
