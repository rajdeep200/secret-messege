import React, { useState, useEffect } from "react";
import { instructions } from "../constants/instructions";
import { makeUserId, makeUserPassword } from "../utils/functions";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import Loader from '../components/Loader';

export default function Home() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  useEffect(() => {
    if(localStorage.getItem("userInfo")){
      router.push("/profile");
    }
  }, [router])
  
  const handleSubmit = async () => {
    setLoading(true);
    if (name === "") return;
    const userId = makeUserId(name);
    const password = makeUserPassword();
    const addedUser = await addDoc(collection(db, "users"), {
      username: name,
      userId: userId,
      password: password
    });
    if(addedUser.id){
      console.log("userId ===>>>", addedUser.id);
      localStorage.setItem("userId", addedUser.id);
      router.push("/profile");
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen loading-bar">
        <Loader />
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="bg-white flex flex-col justify-center items-center mx-3 border-4 shadow-inner border-blue-700 rounded-xl py-5">
          <div
            className="text-xl p-2 mx-2 mb-4 bg-blue-700 border-2 border-blue-600 rounded-2xl text-white"
            style={{ fontFamily: "'Fredoka One', cursive" }}
          >
            Secret Message Dare 2022
          </div>
          <div className="">
            <ul className="">
              {instructions.map((instruction) => (
                <li
                  key={instruction.id}
                  style={{ fontFamily: "'Varela Round', sans-serif" }}
                  className="text-sm mx-6 mb-5 font-extrabold text-purple-900"
                >
                  {instruction.instruction}
                </li>
              ))}
            </ul>
          </div>
          <div className="text-xl mb-2">👇🏻 👇🏻 👇🏻</div>
          <div>
            <input
              type="text"
              placeholder="Enter your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ fontFamily: "'Roboto', sans-serif" }}
              className="py-3 px-5 mb-3 font-bold shadow-inner border-2 rounded-lg border-green-600 focus:border-green-900 focus:outline-none"
            />
          </div>
          <div>
            <button
              style={{ fontFamily: "'Roboto', sans-serif" }}
              className="shadow-md text-yellow-300 bg-blue-700 px-4 py-3 rounded-xl focus:bg-blue-700"
              onClick={handleSubmit}
            >
              👉 Create My Link 👈
            </button>
          </div>
          <div style={{ fontFamily: "'Varela Round', sans-serif" }} className="text-md mt-4">Already have an account? 👉 <span className="font-bold text-blue-800 underline">Login</span></div>
        </div>
      </div>
    </div>
  );
}
