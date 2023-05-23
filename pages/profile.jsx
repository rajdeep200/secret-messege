/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  FaWhatsapp,
  FaTwitterSquare,
  FaFacebookSquare,
  FaPinterestP,
  FaLinkedinIn,
  FaTumblr,
  FaEnvelope
} from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button, Image, Input, Space, Spin, message } from "antd";
import { useDispatch } from "react-redux";

const Profile = () => {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [linkValue, setLinkValue] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      router.push("/");
    }
    setUserId(localStorage.getItem("userId"));
    const userObj = JSON.parse(localStorage.getItem("userInfo"))
    setUserInfo(userObj);
    setLinkValue(`${window.location.origin}/q/${userId}`);
    if(userInfo){
      setLoading(false);
    }
  }, [router, userId, userInfo]);

  const handleAccordion = () => {
    setExpanded(!expanded);
  };

  if (linkCopied) {
    setTimeout(() => {
      setLinkCopied(false);
    }, 3000);
  }

  const sentToLink = (key) => {
    switch (key) {
      case "WHATSAPP":
        window.open(
          `https://api.whatsapp.com/send?text=🙋‍♂️Hey!!! It's ${userInfo.username}, Wanna tell something to me? Now is the right time😎, Send me a secret message n I'll never know who sent it to me. It's fun😁 Try here 👉 ${linkValue}`
        );
        break;
      case "FACEBOOK":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${linkValue}`
        );
        break;
      case "TWITTER":
        window.open(
          `https://twitter.com/intent/tweet?text=🙋‍♂️Hey!!! It's ${userInfo.username}, Wanna tell something to me? Now is the right time😎, Send me a secret message n I'll never know who sent it to me. It's fun😁 Try here 👉 ${linkValue}`
        );
        break;
      case "PINTEREST":
        window.open(`http://pinterest.com/pin/create/button/?url=${linkValue}`);
        break;
      case "LINKEDIN":
        window.open(
          `http://www.linkedin.com/shareArticle?mini=true&url=${linkValue}`
        );
        break;
      case "TUMBLR":
        window.open(`http://www.tumblr.com/share?v=3&u=${linkValue}`);
        break;
      default:
        break;
    }
  };

  return (
    <div className="px-1 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      {contextHolder}
      <Spin spinning={loading} size="large">
        <div className="bg-white flex flex-col justify-center items-center shadow-inner rounded-xl py-4 mt-12 mx-2 ">
          <div className="mb-3">
            <Image
              src="https://i.ibb.co/Tw2kvPP/user-6.png"
              width={80}
              alt="Secret message link 2023"
              preview={false}
              className="cursor-pointer"
            />
          </div>
          <Space className="mb-4 mt-1">
            <Button className="p-5 flex justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" onClick={() => router.push(`/messages/${userId}`)}>
              <div>
                <FaEnvelope size="15px" color="white"/>
              </div>
              <div className="ml-2 text-white" style={{ fontFamily: "'Varela Round', sans-serif" }}>Message Board</div>
            </Button>
          </Space>
          <div></div>
          <Space direction="vertical" className="w-10/12" size={10}>
            <div>
              <p className="text-gray-500 text-xs mb-1">User Id</p>
              <Input
                value={userInfo?.userId}
                className="p-3 border-1 border-b-slate-300 rounded-md shadow-inner shadow-slate-400 focus:border-none active:shadow-md active:shadow-slate-400 text-gray-600"
              />
            </div>
            <div>
              <p className="text-gray-500 text-xs mb-1">Password</p>
              <Input
                value={userInfo?.password}
                className="p-3 border-1 border-b-slate-300 rounded-md shadow-inner shadow-slate-400 focus:border-none active:shadow-md active:shadow-slate-400 text-gray-600"
              />
            </div>
          </Space>

          <div className="w-10/12 mt-5 h-full">
            <div className="font-normal mb-1 text-cyan-600">Secret Link:</div>
            <Input
              type="text"
              className="w-full p-3 border-1 rounded-md focus:border-cyan-700 focus:outline-none border-cyan-500 text-gray-700"
              value={linkValue}
            />
            <div className="flex flex-col justify-center items-center mt-2">
              <CopyToClipboard
                text={linkValue}
                onCopy={() => {
                  messageApi.open({
                    type: "success",
                    content: "Link Copied Successfully",
                  });
                }}
              >
                <button
                  type="submit"
                  className="w-1/2 flex items-center justify-center py-3 rounded-xl shadow-sm shadow-slate-500 text-white bg-gradient-to-r from-cyan-500 to-blue-500"
                >
                  <FaRegCopy size="20px" color="white" />
                  <span className="text-white font-semibold ml-1">
                    Copy the link
                  </span>
                </button>
              </CopyToClipboard>
            </div>
            {/* <div className="border-2 border-fuchsia-500 my-2 py-2 rounded-md">
              <div
                className="text-center text-xs p-1 text-fuchsia-500 font-bold"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Go to message board📨 & check all your messages 🤩
              </div>
              <div className="text-center">👇👇👇</div>
              <div className="flex flex-col justify-center items-center mt-2">
                <button
                  type="submit"
                  className="bg-fuchsia-500 w-1/2 flex items-center justify-center items-center py-2 rounded-md"
                >
                  <span
                    className="text-white font-semibold ml-1"
                    onClick={() => router.push(`/messages/${userId}`)}
                  >
                    Show Messages 😄
                  </span>
                </button>
              </div>
            </div> */}
            <div
              className="flex justify-center bg-green-400 mt-4 rounded-md"
              onClick={() => sentToLink("WHATSAPP")}
            >
              <button className="flex justify-center items-center p-2">
                <span>
                  <FaWhatsapp
                    style={{
                      fontSize: "25px",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  />
                </span>
                <span
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                  className="ml-1 font-bold text-white"
                >
                  Add to story
                </span>
              </button>
            </div>
            <div
              className="flex justify-center bg-blue-600 mt-2 rounded-md"
              onClick={() => sentToLink("FACEBOOK")}
            >
              <button className="flex justify-center items-center p-2">
                <span
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                  className="ml-1 font-bold text-white"
                >
                  Share on
                </span>
                <span className="ml-1">
                  <FaFacebookSquare
                    style={{
                      fontSize: "25px",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  />
                </span>
              </button>
            </div>
            <div
              className="flex justify-center bg-sky-400 mt-2 rounded-md"
              onClick={() => sentToLink("TWITTER")}
            >
              <button className="flex justify-center items-center p-2">
                <span
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                  className="ml-1 font-bold text-white"
                >
                  Share on
                </span>
                <span className="ml-1">
                  <FaTwitterSquare
                    style={{
                      fontSize: "25px",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  />
                </span>
              </button>
            </div>
            <div className="mt-2 flex justify-center items-center">
              <span
                className="p-2 bg-rose-800 mx-2 rounded-md"
                onClick={() => sentToLink("PINTEREST")}
              >
                <FaPinterestP
                  style={{
                    fontSize: "25px",
                    fontWeight: "bold",
                    color: "white",
                  }}
                />
              </span>
              <span
                className="p-2 bg-sky-700 mx-2 rounded-md"
                onClick={() => sentToLink("LINKEDIN")}
              >
                <FaLinkedinIn
                  style={{
                    fontSize: "25px",
                    fontWeight: "bold",
                    color: "white",
                  }}
                />
              </span>
              <span
                className="p-2 bg-sky-900 mx-2 rounded-md"
                onClick={() => sentToLink("TUMBLR")}
              >
                <FaTumblr
                  style={{
                    fontSize: "25px",
                    fontWeight: "bold",
                    color: "white",
                  }}
                />
              </span>
            </div>
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default Profile;
