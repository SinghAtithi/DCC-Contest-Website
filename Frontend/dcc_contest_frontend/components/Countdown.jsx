import React from "react";
import { useState, useEffect } from "react";
import moment from "moment";

export default function Countdown(props) {
  const [months, setMonths] = useState(0);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const getTime = () => {
    const deadline = moment(props.deadline, "DD/MM/YYYY HH:mm");
    const now = moment();

    const duration = moment.duration(deadline.diff(now));

    const months = duration.months();
    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    setMonths(months);
    setDays(days);
    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="min-h-8 h-8 flex gap-5 align-middle justify-center self-center">
        <div className="flex gap-5 align-middle justify-center self-center">
          {months!==0 && <div className=" text-white">
            <span className="countdown font-mono text-lg">
              <span style={{ "--value": months }}></span>
            </span>
            months
          </div>}
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
