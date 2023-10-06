import React from "react";
import thunderImage from "../assets/thunder.svg";
import DayImage from "../assets/day.svg";
import rainyImage from "../assets/rainy-4.svg";
import snowlyImage from "../assets/snowy-5.svg";

const WeatherImage = ({ weatherCode }) => {
  const getImageUrl = (code) => {
    // Define your mapping of weather codes to image URLs here
    if (code === 200 || (code >= 230 && code <= 232)) {
      return thunderImage;
    } else if ((code >= 300 && code <= 321) || (code >= 500 && code <= 531)) {
      return rainyImage;
    } else if (code >= 600 && code <= 622) {
      return snowlyImage;
    } else {
      return DayImage;
    }
  };

  const imageUrl = getImageUrl(weatherCode);
  return <img src={imageUrl} alt="Weather" className="w-full h-auto" />;
};

export default WeatherImage;
