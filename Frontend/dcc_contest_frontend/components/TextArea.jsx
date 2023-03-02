import React, {useEffect} from "react";

function TextArea(props) {
  const [customClass, setCustomClass] = React.useState("textarea rounded-lg bg-inherit input-success w-full max-w-xlg h-10");

  useEffect(()=>{
    const baseClass = "textarea rounded-lg bg-inherit input-success w-full max-w-xlg ";
    setCustomClass(baseClass+"h-"+props.height);
  },[])
  return (
    <div className="text-area-div">
      <textarea
        type="text"
        placeholder="Type here"
        className={customClass}
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
      />
    </div>
  );
}

export default TextArea;
