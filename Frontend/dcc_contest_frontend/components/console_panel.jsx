import React, { useEffect, useState } from 'react'
import ConsoleSkeleton from '../skeleton/ConsoleSkeleton'

const ConsolePanel = (props) => {

  return (
    props.consoleLoader ? <ConsoleSkeleton/> :
    (<>
      {props.isOpen && (
        <div className="console-area" style={{ width: `${props.width}` }}>
          <pre>{props.console_data}</pre>
        </div>
      )}
    </>)
  )
}

export default ConsolePanel
