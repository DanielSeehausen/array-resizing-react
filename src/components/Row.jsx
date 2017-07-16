import React, { Component } from 'react'
import Cell from './Cell'



const Row = ({vals}) => (
    <tr style={{width: "90%", height: "10%"}}>
      {vals.map(val => <Cell val={val} />)}
    </tr>
  )

export default Row
