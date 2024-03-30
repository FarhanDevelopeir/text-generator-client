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
    setTpoic('')
    setTitle(topic);
   
    try {
      const res = await axios.post(
        "http://127.0.0.1:5000//translate",
        { 'text': topic }
      );
      console.log(res.data.translated_text);

      setResult(res.data.translated_text);
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
    <div className="h-svh bg-gray-400">
      <div className=" py-16 h-svh  ">
      <h1 className="text-3xl font-semibold text-center drop-shadow-xl mb-8">Translate Italian to English</h1>

      <div className="relative m-auto shadow-2xl shadow-slate-100 w-[90%] sm:w-[60%] md:w-[43%] lg:w-[35%] xl:w-[27%] border-double border-[9px] border-gray-600 rounded-[40px]  ">
        <div className=" absolute bg-gray-700 h-14 flex justify-center items-center   w-full rounded-t-[30px]">
          <div className=" h-2 w-[20%] bg-white rounded-md"></div>
          <div className="h-2 w-2 ml-2 bg-white rounded-full"></div>
        </div>
      <div className="p-2">
      <form class=" mx-auto flex justify-around mt-20 " onSubmit={handleSubmit}>
          <input
            type="text"
            id="small-input"
            value={topic}
            onChange={handleChange}
            aria-describedby="helper-text-explanation"
            class="bg-g   border border-black w-[80%]  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  px-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
          className=" bg-gray-400 text-black font-semibold text-[13px] overflow-hidden w-full md:px-4 m-auto text-justify outline-none "
          name="w3review"
          rows="16"
        ></textarea>
      </div>
      </div>
    </div>
    </div>
    
  );
};

export default Main;
