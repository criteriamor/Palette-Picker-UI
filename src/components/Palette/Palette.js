import React, { Component } from 'react';
import { Color } from '../Color/Color';

export class Palette extends Component {
  constructor() {
    super();
    this.state = { colors: [] };
  }

  componentDidMount = () => {
    this.regeneratePalette();
    document.addEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = (event) => {
    if (event.keyCode === 32) this.regeneratePalette(this.state.colors);
  }

  regeneratePalette = (colors = []) => {
    let initialColors = [];

    for (let i = 0; i < 5; i++) {

      if (!colors[i] || !colors[i].locked) {
        initialColors.push({ hex: this.generateColor(), locked: false });

      } else if (colors[i].locked) {
        initialColors.push(colors[i]);
      }

    }
    this.setState({ colors: initialColors });
  }

  generateColor() {
    return '#' + Math.random().toString(16).slice(2, 8).toUpperCase();
  }

  toggleLocked = (hex) => {
    let storedPalette = this.state.colors;

    const foundColor = storedPalette.find(color => color.hex === hex)
    foundColor.locked = !foundColor.locked;

    this.setState({ colors: storedPalette });
  }

  render() {
    const { colors } = this.state;

    return colors 
      ? <div className={`Palette`}>
        <div className="colors">
        {
          colors.map(color => <Color key={color.hex} toggleLocked={this.toggleLocked} {...color}/>) 
        }
        </div>
      </div>
      : <p>LOADING..</p>
  }
}