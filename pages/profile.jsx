/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { collection, getDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Loader from "../components/Loader";

const Profile = () => {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [userInfo, setUserInfo] = useState({});
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
  }, [router, userId]);

  const handleAccordion = () => {
    setExpanded(!expanded);
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen loading-bar">
        <Loader />
      </div>
    );
  }

  return (
    <div className="h-screen p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white flex flex-col justify-center items-center border-4 shadow-inner border-blue-700 rounded-xl py-4">
        <div
          style={{ fontFamily: "'DM Sans', sans-serif" }}
          className="text-lg font-bold bg-blue-700 px-3 py-1 text-yellow-200"
        >
          My Profile
        </div>
        <div
          className="flex justify-between items-center w-8/12 mt-2 border-blue-700 border-2 py-1 px-2 rounded"
          onClick={handleAccordion}
        >
          <div>Show profile details</div>
          <div>{expanded ? <FaAngleUp /> : <FaAngleDown />}</div>
        </div>
        <div className="w-8/12">
          {expanded && (
            <div className="w-full border-dashed border-blue-700 border-x-2 border-b-2 flex justify-center items-center bg-yellow-200">
              <div className="my-2">
                <div className="font-extrabold text-violet-900" style={{ fontFamily: "'Varela Round', sans-serif" }}>Username: {userInfo.username}</div>
                <div className="font-extrabold text-violet-900" style={{ fontFamily: "'Varela Round', sans-serif" }}>Password: {userInfo.password}</div>
              </div>
            </div>
          )}
        </div>
        <div>
          <input type="text" />
          <button type="submit">Copy</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
