/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Loader from "../components/Loader";
import {
  FaRegCopy,
} from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Profile = () => {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [linkValue, setLinkValue] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  const router = useRouter();
  const getUserInfo = async () => {
    try {
      let gg = userId;
      const docRef = doc(db, "users", gg);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setUserInfo(docSnap.data());
        localStorage.setItem("userInfo", JSON.stringify(docSnap.data()));
        setLoading(false);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log("error ===>>> ", error);
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      router.push("/");
    }
    setUserId(localStorage.getItem("userId"));
    getUserInfo();
    setLinkValue(`${window.location.origin}/q/${userId}`)
  }, [router, userId]);

  const handleAccordion = () => {
    setExpanded(!expanded);
  };

  if (linkCopied) {
    setTimeout(() => {
      setLinkCopied(false);
    }, 3000);
  }

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen backdrop-opacity-10">
        <Loader />
      </div>
    );
  }

  return (
    <div className="h-screen px-1 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white flex flex-col justify-center items-center border-4 shadow-inner border-blue-700 rounded-xl py-4">
        <div
          style={{ fontFamily: "'DM Sans', sans-serif" }}
          className="text-lg font-bold bg-blue-700 px-3 py-1 text-white"
        >
          🔥 My Profile 🔥
        </div>
        <div
          className="flex justify-between items-center w-10/12 mt-2 border-blue-700 border-2 py-1 px-2 rounded bg-yellow-200"
          onClick={handleAccordion}
        >
          <div className="" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Show Login Details
          </div>
          <div>{expanded ? <FaAngleUp /> : <FaAngleDown />}</div>
        </div>
        <div className="w-10/12">
          {expanded && (
            <div className="w-full py-1 border-dashed border-blue-700 border-x-2 border-b-2 bg-sky-200">
              <div className="my-2 w-full">
                <div className="flex justify-center items-center mb-2">
                  {" "}
                  <p className="" style={{ fontFamily: "'Rubik', sans-serif" }}>
                    User ID:
                  </p>{" "}
                  <p className="ml-2 bg-black text-white px-1 rounded">
                    {userInfo.userId}
                  </p>{" "}
                </div>
                <div className="flex justify-center items-center">
                  {" "}
                  <p className="" style={{ fontFamily: "'Rubik', sans-serif" }}>
                    Pin:
                  </p>{" "}
                  <p className="ml-2 bg-black text-white px-1 rounded">
                    {userInfo.password}
                  </p>{" "}
                </div>
              </div>
              <div className="py-1 bg-white">
                <div
                  style={{ fontFamily: "'Hind Madurai', sans-serif" }}
                  className="text-md text-center font-bold px-2 "
                >
                  Please take a screenshot 📸 of these details
                </div>
                <div className="text-sm text-center">
                  These credentials are required to log in from anywhere! PIN
                  cannot be changed back!
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="w-10/12 mt-1">
          <div className="text-center font-normal mb-1 text-blue-700">
            Share this link with your friends and get anonymus feedbacks
          </div>
          {linkCopied && (
            <div className="bg-green-400 text-white text-center mb-1 p-1 rounded-md">
              🎉 Link copied successfully 🎉
            </div>
          )}
          <input
            type="text"
            className="w-full bg-stone-100 p-2 border-2 rounded-md focus:border-green-600 focus:outline-none border-green-500"
            value={linkValue}
          />
          <div className="flex flex-col justify-center items-center mt-2">
            <CopyToClipboard text={linkValue} onCopy={() => setLinkCopied(true)}>
              <button
                type="submit"
                className="bg-stone-500 w-1/2 flex items-center justify-center items-center py-2 rounded-md"
              >
                <FaRegCopy size="20px" color="white" />
                <span className="text-white font-semibold ml-1">
                  Copy the link
                </span>
              </button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
