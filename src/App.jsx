import { useState } from "react";

const apiKey = import.meta.env.VITE_API_KEY


function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const image =
    "https://cdn.pixabay.com/photo/2018/05/30/00/24/thunderstorm-3440450_960_720.jpg";


  const searchLocation = async (e) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();
    setData(data);

    setLocation("");
  };

  const handleInput = (e) => {
    setLocation(e.target.value);
  };

  return (
    <>
      <div className="container flex flex-col justify-between max-w-lg mx-auto mt-4 relative">
        <div className="w-full h-[700px] absolute bg-[#2e3b46]/50">
          <img
            src={`${image}`}
            alt="Bg Image"
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>

        <div className=" flex flex-col justify-center z-10 mt-4 px-2">
          <input
            className="text-md capitalize placeholder:placeholder-slate-500 px-2 py-4 border border-slate-600 rounded-lg"
            type="text"
            name="location"
            value={location}
            onChange={(e) => handleInput(e)}
            placeholder="Enter location"
          />
          <button
            className="w-[20%] mx-auto mt-3 px-4 py-2 text-gray-500 font-bold bg-[#f87171] rounded-xl"
            onClick={(e) => searchLocation(e)}
          >
            Search
          </button>
        </div>

        <div className="text-slate-300 flex justify-between mt-4 px-2 z-10">
          <div className="py-4 px-2">
            <p className="font-bold uppercase">{data.name}</p>
            <p className="font-bold text-2xl">
              {data.main ? <span>{data.main.temp}°C</span> : null}
            </p>
          </div>

          <p className="rotate-45 font-bold capitalize mr-4">
            {data.weather ? data.weather[0].main : null}
          </p>
        </div>

        <div className="flex justify-around mt-4 mx-2 py-4 rounded-lg bg-slate-100/90 z-10">
          <p className="flex flex-col justify-center">
            Feel
            {data.main ? <span>{data.main.feels_like}°C</span> : null}
          </p>

          <p className="flex flex-col justify-center">
            Humidity
            {data.main ? <span>{data.main.humidity}%</span> : null}
          </p>

          <p className="flex flex-col justify-center">
            Wind
            {data.wind ? (
              <span>{(data.wind.speed / 0.514).toFixed(2)}m/s</span>
            ) : null}
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
