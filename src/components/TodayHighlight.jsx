import { TiWeatherSunny } from "react-icons/ti";
import { PiWind } from "react-icons/pi";

const TodayCards = ({ data }) => {
  return (
    <>
      <div className="flex gap-3 flex-wrap">
        <div className="bg-[#F9F6EE] bg-opacity-30 h-fit px-3 py-2 rounded-lg text-sm">
          {/* icon */}
          <p>Feel like: {data.feels_like}</p>
        </div>
        <div className="bg-[#F9F6EE] bg-opacity-30 flex items-center h-fit px-3 py-2 rounded-lg text-sm">
          <TiWeatherSunny />
          <p>UV Index: {data.uvi}</p>
        </div>
        <div className="bg-[#F9F6EE] bg-opacity-30 flex items-center h-fit px-3 py-2 rounded-lg text-sm">
          <PiWind />
          <p>Wind: 0%</p>
        </div>
        <div className="bg-[#F9F6EE] bg-opacity-30 h-fit px-3 py-2 rounded-lg text-sm">
          {/* icon */}
          <p>Humidity: {data.humidity}</p>
        </div>
      </div>
    </>
  );
};

const TodayHighlight = ({ data }) => {
  return (
    <div className="flex flex-col gap-2">
      <h1>Today&rsquo;s Highlights</h1>
      {data ? (
        <TodayCards data={data} />
      ) : (
        <div className=" animate-bounce">
          <p>Loading..</p>
        </div>
      )}
    </div>
  );
};

export default TodayHighlight;
