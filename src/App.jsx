import { useState } from "react";
import Navbar from "./components/Navbar";
import DailyForecast from "./components/DailyForcast";

const fetchData = async (lat, lon, key) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${key}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
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

  // gets the new data and set it in data then sets run to true
  const updateData = (newData) => {
    setData(newData[0]);
    setRun(true);
  };
  // when run is run it fetchData
  if (!run) {
    console.log("no data");
  } else {
    console.log("Fetching data");

    fetchData(data.lat, data.lon, APIkey).then((newData) => {
      console.log(newData);
      return setData(newData);
    });
    setRun(false);
  }

  return (
    <main className="border border-black flex items-center justify-center h-screen my-auto">
      <div className="flex flex-col gap-2 bg-white bg-opacity-30 p-5 rounded-xl  ">
        <Navbar updateData={updateData} />
        <div className="flex gap-3 bg-white bg-opacity-30 p-6 rounded-xl">
          {/* <DailyForecast data={data} /> */}
          {/* <div className="flex flex-col gap-3">
            <TodayHighlight data={data} />
            <WeekHighlight data={data} />
          </div> */}
        </div>
      </div>
    </main>
  );
}

export default App;
