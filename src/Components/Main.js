import { React, useState, useEffect } from "react";
import sendicon from "../Images/message.png";
import axios from "axios";

const Main = () => {
  const [topic, setTpoic] = useState("");
  const [language, setLanguage] = useState("");
  const [result, setResult] = useState("");
  const [title, setTitle] = useState("");
  const [index, setindex] = useState(0);

  const handleLanguage = (e) => {
    setLanguage(e.target.value);
  };

  const handleChange = (e) => {
    setTpoic(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const raw = { language, topic };
    console.log(raw);
    setTitle(topic);
    setTpoic("");
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/generate_response",
        raw
      );
      console.log(res);

      setResult(res.data.generated_text);
      setindex(0);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setindex((prevIndex) => {
        if (prevIndex < result.length) {
          return prevIndex + 1;
        } else {
          clearInterval(interval);
          return prevIndex;
        }
      });
    }, 15);

    return () => clearInterval(interval);
  }, [result]);
  return (
    <div className=" py-20 h-svh flex   justify-center ">
      <div className=" md:w-[40%] ">
        <form class=" mx-auto flex justify-evenly" onSubmit={handleSubmit}>
          <select
            onChange={handleLanguage}
            class="bg-gray-50 w-[30%] md:w-[20%]   border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>Language</option>

            <option value="english">English</option>
            <option value="turkey">Turkey</option>
          </select>
          <input
            type="text"
            id="small-input"
            value={topic}
            onChange={handleChange}
            aria-describedby="helper-text-explanation"
            class="bg-gray-50   border  w-[55%] md:w-[60%] border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  px-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="enter topic"
          />
          <button>
            <img className="w-7 md:w-8 rotate-90" src={sendicon} />
          </button>
        </form>
        <h1 className="py-5 px-4 font-semibold">{title}</h1>

        <textarea
          id="w3review"
          value={result.substring(0, index)}
          className=" w-full px-8 m-auto text-justify outline-none "
          name="w3review"
          rows="20"
        ></textarea>
      </div>
    </div>
  );
};

export default Main;
