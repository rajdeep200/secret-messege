import React, { useState } from "react";
import Image from "next/image";
import { instructions } from "../constants/instructions";

export default function Home() {
  const [name, setName] = useState("")
  return (
    <div className="h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="bg-white h-5/6 flex flex-col justify-center items-center mx-3 border-4 shadow-inner border-blue-700 rounded-xl">
          <div
            className="text-xl p-2 mx-2 mb-4 bg-blue-700 border-2 border-blue-600 rounded-2xl text-white"
            style={{ fontFamily: "'Fredoka One', cursive" }}
          >
            Secret Message Dare 2022
          </div>
          <div className="mb-3" >
            <ul className="">
              {instructions.map((instruction) => (
                <li
                  key={instruction.id}
                  style={{ fontFamily: "'Varela Round', sans-serif" }}
                  className="text-sm mx-6 mb-3 font-extrabold text-purple-900"
                >
                  {instruction.instruction}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <input type="text" placeholder="Enter your name..." value={name} onChange={e => setName(e.target.value)} style={{ fontFamily: "'Roboto', sans-serif" }} className="p-3 mb-3 font-bold shadow-inner border-2 rounded-lg border-blue-600 focus:border-blue-900 focus:outline-none"/>
          </div>
          <div>
            <button style={{ fontFamily: "'Roboto', sans-serif" }} className="mb-4 shadow-md text-white bg-blue-500 px-4 py-3 rounded-xl focus:bg-blue-700" >Create My Link</button>
          </div>
        </div>
      </div>
    </div>
  );
}
