import { useState } from "react";
import cloudy from "../assets/cloudy.svg";

const WeatherCard = ({ dayData }) => {
  const timestampMs = dayData.dt * 1000;
  // Create a new Date object using the timestamp
  const date = new Date(timestampMs);
  // Define an array of day names
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  // Get the day of the week and use it to get the corresponding day name
  const dayOfWeek = dayNames[date.getDay()];
  const minTemp = dayData.temp.min;
  const maxTemp = dayData.temp.max;
  return (
    <>
      <div className="flex flex-col items-center bg-[#F9F6EE] bg-opacity-30 rounded px-3 py-1">
        <p>{dayOfWeek} </p>
        <img src={cloudy} alt="" />
        <p>{`Low:${minTemp.toFixed(0)}° `}</p>
        <p>{`Max:${maxTemp.toFixed(0)}°`}</p>
      </div>
    </>
  );
};

const WeekHighlight = ({ data }) => {
  return (
    <div className="flex flex-col gap-2">
      <h1>7 Day Forecast</h1>
      {!data ? (
        <div className=" animate-bounce">
          <p>Loading..</p>
        </div>
      ) : (
        <div className="w-fit flex gap-2">
          {data.slice(1).map((dayDate, index) => (
            <WeatherCard key={index} dayData={dayDate} />
          ))}
        </div>
      )}
      <div className="w-fit flex gap-2"></div>
    </div>
  );
};
export default WeekHighlight;

// {
//   data ? (
//     data.daily
//       .slice(1)
//       .map((dayData, index) => <WeatherCard key={index} dayData={dayData} />)
//   ) : (
//     <p>Loading...</p>
//   );
// }
