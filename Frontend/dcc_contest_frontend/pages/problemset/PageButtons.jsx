import React from 'react';


export default function PageButtons(props) {
    return (
        <div className="my-2 flex justify-center">
          <button
            className="btn mx-1"
            onClick={() => props.setPage(Math.max(1, props.page - 1))}
          >
            Prev
          </button>
          <input
            type="text"
            className="input text-sm rounded-sm mx-1 bg-inherit input-success min-h-12 h-12 min-w-14 w-14"
            value={props.page}
            onChange={(e) => {
              var val = e.target.value;
              if (isNaN(val)) {
                props.setAlert(true);
              }
              else {
                props.setAlert(false);
                if (val >= props.totalPages) val = props.totalPages;
                props.setPage(val);
    
              }
            }}
          />
          <button
            className="btn mx-1"
            onClick={() => props.setPage(Math.min(props.totalPages, props.page + 1))}
          >
            Next
          </button>
        </div>
      )
}
