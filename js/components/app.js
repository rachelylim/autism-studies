import React, { Component } from 'react';
import ReactSVG from 'react-svg'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return <ReactSVG path="world.svg" svgStyle={{ width: "100%" }}/>;
  }
}

export default App;
