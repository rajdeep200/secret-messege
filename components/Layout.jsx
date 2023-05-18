import React, { useState } from "react";
import { useRouter } from "next/router";
import { Image, Drawer, Space, Button } from "antd";

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
        width={280}
        placement="right"
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button
              className="shadow-md text-white bg-gradient-to-r from-cyan-500 to-blue-500"
              onClick={() => {
                router.push("/login");
                setOpen(false);
              }}
            >
              Login
            </Button>
            <Button
              className="shadow-md text-white bg-gradient-to-r from-cyan-500 to-blue-500"
              onClick={() => {
                router.push("/");
                setOpen(false);
              }}
            >
              Sign Up
            </Button>
          </Space>
        }
        bodyStyle={{
          paddingBottom: 50,
        }}
      >
        <div
          className="flex items-center w-full border-1 border-cyan-200 px-3 py-3 mb-5 rounded-md shadow-md shadow-slate-300 active:shadow-inner active:shadow-slate-300"
          onClick={() => {
            router.push("/about");
            setOpen(false);
          }}
        >
          <Image
            src="https://i.ibb.co/zPFJv6n/information.png"
            width={20}
            alt="Secret message link 2023"
            preview={false}
            className="cursor-pointer"
          />
          <div className="ml-2">About Us</div>
        </div>
        <div className="flex items-center w-full border-1 border-cyan-300 px-3 py-3 mb-5 rounded-md shadow-md shadow-slate-300 active:shadow-inner active:shadow-slate-300">
          <Image
            src="https://i.ibb.co/MNPqZdh/headphones.png"
            width={20}
            alt="Secret message link 2023"
            preview={false}
            // onClick={() => router.push("/")}
            className="cursor-pointer"
          />
          <div className="ml-2">Contact Us</div>
        </div>
        <div className="flex items-center w-full border-1 border-cyan-400 px-3 py-3 mb-5 rounded-md shadow-md shadow-slate-300 active:shadow-inner active:shadow-slate-300">
          <Image
            src="https://i.ibb.co/s9JbpvT/privacy-policy.png"
            width={20}
            alt="Secret message link 2023"
            preview={false}
            // onClick={() => router.push("/")}
            className="cursor-pointer"
          />
          <div className="ml-2">Privacy Policy</div>
        </div>
        <div className="flex items-center w-full border-1 border-cyan-500 px-3 py-3 mb-5 rounded-md shadow-md shadow-slate-300 active:shadow-inner active:shadow-slate-300">
          <Image
            src="https://i.ibb.co/4Wn3bYY/terms-and-conditions.png"
            width={20}
            alt="Secret message link 2023"
            preview={false}
            // onClick={() => router.push("/")}
            className="cursor-pointer"
          />
          <div className="ml-2">Terms & Conditions</div>
        </div>
      </Drawer>
      {children}
    </div>
  );
};

export default Layout;
