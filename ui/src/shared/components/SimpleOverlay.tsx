import React, {SFC} from 'react'

const SimpleOverlay: SFC = ({children}) => {
  return (
    <div className="overlay-tech show">
      <div className="overlay--dialog">{children}</div>
      <div className="overlay--mask" />
    </div>
  )
}

export default SimpleOverlay
