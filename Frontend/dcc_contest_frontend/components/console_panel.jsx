import React, { useEffect, useState } from 'react'
import ConsoleSkeleton from './skeleton/ConsoleSkeleton'

const ConsolePanel = (props) => {

  return (
    <div className={`relative console-area ${props.background}`} style={{ width: `${props.width}` }}>
      {props.consoleLoader ? <ConsoleSkeleton /> : (props.isOpen && <pre>{props.console_data}</pre>)}
    </div>
  )
}

export default ConsolePanel
