/*

*/

import React from "react"

export default class Nav extends React.Component {

  static propTypes = {
    name: React.PropTypes.string.isRequired
  }

  constructor(props) {
    const {name} = props
    super(props)
    this.loadLib(`${name}.js`)
  }

  state = {
    stage: null,
    main: null,
    libProps: {
      width: 0,
      height: 0
    },
    sw: 0,
    sh: 0,
    dpr: 1,
    shrinkScale: 1
  }

  loadLib(filename) {
    const libScript = document.createElement("script")
    libScript.src = filename
    libScript.addEventListener("load", this.onLibLoaded.bind(this))
    document.body.appendChild(libScript)
  }

  onLibLoaded() {
    const {name} = this.props
    const lib = window[name]
    const {properties: libProps} = lib
    const {fps} = libProps
    const root = new lib[name]
    const {main} = root
    const stage = new createjs.Stage(this.canvas)
    this.setState({stage, main, libProps}, () => {
      stage.addChild(root)
      stage.update()
      createjs.Ticker.setFPS(fps)
      createjs.Ticker.addEventListener("tick", stage)
      main.addEventListener("tick", this.onMainTick.bind(this))
      window.addEventListener("resize", this.onResize.bind(this))
      this.onResize()
    })
  }

  onMainTick() {
    const {main} = this.state
    const {currentFrame, totalFrames} = main
    if (currentFrame === totalFrames - 1) main.stop()
  }

  onResize() {
    const {stage, libProps} = this.state
    const {width: w, height: h} = libProps
    const {innerWidth: sw, innerHeight: sh, devicePixelRatio: dpr} = window
    let shrinkScale = 1
    if (sw >= sh) {
      shrinkScale = (sh < h) ? sh / h : 1
      shrinkScale = (w*shrinkScale >= sw) ? sw / w : shrinkScale
    } else {
      shrinkScale = sw < w ? sw / w : 1
      shrinkScale = (h*shrinkScale >= sh) ? sh / h : shrinkScale
    }
    this.setState({sw, sh, dpr, shrinkScale}, () => {
      stage.scaleX = stage.scaleY = dpr * shrinkScale
      // main.x = (sw / shrinkScale) / 2
      // main.y = (sh / shrinkScale) / 2
      stage.update()
    })
  }

  render() {
    const {sw, sh, dpr} = this.state
    // console.log("libProps ", this.libProps)
    const {width, height} = this.state.libProps
    return (
      <div
        style={{
          position: "absolute",
          overflow: "hidden",
          top: 0,
          left: 0,
          width: sw,
          // height: height,
        }}
      >
        <canvas
          ref={el => {this.canvas=el}}
          width={width * dpr}
          height={height * dpr}
          style={{
            width,
            height,
            // backgroundColor: "white"
          }}>
        </canvas>
      </div>
    )
  }
}
