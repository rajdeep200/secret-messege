import React from "react";
import { useRouter } from "next/router";
import { FcSms } from "react-icons/fc";
import GenerateIcon from '../components/GenerateIcon'
import { Image, Button, message, Spin } from "antd";

const Redirect = () => {
  const router = useRouter();
  return (
    <div className="h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center"></div>
      <div className="bg-white flex flex-col justify-center items-center mx-3 border-4 shadow-inner border-blue-700 rounded-xl py-8 px-4">
        <div
            className="text-center text-lg text-blue-700 mb-1 bg-yellow-200 px-2 rounded"
            style={{ fontFamily: "'Bungee Shade', cursive" }}
          >
            {"Now it's your turn"}
          </div>
          <div
            className="text-center text-md text-cyan-600 mb-1"
            style={{ fontFamily: "'Varela Round', sans-serif" }}
          >
            {"Create your own link"}
          </div>
        <div className="flex justify-center items-center mb-4">
          <Image
            src="https://i.ibb.co/rZhksXj/3856358.jpg"
            width={220}
            alt="Secret message link 2023"
            preview={false}
          />
        </div>
        <div className="mx-2 px-2 flex flex-col justify-center items-center">
          <div
            className="w-9/12 text-center text-md text-white bg-amber-500 py-1"
            style={{ fontFamily: "'Vast Shadow', cursive" }}
          >
           Click Below
          </div>
          <div
            className="text-center text-md text-cyan-600"
            style={{ fontFamily: "'Varela Round', sans-serif" }}
          >
           Generate your secret message link
          </div>
        </div>
        <Button style={{ fontFamily: "'Roboto', sans-serif" }} type="submit" className="text-lg shadow-md shadow-slate-600 h-12 text-white bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 rounded-md hover:bg-green-500 mt-2" onClick={() => router.push("/")}>Generate My Link</Button>
      </div>
    </div>
  );
};

export default Redirect;
