import React from "react";

function TextArea(props) {
  return (
    <div>
      <textarea
        type="text"
        placeholder="Type here"
        className="textarea rounded-lg my-4 bg-inherit input-success h-32 w-full max-w-lg"
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
      />
    </div>
  );
}

export default TextArea;
