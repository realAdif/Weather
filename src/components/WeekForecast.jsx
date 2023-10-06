import { useState } from "react";
import cloudy from "../assets/cloudy.svg";
import WeatherImage from "./WeatherImage";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

const WeatherCard = ({ dayData }) => {
  const timestampMs = dayData.dt * 1000;
  // Create a new Date object using the timestamp
  const date = new Date(timestampMs);
  // Define an array of day names
  const dayNames = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  // Get the day of the week and use it to get the corresponding day name
  const dayOfWeek = dayNames[date.getDay()];
  const minTemp = dayData.temp.min;
  const maxTemp = dayData.temp.max;

  return (
    <>
      <div className="flex flex-col items-center bg-[#F9F6EE] bg-opacity-30 rounded px-3 py-1">
        <p>{dayOfWeek} </p>
        <WeatherImage weatherCode={dayData.weather[0].id} />
        <p>{`Low:${minTemp.toFixed(0)}° `}</p>
        <p>{`Max:${maxTemp.toFixed(0)}°`}</p>
      </div>
    </>
  );
};

const WeekHighlight = ({ data }) => {
  const [showForecast, setShowForecast] = useState(false);

  const toggleForecast = () => {
    setShowForecast(!showForecast);
  };
  return (
    <>
      {/* lager screen */}
      <div className="hidden lg:flex items-center flex-col gap-2">
        <h1 className="text-xl font-semibold text-neutral-900 w-full">
          7 Day Forecast
        </h1>
        {!data ? (
          <div className=" animate-bounce">
            <p>Loading..</p>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center items-center gap-2">
            {data.slice(1).map((dayDate, index) => (
              <WeatherCard key={index} dayData={dayDate} />
            ))}
          </div>
        )}
      </div>
      {/* small screen */}
      <div className="lg:hidden flex flex-col items-center gap-3">
        <div
          className="bg-[#F9F6EE] bg-opacity-30 rounded-lg flex cursor-pointer px-3 py-1"
          onClick={toggleForecast}
        >
          <button>
            {showForecast ? "Hide 3 day Forecast" : "Show 3 day Forecast"}
          </button>
          {showForecast ? (
            <MdOutlineKeyboardArrowUp size={40} />
          ) : (
            <MdOutlineKeyboardArrowDown size={40} />
          )}
        </div>
        {showForecast && (
          <div className="flex justify-between gap-2 w-full">
            {data.slice(1, 4).map((dayDate, index) => (
              <WeatherCard key={index} dayData={dayDate} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
export default WeekHighlight;
