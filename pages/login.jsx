import React, { useState } from "react";
import {
  getDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useRouter } from "next/router";

const Login = () => {
  // Test userId ==>> Raj040756
  // Test password ==>> 0wx34i8m
  const [userId, setUserId] = useState("");
  const [userDocId, setUserDocId] = useState("");
  const [password, setPassword] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const router = useRouter();
  const handleLogin = async () => {
    try {
      let gg = userId;
      const docRef = collection(db, "users");
      const q = query(docRef, where("userId", "==", gg));
      const querySnapshot = await getDocs(q);
      let userObj = {};
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        localStorage.setItem("userId", doc.id);
        setUserInfo(doc.data());
        userObj = doc.data();
      });
      console.log("userInfo 28 ===>> ", userObj);
      if (userObj.userId === userId && userObj.password === password) {
        console.log("userInfo 30 ===>>> ", userInfo);
        localStorage.setItem("userInfo", JSON.stringify(userObj));
        setLoading(false);
        setUserId("");
        setPassword("");
        router.push("/profile");
      } else {
        setErrorMsg("User Id or Password is wrong");
      }
    } catch (error) {
      console.log("error ==>> ", error);
    }
  };
  setTimeout(() => {
    setErrorMsg(null);
  }, 3000);
  return (
    <div className="h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
      <div className="flex flex-col justify-center items-center pt-4">
        <div className="bg-white flex flex-col justify-center items-center mx-3 border-4 shadow-inner border-blue-700 rounded-xl py-5">
          <div
            style={{ fontFamily: "'Fredoka One', cursive" }}
            className="text-xl p-2 mx-2 mb-4 bg-blue-700 border-2 border-blue-600 rounded-2xl text-white"
          >
            Login
          </div>
          {errorMsg && (
            <p
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              className="bg-red-500 p-1 font-semibold text-white rounded-md"
            >
              {errorMsg}
            </p>
          )}
          <div className="flex flex-col justifuy-center items-center mx-8 my-4">
            <input
              type="text"
              placeholder="Enter User Id..."
              className="py-3 px-5 mb-3 shadow-inner border-2 rounded-lg border-green-600 focus:border-green-900 focus:outline-none"
              onChange={(e) => setUserId(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter Password..."
              className="py-3 px-5 mb-3 shadow-inner border-2 rounded-lg border-green-600 focus:border-green-900 focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              style={{ fontFamily: "'Roboto', sans-serif" }}
              className="shadow-md text-yellow-300 bg-blue-700 px-4 py-3 rounded-xl focus:bg-blue-700"
              onClick={handleLogin}
            >
              👉 Login 👈
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
