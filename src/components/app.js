
import React from "react"

import FullscreenCJSUnit from "./fs-cjs-unit"

export default class App extends React.Component {
  render () {
    return (
      <FullscreenCJSUnit filename="a-unit.js" w="800" h="800"/>
    )
  }
}
