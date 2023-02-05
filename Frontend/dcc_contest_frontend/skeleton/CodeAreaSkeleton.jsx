import { propTypes } from "react-animated-cursor";

const CodeAreaSkeleton = (props) => {

    return (
        <div className="waveCenter" style={{
            width: `${props.width}`,
            height: `${props.height}`
        }}>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
        </div>
    )
}

export default CodeAreaSkeleton;