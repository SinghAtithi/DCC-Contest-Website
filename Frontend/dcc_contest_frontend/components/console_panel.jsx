import React, { useEffect, useState } from 'react'
import ConsoleSkeleton from '../skeleton/ConsoleSkeleton'

const ConsolePanel = (props) => {

  return (
    props.consoleLoader ? <ConsoleSkeleton/> :
    (<div>
      {props.isOpen && (
        <div className="px-6" style={{ position: 'absolute', bottom: "0", width: `${props.width}`, height: '20vh', backgroundColor: 'inherit', overflowY:'scroll' }}>
          <pre>{props.console_data}</pre>
        </div>
      )}
    </div>)
  )
}

export default ConsolePanel
