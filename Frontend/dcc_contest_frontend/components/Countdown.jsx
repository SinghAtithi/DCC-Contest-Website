import React from "react";
import { useState, useEffect } from "react";
import moment from "moment/moment";

export default function Countdown(props) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const getTime = () => {
    const deadline = moment(props.deadline, "DD/MM/YYYY h:mm:s");
    var now = moment(Date.now()).format("DD/MM/YYYY h:mm:s");
    now = moment(now, "DD/MM/YYYY h:mm:s");

    const time = deadline.diff(now);
    // console.log(time);

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="border border-blue-400 min-h-8 h-8">
        <div className="flex gap-5 align-middle justify-center">
          <div className=" text-white">
            <span className="countdown font-mono text-lg">
              <span style={{ "--value": days }}></span>
            </span>
            days
          </div>
          <div className=" text-white">
            <span className="countdown font-mono text-lg">
              <span style={{ "--value": hours }}></span>
            </span>
            hours
          </div>
          <div className=" text-white">
            <span className="countdown font-mono text-lg">
              <span style={{ "--value": minutes }}></span>
            </span>
            min
          </div>
          <div className=" text-white">
            <span className="countdown font-mono text-lg">
              <span style={{ "--value": seconds }}></span>
            </span>
            sec
          </div>
        </div>
      </div>
    </>
  );
}
