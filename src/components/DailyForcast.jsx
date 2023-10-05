import { useState } from "react";
// import cloudy from "../assets/Icons/cloudy.svg";
// import cloudy_day from "../assets/Icons/cloudy-day-1.svg";

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
        <p>true</p>
      ) : (
        <>
          <div className="p-5 text-center flex flex-col items-center">
            {/* <img src={cloudy_day} alt="" className=" flex max-w-md h-36" /> */}
            <p className="text-3xl">{data.current.temp}&#176;</p>
          </div>
          <div className="text-center text-lg">
            <p>{data.current.weather[0].description}</p>
            <p>{data.timezone}</p>
          </div>
        </>
      )}
    </>
  );
};
const DailyForecast = ({ data }) => {
  return (
    <div className="w-fit h-fit text-black p-2 rounded-lg  ">
      {data ? <WeatherCard data={data} /> : <>false line 43 DailyForecast</>}
    </div>
  );
};

export default DailyForecast;
