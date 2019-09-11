import './index.scss'
import React, { Component} from 'react'
import { render } from "react-dom"
import Peaks from 'peaks.js'

class Waveform extends Component {
  constructor(props) {
    super(props)
    this.mediaElement = React.createRef()
    this.peaksContainer = React.createRef()
  }

  componentDidMount() {
    this.peaks = Peaks.init({
      container: this.peaksContainer.current,
      mediaElement: this.mediaElement.current,
      webAudio: {
        audioContext: new AudioContext(),
        multiChannel: false
      },
      logger: console.error.bind(console),
      height: 125,
      zoomLevels: [256, 512, 1024, 4096, 16384],
      keyboard: false,
      nudgeIncrement: 0.01,
      inMarkerColor: '#a51313',
      outMarkerColor: '#a51313',
      zoomWaveformColor: 'rgba(0,0,0,0.5)',
      overviewWaveformColor: 'rgba(0,0,0,0.2)',
      overviewHighlightRectangleColor: 'grey',
      playheadColor: 'rgba(0, 0, 0, 1)',
      playheadTextColor: '#aaa',
      showPlayheadTime: true, // zoom view only
      pointMarkerColor: '#FF0000',
      axisGridlineColor: '#ccc',
      axisLabelColor: '#aaa',
      randomizeSegmentColor: true, // Overrides segmentColor
      zoomAdapter: 'animated',
      segments: [],
      points: []
    })
  }

  play() {
    this.peaks.player.play()
  }

  zoomOut() {
    this.peaks.zoom.zoomOut() 
  }

  zoomIn() {
    this.peaks.zoom.zoomIn() 
  }

  render() {
    return (
      <div>
        <audio hidden ref={this.mediaElement}>
          <source type="audio/mpeg" src="http://localhost:8080/audio.mp3" />
        </audio>
        <div ref={this.peaksContainer} style={{height: '100%', width: '100%'}}/>
        <button onClick={this.play.bind(this)}>Play</button>
        <button onClick={this.zoomIn.bind(this)}>Zoom In</button>
        <button onClick={this.zoomOut.bind(this)}>Zoom out</button>
      </div>
    )
  }
}

const App = () => (
  <div style={{border: '1px solid red'}}><Waveform /></div>
)

render(
  <App />,
  document.getElementById('root')
)