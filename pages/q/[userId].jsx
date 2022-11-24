import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { FcSms } from "react-icons/fc";

const AnsPage = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [username, setUsername] = useState("");
  const [msgInput, setMsgInput] = useState("");
  const [error, setError] = useState(false);
  const getUserInfo = async () => {
    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setUsername(docSnap.data().username);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log("error ===>>> ", error);
    }
  };

  const sendMsg = async () => {
    try {
      if(msgInput.length != 0){
        console.log("msgInput ==>> ", msgInput);
        const docRef = doc(db, "users", userId);
        await updateDoc(docRef, {
          answers: arrayUnion(msgInput),
        });
        router.push("/redirect");
      }
    } catch (error) {
      setError(true);
    }
  };

  setTimeout(() => {
    setError(false);
  }, 3000);

  useEffect(() => {
    if (userId) {
      getUserInfo();
    }
  }, [userId]);

  return (
    <div className="h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
      <div className="flex flex-col justify-center items-center pt-4"></div>
      <div className="bg-white flex flex-col justify-center items-center mx-3 border-4 shadow-inner border-blue-700 rounded-xl py-5">
        <div className="flex justify-center items-center mb-4">
          <FcSms style={{fontSize:"40px", boxShadow:"2px 2px 10px #a6a6a6", padding:"2px", borderRadius:"5px"}} />
        </div>
        <div
          style={{ fontFamily: "'DM Sans', sans-serif" }}
          className="font-bold text-lg mx-2 bg-blue-600 text-white p-2 rounded-md text-center"
        >
          Send secret message to {username}
        </div>
        {error && (
          <div
            style={{ fontFamily: "'Roboto', sans-serif" }}
            className="font-semiBold text-white text-center text-sm p-2 bg-red-500 rounded-md mt-2"
          >
            Something went wrong!
          </div>
        )}
        <div className="mt-3">
          <textarea
            rows="4"
            placeholder="Enter message..."
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            className="w-56 border-2 border-blue-600 rounded-md p-2 focus:border-green-500 focus:outline-none"
            onChange={(e) => setMsgInput(e.target.value)}
          />
        </div>
        <button
          style={{ fontFamily: "'Roboto', sans-serif" }}
          type="submit"
          className="shadow-md text-white bg-blue-700 px-4 py-2 rounded-xl hover:bg-green-500 w-24 mt-2"
          onClick={sendMsg}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AnsPage;
