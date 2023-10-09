import { TiWeatherSunny } from "react-icons/ti";
import { PiWind } from "react-icons/pi";

const TodayCards = ({ data }) => {
  return (
    <>
      {/* large screen */}
      <div className=" hidden lg:flex lg:flex-row w-full items-center gap-3 flex-wrap ">
        <div className="bg-[#F9F6EE] bg-opacity-30 h-fit px-3 py-2 rounded-lg text-sm">
          {/* icon */}
          <p>Feel like: {data.feels_like}</p>
        </div>
        <div className="bg-[#F9F6EE] bg-opacity-30 flex items-center h-fit px-3 py-2 rounded-lg text-sm">
          <PiWind />
          <p>Wind: 0%</p>
        </div>
        <div className="bg-[#F9F6EE] bg-opacity-30 h-fit px-3 py-2 rounded-lg text-sm">
          {/* icon */}
          <p>Humidity: {data.humidity}</p>
        </div>
        <div className="bg-[#F9F6EE] bg-opacity-30 flex items-center h-fit px-3 py-2 rounded-lg text-sm">
          <TiWeatherSunny />
          <p>UV Index: {data.uvi}</p>
        </div>
      </div>
      {/* small screen */}
      <div className="lg:hidden w-full p-3 rounded-lg flex flex-col gap-2 ">
        <div className="card">
          {/* icon */}
          <p>Feel like: {data.feels_like}</p>
        </div>
        <div className="card">
          <PiWind />
          <p>Wind: 0%</p>
        </div>
        <div className="card">
          {/* icon */}
          <p>Humidity: {data.humidity}</p>
        </div>
        <div className="card">
          <TiWeatherSunny />
          <p>UV Index: {data.uvi}</p>
        </div>
      </div>
    </>
  );
};

const TodayHighlight = ({ data }) => {
  return (
    <>
      {/* large screen */}
      <div className=" hidden lg:flex lg:items-start items-center flex-col gap-2  py-2 rounded ">
        <h1 className="text-xl font-semibold text-neutral-900">
          Today&rsquo;s Highlights
        </h1>
        {data ? (
          <TodayCards data={data} />
        ) : (
          <div className=" animate-bounce">
            <p>Loading..</p>
          </div>
        )}
      </div>
      {/* small screen */}
      <div className="lg:hidden bg-white bg-opacity-30 p-3 flex flex-col gap-2 rounded-lg">
        <h1 className="text-xl  text-neutral-900 text-center">
          Today&rsquo;s Highlights
        </h1>
        {data ? (
          <TodayCards data={data} />
        ) : (
          <div className=" animate-bounce text-center">
            <p>Loading..</p>
          </div>
        )}
      </div>
    </>
  );
};

export default TodayHighlight;
