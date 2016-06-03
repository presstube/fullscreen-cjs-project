
import React from "react"

import Nav from "./nav"
import FullscreenCJSUnit from "./fullscreen-cjs-unit"

export default class App extends React.Component {
  render () {
    return (
      <div>
        <FullscreenCJSUnit name="aunit" />
        <Nav name="braneclubpresstube" />
      </div>
    )
  }
}

/*
    <FullscreenCJSUnit name="bunit" />
    <FullscreenCJSUnit name="cunit" />
*/
