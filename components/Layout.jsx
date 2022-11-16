import React from "react";

const Layout = ({ children }) => {
  return (
    <div>
      <div
        className="text-center text-white text-xl text-center py-2 px-2 bg-blue-700 shadow-lg"
        style={{ fontFamily: "'Courgette', cursive" }}
      >
        👀 secretmessagedare.online
      </div>
      {children}
    </div>
  );
};

export default Layout;
