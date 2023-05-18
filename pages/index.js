import React, { useState, useEffect } from "react";
import { Image } from "antd";
import { makeUserId, makeUserPassword } from "../utils/functions";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import Loader from "../components/Loader";

export default function Home() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      router.push("/profile");
    }
  }, [router]);

  const handleSubmit = async () => {
    setLoading(true);
    if (name === "") return;
    const userId = makeUserId(name);
    const password = makeUserPassword();
    const addedUser = await addDoc(collection(db, "users"), {
      username: name,
      userId: userId,
      password: password,
    });
    if (addedUser.id) {
      console.log("userId ===>>>", addedUser.id);
      localStorage.setItem("userId", addedUser.id);
      router.push("/profile");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen loading-bar">
        <Loader />
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center">
      <div className="">
        <div className="bg-white flex flex-col justify-center items-center mx-3 rounded-xl py-5 px-8 mt-6">
          <div
            className="text-lg px-3 py-2 mx-2 mb-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl text-white"
            style={{ fontFamily: "'Varela Round', sans-serif" }}
          >
            Secret Message Dare 2023
          </div>
          <div
            style={{ fontFamily: "'Varela Round', sans-serif" }}
            className="text-cyan-500 text-center text-sm mb-3"
          >
            Below are the steps to create your link
          </div>
          <div>
            <Image
              width={200}
              alt="Secret Message Link Creation Steps"
              src="https://i.ibb.co/mF38Ywd/site-promo-steps.png"
            />
          </div>
          <div>
            <Image
              width={100}
              preview={false}
              alt="Secret message link 2023"
              src="https://i.ibb.co/8NBTt4s/waist-up-shot-excited-confident-charming-brunet-man-with-beard-moustache-pointing-down-smiling-broad.png"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ fontFamily: "'Roboto', sans-serif" }}
              className="py-3 px-5 mb-3 shadow-inner shadow-black rounded-lg border-green-600 focus:border-green-900 focus:outline-none"
            />
          </div>
          <div>
            <button
              style={{ fontFamily: "'Varela Round', sans-serif" }}
              className="shadow-md text-white bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 rounded-xl focus:bg-blue-700"
              onClick={handleSubmit}
            >
              Create My Link
            </button>
          </div>
          <div
            style={{ fontFamily: "'Varela Round', sans-serif" }}
            className="text-md mt-4 text-gray-500 flex justify-center items-center"
          >
            Already have an account?
            <span
              className="font-bold text-black bg-gray-200 rounded-lg py-1 px-2 flex justify-center items-center ml-1 cursor-pointer"
              onClick={() => router.push("/login")}
            >
              <Image width={15} src="https://i.ibb.co/NZVqvcS/user.png" preview={false} alt="Secret message link 2023" />
              <div className="text-sm ml-1 text-gray-600">Login</div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
