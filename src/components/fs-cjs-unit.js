/*
  TODO:
  - should load cjs if not already loaded
  - use async/await for async
*/


import React from "react"

export default class FullscreenCJSUnit extends React.Component {

  constructor(props) {
    super(props)
    this.state = {sw: null, sh: null, dpr: null}
    this.loadLib(props.filename)
  }

  loadLib(filename) {
    const libScript = document.createElement("script")
    libScript.src = filename
    libScript.addEventListener("load", this.onLibLoaded.bind(this))
    document.body.appendChild(libScript)
  }

  onLibLoaded() {
    const exportRoot = new lib.aunit()
    this.main = exportRoot.main
    this.stage = new createjs.Stage(this.canvas)
    this.stage.addChild(exportRoot)
    this.stage.update()
    createjs.Ticker.setFPS(30)
    createjs.Ticker.addEventListener("tick", this.stage)
    window.addEventListener("resize", this.onResize.bind(this))
    this.onResize()
  }

  onResize() {
    const {stage, main} = this
    const {
      innerWidth: sw,
      innerHeight: sh,
      devicePixelRatio: dpr
    } = window
    this.setState({sw, sh, dpr}, () => {
      stage.scaleX = stage.scaleY = dpr
      main.x = sw / 2
      main.y = sh / 2
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
