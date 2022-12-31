import React, { useEffect, useState } from 'react'

const ConsolePanel = (props) => {

  return (
    <div>
      {props.isOpen && (
        <div className="px-2" style={{ position: 'absolute', bottom: 0, width: '60%', height: '20%', backgroundColor: 'inherit', overflowY:'scroll' }}>
          <pre>{props.console_data}</pre>
        </div>
      )}
    </div>
  )
}

export default ConsolePanel
