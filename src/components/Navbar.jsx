import { AiOutlineSearch } from "react-icons/ai";
import { FaXmark } from "react-icons/fa6";
import { HiLocationMarker } from "react-icons/hi";
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
  const [showSearch, setshowSearch] = useState(false);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          // Do something with the latitude and longitude, e.g., send to your API
          console.log("Latitude:", lat);
          console.log("Longitude:", lon);
        },
        (error) => {
          console.error("Error getting location:", error.message);
          // Handle the error, show a message to the user, etc.
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
      // Handle the case where geolocation is not supported
    }
  };

  const toggleShowSearch = () => {
    setshowSearch(!showSearch);
  };

  const handleDataFetching = async () => {
    try {
      const { data, error } = await fetchData(inputValue);
      if (error) {
        console.error("Error fetching data:", error);
        handleFetchError(error);
      } else {
        updateData(data);
        setshowSearch(false);
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      // Handle the error here if needed
    }
  };
  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      await handleDataFetching();
    }
  };

  const handleButtonClick = async () => {
    await handleDataFetching();
  };
  useEffect(() => {
    setInputValue("");
  }, [updateData]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      {/* large screen */}
      <div className="hidden md:flex justify-between items-center ">
        <div className="flex items-center bg-[#F9F6EE] bg-opacity-30 text-black w-fit p-2 rounded-xl">
          <AiOutlineSearch
            size={25}
            color="#516163"
            onClick={handleButtonClick}
          />
          <input
            type="text"
            placeholder="Search for places..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            className="outline-none bg-transparent text-black"
          />
        </div>
        <div className="bg-[#F9F6EE] bg-opacity-30 w-fit p-2 rounded-full">
          <HiLocationMarker size={23} color="#516163" />
        </div>
      </div>
      {/* small screen */}
      {showSearch ? (
        <div className="md:hidden bg-[#F9F6EE] bg-opacity-30 flex justify-between items-center w-full rounded-lg p-2 gap-2">
          <AiOutlineSearch
            size={25}
            color="#516163"
            onClick={handleButtonClick}
          />
          <input
            type="text"
            placeholder="Search for places..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            className="outline-none bg-transparent text-black w-full"
          />
          <FaXmark size={24} color="#516163" onClick={toggleShowSearch} />
        </div>
      ) : (
        <div className="md:hidden flex justify-between">
          <div
            className="bg-[#F9F6EE] bg-opacity-30 w-fit p-2 rounded-full"
            onClick={toggleShowSearch}
          >
            <AiOutlineSearch size={30} color="#516163" />
          </div>

          <div
            className="bg-[#F9F6EE] bg-opacity-30 w-fit p-2 rounded-full"
            onClick={handleGetLocation}
          >
            <HiLocationMarker color="#516163" size={30} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
