import React, {useEffect} from "react";

function TextArea(props) {
  const [customClass, setCustomClass] = React.useState("textarea rounded-lg my-4 bg-inherit input-success w-full max-w-xlg h-10");

  useEffect(()=>{
    console.log("rerendered : "+props.value+" : ");
    const baseClass = "textarea rounded-lg my-4 bg-inherit input-success w-full max-w-xlg ";
    setCustomClass(baseClass+"h-"+props.height);
  },[])
  return (
    <div>
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
