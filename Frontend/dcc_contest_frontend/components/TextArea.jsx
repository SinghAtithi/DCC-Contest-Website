import React, { useEffect } from "react";

function TextArea(props) {
  const [customClass, setCustomClass] = React.useState("textarea rounded-lg bg-inherit input-success w-full max-w-xlg h-10");

  useEffect(() => {
    const baseClass = "textarea rounded-lg bg-inherit input-success max-w-xlg";
    if (props.height && props.width) setCustomClass(baseClass + " h-" + props.height + " w-" + props.width);
    else if (props.width) setCustomClass(baseClass + " w-" + props.width);
    else if (props.height) setCustomClass(baseClass + " h-" + props.height + " w-full");
    else setCustomClass(baseClass + "w-full");
  }, [])
  return (
    <div className="text-area-div">
      <textarea
        type="text"
        placeholder="Type here"
        className={customClass}
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
        disabled={props.disabled ? true : false}
      />
    </div>
  );
}

export default TextArea;
