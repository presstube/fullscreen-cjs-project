
import React from "react"

import FullscreenCJSUnit from "./fullscreen-cjs-unit"

export default class App extends React.Component {
  render () {
    return (
      <FullscreenCJSUnit
        filename="c-unit.js"
        namespace="cunit"
        width="700"
        height="900"
      />
    )
  }
}

/*
      <FullscreenCJSUnit filename="a-unit.js" w="800" h="800"/>
*/
