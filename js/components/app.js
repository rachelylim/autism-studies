import React, { Component } from 'react';
import styled from 'react-emotion';
import ReactSVG from 'react-svg';
import * as d3 from 'd3';

import { continentColors } from '../constants';

const Wrapper = styled.div`
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    d3.tsv('autism-prevalence-studies-data.tsv', (d) => d)
    .then(nodes => {
      nodes.forEach(n => n.r = 2);
      this.setState({ nodes });
    });
  }

  ticked = (context, width, height, tau) => {
    context.clearRect(0, 0, width, height);
    context.save();
    context.translate(width / 2, height / 2);

    context.beginPath();
    this.state.nodes.forEach(function(d) {
      context.moveTo(d.x + d.r, d.y);
      context.arc(d.x, d.y, d.r, 0, tau);
    });
    context.fillStyle = "#ddd";
    context.fill();
    context.strokeStyle = "#333";
    context.stroke();

    context.restore();
  }

  render() {
    if (!this.state.nodes) return null;

    setTimeout(() => {
      var canvas = document.querySelector("canvas"),
      context = canvas.getContext("2d"),
      width = canvas.width,
      height = canvas.height,
      tau = 2 * Math.PI;

      d3.forceSimulation(this.state.nodes)
          .velocityDecay(0.2)
          .force("x", d3.forceX().strength(0.002))
          .force("y", d3.forceY().strength(0.002))
          .force("collide", d3.forceCollide().radius(function(d) { return d.r + 0.5; }).iterations(2))
          .on("tick", this.ticked(context, width, height, tau));
    }, 2000);


    return (
      <Wrapper>
        <Canvas>
          <ReactSVG path='world.svg' svgStyle={{ width: '100%' }} className='world-map' />
        </Canvas>
      </Wrapper>
    );
  }
}

export default App;
