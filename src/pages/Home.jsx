import React, { useState } from "react";
import axios from "axios";
import "./Home.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [length, setLength] = useState("16");
  const [password, setPassword] = useState("");

  const apiKey = process.env.React_App_API_KEY;

  const handleGeneratePassword = () => {
    axios
      .get("https://api.api-ninjas.com/v1/passwordgenerator", {
        params: {
          length: length,
        },
        headers: {
          "X-Api-Key": apiKey,
        },
      })
      .then(function (response) {
        setPassword(response?.data?.random_password);
      })
      .catch(function (error) {
        if (error.response) {
          console.error("Error:", error.response.status, error.response.data);
        } else if (error.request) {
          console.error("Request failed:", error.request);
        } else {
          console.error("Error:", error.message);
        }
      });
  };

  const handleLengthChange = (e) => {
    setLength(e.target.value);
  };

  const handleCopyPassword = () => {
    if (!password) return;

    navigator.clipboard
      .writeText(password)
      .then(() => {
        toast.success("Password copied!");
      })
      .catch((err) => {
        toast.error("Failed to copy: ", err);
      });
  };

  const sliderStyle = {
    background: `linear-gradient(to right, rgba(9,121,20,0.6867997198879552) 0%, rgba(0,255,205,1) ${
      (length / 128) * 100
    }%, #ccc ${(length / 128) * 100}%)`,
  };

  return (
    <div className="container mx-auto mt-[10%] p-6 bg-[#F0F8FF]  shadow-2xl rounded-2xl  ">
      <div className="text-5xl font-bold text-center mb-8">
        <span className="text-gradient">Password Generator</span>
      </div>
      <div className="flex items-center justify-center mb-6">
        <input
          type="range"
          className="w-64 bg-gray-300 rounded-lg overflow-hidden appearance-none focus:outline-none"
          value={length}
          onChange={handleLengthChange}
          min="1"
          max="128"
          id="lengthSlider"
          style={sliderStyle}
        />
        <span className="ml-4">{length}</span>
      </div>
      <div className="flex justify-center mb-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-600 lg:w-auto bg-primary-500 dark:bg-primary-400 shadow-primaryShadow mb-1 hover:bg-primary-600 dark:hover:bg-primary-300 hover:shadow-primaryHover active:shadow-primaryActive transition-all duration-150 active:translate-y-2 items-center justify-center font-semibold text-inline border-blue-950 active:border-transparent border-b-8 select-none focus:outline-none inline-flex"
          onClick={handleGeneratePassword}
        >
          Generate Password
        </button>
      </div>
      <div className="text-center">
        {password && (
          <div className="text-lg bg-gray-200 p-4 rounded-3xl break-all sm:w-3/4 lg:w-1/2 xl:w-1/3 mx-auto">
            <strong className="text-blue-600 block mb-2 text-2xl">
              Generated Password:
            </strong>
            <span className="text-gray-900">{password}</span>
          </div>
        )}
      </div>
      {password && (
        <div className="flex justify-center mb-6 mt-6">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-600 lg:w-auto bg-primary-500 dark:bg-primary-400 shadow-primaryShadow mb-1 hover:bg-primary-600 dark:hover:bg-primary-300 hover:shadow-primaryHover active:shadow-primaryActive transition-all duration-150 active:translate-y-2 items-center justify-center font-semibold text-inline border-blue-950 active:border-transparent border-b-8 select-none focus:outline-none inline-flex"
            onClick={handleCopyPassword}
          >
            Copy Password !!
          </button>
          <ToastContainer />
        </div>
      )}
    </div>
  );
};

export default Home;
