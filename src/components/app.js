
import React from "react"

import Nav from "./nav"
// import FullscreenCJSUnit from "./fullscreen-cjs-unit"

export default class App extends React.Component {
  render () {
    return (
      <div>
        <Nav name="braneclubpresstube" maxWidth={800}/>
      </div>
    )

  }
}


/*
    <FullscreenCJSUnit name="aunit" />
    <FullscreenCJSUnit name="bunit" />
    <FullscreenCJSUnit name="cunit" />
*/
