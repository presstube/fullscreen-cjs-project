/*

*/

import React from "react"

export default class Nav extends React.Component {

  static propTypes = {
    name: React.PropTypes.string.isRequired,
    maxWidth: React.PropTypes.number
  }

  static defaultProps = {
    maxWidth: null
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
    const {width} = libProps
    const {maxWidth} = this.props
    const {innerWidth: sw, innerHeight: sh, devicePixelRatio: dpr} = window
    const shrinkScale = (maxWidth && sw > maxWidth)
      ? maxWidth / width
      : sw / width
    this.setState({sw, sh, dpr, shrinkScale}, () => {
      stage.scaleX = stage.scaleY = dpr * shrinkScale
      stage.update()
    })
  }

  render() {
    const {sw, dpr, shrinkScale} = this.state
    const {width, height} = this.state.libProps
    const scaledHeight = height * shrinkScale
    const scaledWidth = width * shrinkScale
    return (
      <div
        style={{
          // position: "absolute",
          // overflow: "hidden",
          textAlign: "center",
          // top: 0,
          // left: 0,
          width: sw,
          height: scaledHeight,
        }}
      >
        <canvas
          ref={el => {this.canvas=el}}
          width={scaledWidth * dpr}
          height={scaledHeight * dpr}
          style={{
            width: scaledWidth,
            height: scaledHeight,
          }}>
        </canvas>
      </div>
    )
  }
}
