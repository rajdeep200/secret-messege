import React, { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Router, { useRouter } from "next/router";
import Loader from "../../components/Loader";
import MsgCard from "../../components/MsgCard";
import { generateRandomStyle } from "../../utils/functions";

const MessageBoard = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({});
  const [msgList, setMsgList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { uid } = router.query;
  console.log("uid ==>> ", uid);

  const getUserInfo = async () => {
    try {
      let gg = uid;
      const docRef = doc(db, "users", gg);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setUserInfo(docSnap.data());
        console.log("messages ==>> ", docSnap.data().answers);
        if (docSnap.data()?.answers) {
          setMsgList(docSnap.data().answers);
        }
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
    if (uid) {
      getUserInfo();
    }
  }, [uid]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen backdrop-opacity-10">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <div
        className="bg-blue-600 text-white w-2/3 text-center py-1 mt-2 ml-2 rounded-md"
        onClick={() => router.push("/profile")}
      >
        ⬅ Back to Profile
      </div>
      {msgList && msgList.length < 1 && (
        <div className="flex justify-center items-center">
          <div className="p-5 mt-10">
            <div
              style={{ fontFamily: "'Fredoka One', cursive" }}
              className="text-gray-400 text-md"
            >
              Sorry🙁...
            </div>
            <div
              style={{ fontFamily: "'Fredoka One', cursive" }}
              className="text-gray-400 text-md"
            >
              You didn't receive any messages yet
            </div>
            <div className="mt-12 text-center text-pink-500" style={{ fontFamily: "'Fredoka One', cursive" }}>Hey cheer up😃...Share your link to your friends and fill your board with funny messages & feedbacks😉</div>
          </div>
        </div>
      )}
      <div className="m-2">
        {msgList &&
          msgList.map((msg, id) => {
            const currentMsgCardStyle = generateRandomStyle();
            console.log("currentMsgCardStyle ==>>> ", currentMsgCardStyle);
            return (
              <MsgCard
                key={id}
                message={msg}
                currentMsgCardStyle={currentMsgCardStyle}
              />
            );
          })}
      </div>
    </div>
  );
};

export default MessageBoard;
