import React from 'react'

function getDisplayData(val) {
  if (typeof val === 'string') return ['user-cell', val]
  return (val === null) ? ['lowered-cell', null] : ['raised-cell', null]
}

const ArrayCell = ({val}) => {
  const displayData = getDisplayData(val)

  return (
    <td className={displayData[0]} style={{width: '46px', maxWidth: '46px'}}>
      {displayData[1]}
    </td>
  )
}

export default ArrayCell
