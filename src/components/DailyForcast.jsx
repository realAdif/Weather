import { useState } from "react";
// import cloudy from "../assets/Icons/cloudy.svg";
import cloudy_day from "../assets/cloudy.svg";
import WeatherImage from "./WeatherImage";

const WeatherCard = ({ data }) => {
  let run = false;
  if (!data.current) {
    console.log("no current weather");
  } else {
    run = true;
  }

  return (
    <>
      {!run ? (
        <div className=" animate-bounce">
          <p>Loading..</p>
        </div>
      ) : (
        <>
          <div className="hidden lg:flex flex-col items-center w-full">
            <WeatherImage weatherCode={data.current.weather[0].id} />
            <p className="text-2xl">{data.current.temp}&#176;</p>
            <div className="text-center text-neutral-600">
              <p className="font-bold text-lg">
                {data.current.weather[0].description}
              </p>
              <p>{data.timezone}</p>
            </div>
          </div>
          {/* small screen */}
          <div className="lg:hidden flex flex-col items-center max-w-md min-w-[448px]">
            <WeatherImage weatherCode={data.current.weather[0].id} />

            <p className="text-2xl">{data.current.temp}&#176;</p>
            <div className="text-center text-neutral-600">
              <p className="font-bold text-lg">
                {data.current.weather[0].description}
              </p>
              <p>{data.timezone}</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};
const DailyForecast = ({ data }) => {
  return (
    <>
      {/* large screen */}
      <div className=" hidden lg:flex h-fit  px-4 py-3 rounded-lg lg:bg-transparent bg-white bg-opacity-30 w-fit mx-auto  ">
        {data ? <WeatherCard data={data} /> : <>false line 43 DailyForecast</>}
      </div>
      {/* small screen */}
      <div className="w-full lg:hidden flex items-center justify-center">
        {data ? <WeatherCard data={data} /> : <>false line 43 DailyForecast</>}
      </div>
    </>
  );
};

export default DailyForecast;
