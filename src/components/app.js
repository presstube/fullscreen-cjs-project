
import React from "react"

import FullscreenCJSUnit from "./fullscreen-cjs-unit"

export default class App extends React.Component {
  render () {
    return (

      <FullscreenCJSUnit
        filename="a-unit.js"
        namespace="aunit"
        width={800}
        height={800}
        fps={10}
      />

    )
  }
}

/*

      <FullscreenCJSUnit
        filename="a-unit.js"
        namespace="aunit"
        width={800}
        height={800}
        fps={10}
      />

      <FullscreenCJSUnit
        filename="b-unit.js"
        namespace="bunit"
        width={800}
        height={500}
        fps={20}
      />

      <FullscreenCJSUnit
        filename="c-unit.js"
        namespace="cunit"
        width="700"
        height="900"
        fps={30}
      />

*/
