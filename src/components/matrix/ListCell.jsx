import React from 'react'

function getDisplayData(val) {
  if (typeof val === 'string') return 'user-cell'
  return (val === null) ? 'lowered-cell': 'raised-cell'
}

const ListCell = ({val, pointer}) => {
  const displayData = getDisplayData(val)
  return (
    <td className={displayData} style={{width: '46px', maxWidth: '46px'}}>
      {displayData === 'user-cell' ? `${val} || ${pointer}` : null}
    </td>
  )
}

export default ListCell
