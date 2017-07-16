import React from 'react'

function getDisplayData(val) {
  if (typeof val === 'string') return ['user-cell', val]
  return (val === 0) ? ['lowered-cell', null] : ['raised-cell', null]
}

const Cell = ({val}) => {
  const displayData = getDisplayData(val)

  return (
    <td className={displayData[0]} style={{width: '10%'}}>
      {displayData[1]}
    </td>
  )
}

export default Cell
