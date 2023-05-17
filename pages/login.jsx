import React, { useState } from "react";
import { Input, Button, Image } from "antd";
import { collection, query, where, getDocs } from "firebase/firestore";
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
    <div className="h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center pt-4 mx-3">
        <div className="bg-white flex flex-col justify-center items-center w-full mx-2 shadow-inner rounded-xl py-5 shadow-lg shadow-black">
          <div
            style={{ fontFamily: "'Varela Round', sans-serif" }}
            className="text-xl text-center w-1/2 py-2 px-4 mx-5 mb-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white"
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
          <div>
            <Image
              width={80}
              src="https://i.ibb.co/W5qPQpN/password.png"
              alt="Secret message link 2023"
            />
          </div>
          <div className="flex flex-col justifuy-center items-center mx-8 my-4">
            {/* <input
              type="text"
              placeholder="Enter User Id..."
              className="py-3 px-5 mb-3 shadow-inner border-2 rounded-lg border-green-600 focus:border-green-900 focus:outline-none"
              onChange={(e) => setUserId(e.target.value)}
            /> */}
            <Input
              className="py-3 px-5 mb-3 shadow-inner border-2 text-md rounded-lg shadow-green-500 focus:border-green-500 focus:outline-none"
              placeholder="Enter User Id..."
              onChange={(e) => setUserId(e.target.value)}
              value={userId}
            />
            <Input
              className="py-3 px-5 mb-3 shadow-inner border-2 text-md rounded-lg shadow-green-500 focus:border-green-500 focus:outline-none"
              placeholder="Enter Password..."
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
            />
            {/* <input
              type="password"
              placeholder="Enter Password..."
              className="py-3 px-5 mb-3 shadow-inner border-2 rounded-lg border-green-600 focus:border-green-900 focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
            /> */}
            <Button
              style={{ fontFamily: "'Roboto', sans-serif" }}
              className="w-full shadow-md text-white bg-blue-500 rounded-md h-10 focus:bg-blue-700"
              onClick={handleLogin}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
