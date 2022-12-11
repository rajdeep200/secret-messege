import React from "react";
import GenerateIcon from "./GenerateIcon";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();
  return (
    <div>
      <div
        className="text-center text-white text-xl text-center py-2 px-2 bg-blue-700 shadow-lg"
        style={{ fontFamily: "'Courgette', cursive" }}
      >
        <div className="flex justify-center items-center" onClick={() => router.push("/")}>
          <GenerateIcon icon="message-logo-2" size="30px" />
          <div className="ml-2">SecretMessageDare.Link</div>
        </div>
      </div>
      {children}
      <div style={{ fontFamily: "'Varela Round', sans-serif" }} className="w-full flex justify-evenly items-center bg-blue-700 text-white text-md py-4">
        <p className="p-2 bg-white text-blue-700 rounded-lg" onClick={() => router.push('/about')}>🤗 About Us</p>
        <p className="p-2 bg-white text-blue-700 rounded-lg">🤙🏻 Contact Us</p>
      </div>
    </div>
  );
};

export default Layout;
