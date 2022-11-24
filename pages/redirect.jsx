import React from "react";
import { useRouter } from "next/router";
import { FcSms } from "react-icons/fc";

const Redirect = () => {
  const router = useRouter();
  return (
    <div className="h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
      <div className="flex flex-col justify-center items-center pt-4"></div>
      <div className="bg-white flex flex-col justify-center items-center mx-3 border-4 shadow-inner border-blue-700 rounded-xl py-5">
        <div
          style={{ fontFamily: "'DM Sans', sans-serif" }}
          className="bg-green-500 text-white px-2 py-1 rounded-sm"
        >
          ✅ Message sent successfully 🥳
        </div>
        <div className="flex justify-center items-center mb-4">
          <FcSms style={{fontSize:"40px", boxShadow:"2px 2px 10px #a6a6a6", padding:"2px", borderRadius:"5px"}} />
        </div>
        <div className="mx-2">
          <div
            className="text-center text-sm text-blue-600"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {"Now it's your turn to create your own link🤩"}
          </div>
          <div
            className="text-center text-sm text-blue-600"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Click below to generate your secret message link
          </div>
        </div>
        <button style={{ fontFamily: "'Roboto', sans-serif" }} type="submit" className="shadow-md text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-green-500 mt-2" onClick={() => router.push("/")}>Generate My Link</button>
      </div>
    </div>
  );
};

export default Redirect;
