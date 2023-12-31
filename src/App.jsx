import { useState } from "react";
import Navbar from "./components/Navbar";
import DailyForecast from "./components/DailyForcast";
import TodayHighlight from "./components/TodayHighlight";
import WeekHighlight from "./components/WeekForecast";
import { BiSolidErrorCircle } from "react-icons/bi";

const fetchData = async (lat, lon, key) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${key}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
function App() {
  const APIkey = "0d3ce694eb7aec0ef5afb1493c068bb5";
  const [data, setData] = useState(null);
  const [run, setRun] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleFetchError = (error) => {
    console.error("Error from Navbar:", error);
    setError(true);
  };
  // gets the new data and set it in data then sets run to true
  const updateData = (newData) => {
    if (!newData) {
      setError(true);
    } else {
      setData(newData[0]);
      setRun(true);
    }
  };
  // when run is run it fetchData
  if (!run) {
    console.log("no data");
  } else {
    console.log("Fetching data");
    fetchData(data.lat, data.lon, APIkey)
      .then((newData) => {
        setLoading(false);
        setError(false);
        return setData(newData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
        setLoading(false);
        setError(true);
      });
    setRun(false);
  }
  const locationData = (location) => {
    if (!location) {
      console.log("No location");
    } else {
      console.log("Fetching location");
      setLoading(true);

      fetchData(location.latitude, location.longitude, APIkey)
        .then((newData) => {
          setLoading(false);
          setError(false);
          setData(newData);
        })
        .catch((error) => {
          console.error("Error fetching data:", error.message);
          setLoading(false);
          setError(true);
        });
    }
  };
  return (
    <main>
      {/* large screen */}
      <div className=" hidden lg:flex items-center justify-center h-screen my-auto">
        <div className="flex flex-col gap-2 bg-white bg-opacity-30 p-2 rounded-xl mx-1">
          <Navbar
            updateData={updateData}
            handleFetchError={handleFetchError}
            locationData={locationData}
          />
          {error ? (
            <div className="md:hidden bg-red-200  py-3 px-4  border-l-4 border-red-500 flex items-center gap-3">
              <BiSolidErrorCircle className="w-[28px] h-auto fill-red-500 rounded" />
              <div>
                <p className="font-bold">Error code:404</p>
                <p className="text-sm">
                  Can not find the place you are looking for.
                </p>
              </div>
            </div>
          ) : (
            <p className="hidden">Made by Aditya Gaikwad</p>
          )}
          {loading ? (
            <div className="animate-pulse flex gap-3 bg-white bg-opacity-30 p-6 rounded-xl">
              <p>
                Search for a place then press enter or click the search button
              </p>
            </div>
          ) : (
            <div className="lg:flex flex-col lg:flex-row items-center  gap-3 bg-white bg-opacity-30 p-6 rounded-xl w-">
              <DailyForecast data={data} />
              <div className="flex flex-col justify-between gap-3 ">
                <TodayHighlight data={data.current} />
                <WeekHighlight data={data.daily} />
              </div>
            </div>
          )}
          {error ? (
            <div className="hidden lg:flex bg-red-200  py-3 px-4  border-l-4 border-red-500  items-center gap-3">
              <BiSolidErrorCircle className="w-[28px] h-auto fill-red-500 rounded" />
              <div>
                <p className="font-bold">Error code:404</p>
                <p className="text-sm">
                  Can not find the place you are looking for.
                </p>
              </div>
            </div>
          ) : (
            <p className="hidden">Made by Aditya Gaikwad</p>
          )}
        </div>
      </div>
      {/* small screen */}
      <div className="lg:hidden px-6 py-6 h-fit min-h-screen flex flex-col gap-3 ">
        {/* navbar */}
        <Navbar
          updateData={updateData}
          handleFetchError={handleFetchError}
          locationData={locationData}
        />
        {/* error */}
        {error ? (
          <div className=" bg-red-200  py-3 px-4  border-l-4 border-red-500 flex items-center gap-3">
            <BiSolidErrorCircle className="w-[28px] h-auto fill-red-500 rounded" />
            <div>
              <p className="font-bold text-sm">Error code:404</p>
              <p className="text-xs">
                Can not find the place you are looking for.
              </p>
            </div>
          </div>
        ) : (
          <p className="hidden">Made by Aditya Gaikwad</p>
        )}
        {/* Loading screen*/}
        {loading ? (
          <div className="animate-pulse flex gap-3 bg-white bg-opacity-30 p-6 rounded-xl h-full">
            <p className="text-xs">
              Search for a place then press enter or click the search button
            </p>
          </div>
        ) : (
          // weather info
          <div className="flex flex-col gap-3">
            <DailyForecast data={data} />
            <TodayHighlight data={data.current} />
            <WeekHighlight data={data.daily} />
          </div>
        )}
      </div>
    </main>
  );
}
export default App;
