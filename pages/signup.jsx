import React, {useState} from "react";
import axios from 'axios'

const signUp = () => {
    const [name, setName] = useState("");
    const handleChange = () => {
        
    }
  return (
    <div className="h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="flex flex-col justify-center items-center h-full">
        <div className="bg-white p-8 w-4/5 shadow-xl">
          <input
            type="text"
            placeholder="Enter your name..."
            className="p-3 w-full border-1 mb-4 focus:outline-none"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <div className="w-full flex justify-center" >
            <button type="submit" className="w-1/2 bg-pink-600 p-3 rounded-2xl text-white" onClick={handleChange}>
              Create Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default signUp;
