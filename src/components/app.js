
import React from "react"

import FullscreenCJSUnit from "./fullscreen-cjs-unit"

export default class App extends React.Component {
  render () {
    return (
      <FullscreenCJSUnit
        filename="c-unit.js"
        libname="cunit"
        w="700"
        h="900"
      />
    )
  }
}

/*
      <FullscreenCJSUnit filename="a-unit.js" w="800" h="800"/>
*/
