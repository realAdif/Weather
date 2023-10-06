import { AiOutlineSearch } from "react-icons/ai";
import { useState, useEffect } from "react";
// https://api.openweathermap.org/data/2.5/onecall?lat="33.8688"&lon="151.2093"&units=metric&appid=0d3ce694eb7aec0ef5afb1493c068bb5
const fetchData = async (location) => {
  try {
    const response = await fetch(
      `https://us1.locationiq.com/v1/search?key=pk.ae433c8853239ce92c2541b70655a352&q=%22${location}%22&format=json`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { data: null, error: error.message };
  }
};

const Navbar = ({ updateData, handleFetchError }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      try {
        const { data, error } = await fetchData(inputValue);
        if (error) {
          console.error("Error fetching data:", error);
          handleFetchError(error);
        } else {
          updateData(data);
        }
      } catch (error) {
        console.error("Error fetching location:", error);
        // Handle the error here if needed
      }
    }
  };
  useEffect(() => {
    setInputValue("");
  }, [updateData]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="">
      <div className="flex justify-between ">
        <div className="flex items-center bg-[#F9F6EE] bg-opacity-30 text-black w-fit px-3 py-1 rounded-xl">
          <div className="text-[#516163] ">
            <input
              type="text"
              placeholder="Search for places..."
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              className="outline-none bg-transparent text-black "
            />
          </div>
          <button className="">
            <AiOutlineSearch size={25} color="#516163" />
          </button>
        </div>

        <div className="flex gap-1">
          <button className="bg-[#F9F6EE] bg-opacity-30 text-black w-10 h-10 rounded-3xl">
            &#176;C
          </button>
          <button className="bg-[#F9F6EE] w-10 h-10 rounded-3xl">
            &#176;F
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
