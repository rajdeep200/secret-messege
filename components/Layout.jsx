import React, { useState } from "react";
import { useRouter } from "next/router";
import { Image, Drawer } from "antd";

const Layout = ({ children }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <div
        className="fixed top-0 right-0 left-0 text-center text-white text-lg text-center py-2 px-4 bg-blue-700 shadow-lg"
        style={{ fontFamily: "'Nunito', sans-serif" }}
      >
        <div className="flex justify-between items-center">
          <Image
            src="https://i.ibb.co/mc8rVCP/home-2.png"
            width={30}
            alt="Secret message link 2023"
            preview={false}
            onClick={() => router.push("/")}
            className="cursor-pointer"
          />
          <div className="ml-2">SecretMessageDare.Link</div>
          <Image
            src="https://i.ibb.co/qj2Ht32/user-3.png"
            width={30}
            alt="Secret message link 2023"
            preview={false}
            onClick={showDrawer}
            className="cursor-pointer"
          />
        </div>
      </div>
      <Drawer
        width={250}
        title="Basic Drawer"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
      {children}
    </div>
  );
};

export default Layout;
