/*
  TODO:
  - should load cjs if not already loaded
  - use async/await for async
*/


import React from "react"

export default class FullscreenCJSUnit extends React.Component {

  constructor(props) {
    super(props)
    this.state = {w: null, height: null}
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
    const {innerWidth: w, innerHeight: h} = window
    this.setState({w, h}, () => {
      this.main.x = w/2
      this.main.y = h/2
      this.stage.update()
    })
  }

  render() {
    return (
      <div>
        <canvas
          ref={(el) => {
            console.log("hello: ", el)
            this.canvas = el
          }}
          width={this.state.w}
          height={this.state.h}
          style={{
            backgroundColor: ""
          }}>
        </canvas>
      </div>
    )
  }
}
