import React, { Component } from 'react'
import '../App.css'
import InterfaceSelector from "./InterfaceSelector.jsx"
import ArrayInterface from "./ArrayInterface"
import ListInterface from "./ListInterface.jsx"


class App extends Component {
  constructor() {
    super()
    this.state = { mode: 'Array'}
  }

  swapMode = (e) => {
    if (e.target.name === this.state.mode) return
    this.setState({mode: e.target.name})
  }

  render() {
    return (
      <div className="App">
        <div style={{position: 'absolute', width: '100%', top: '8%', zIndex: '5'}}>
          <InterfaceSelector handleChange={this.swapMode} structName={'Array'}/>
          <InterfaceSelector handleChange={this.swapMode} structName={'LinkedList'}/>
        </div>
        {this.state.mode === 'Array' ? <ArrayInterface /> : null }
      </div>
    )
  }
}

export default App
