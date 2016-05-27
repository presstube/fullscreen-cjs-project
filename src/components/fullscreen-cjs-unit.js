/*
  TODO:
  - should load cjs if not already loaded?
  - use async/await for async?
  - get width, height and fps from lib properties?
*/


import React from "react"

export default class FullscreenCJSUnit extends React.Component {

  static propTypes = {
    filename: React.PropTypes.string.isRequired,
    namespace: React.PropTypes.string.isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    fps: React.PropTypes.number,
  }

  static defaultProps = {
    fps: 30
  }

  constructor(props) {
    super(props)
    this.state = {sw: null, sh: null, dpr: null, shrinkScale: 1}
    this.loadLib(props.filename)
  }

  loadLib(filename) {
    const libScript = document.createElement("script")
    libScript.src = filename
    libScript.addEventListener("load", this.onLibLoaded.bind(this))
    document.body.appendChild(libScript)
  }

  onLibLoaded() {
    const {namespace, fps} = this.props
    const exportRoot = new window[namespace][namespace]
    this.main = exportRoot.main
    this.stage = new createjs.Stage(this.canvas)
    this.stage.addChild(exportRoot)
    this.stage.update()
    createjs.Ticker.setFPS(fps)
    createjs.Ticker.addEventListener("tick", this.stage)
    window.addEventListener("resize", this.onResize.bind(this))
    this.onResize()
  }

  onResize() {
    const {stage, main} = this
    const {width: w, height: h} = this.props
    const {
      innerWidth: sw,
      innerHeight: sh,
      devicePixelRatio: dpr
    } = window
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
      main.x = (sw / shrinkScale) / 2
      main.y = (sh / shrinkScale) / 2
      stage.update()
    })
  }

  render() {
    const {sw, sh, dpr} = this.state
    return (
      <div
        style={{
          position: "absolute",
          overflow: "hidden",
          top: 0,
          left: 0,
          width: sw,
          height: sh
        }}
      >
        <canvas
          ref={el => {this.canvas = el}}
          width={sw * dpr}
          height={sh * dpr}
          style={{
            width: sw,
            height: sh
          }}>
        </canvas>
      </div>
    )
  }
}
