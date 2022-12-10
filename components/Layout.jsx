import React from "react";
import GenerateIcon from "./GenerateIcon";

const Layout = ({ children }) => {
  return (
    <div>
      <div
        className="text-center text-white text-xl text-center py-2 px-2 bg-blue-700 shadow-lg"
        style={{ fontFamily: "'Courgette', cursive" }}
      >
        <div className="flex justify-center items-center">
          <GenerateIcon icon="message-logo-2" size="30px" />
          <div className="ml-2">secretmessagedare.link</div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Layout;
