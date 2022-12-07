import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import GenerateIcon from '../../components/GenerateIcon'

const AnsPage = () => {
  const router = useRouter();
  const { uid } = router.query;
  const [username, setUsername] = useState("");
  const [msgInput, setMsgInput] = useState("");
  const [error, setError] = useState(false);
  const getUserInfo = async () => {
    try {
      const docRef = doc(db, "users", uid);
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
        const ts = `${new Date().getHours()}:${new Date().getMinutes()} ${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`
        let msgObj = {
          msg: msgInput,
          timestamp: ts
        }
        const docRef = doc(db, "users", uid);
        await updateDoc(docRef, {
          answers: arrayUnion(msgObj),
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
    if (uid) {
      getUserInfo();
    }
  }, [uid]);

  return (
    <div className="h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
      <div className="flex flex-col justify-center items-center pt-4"></div>
      <div className="bg-white flex flex-col justify-center items-center mx-3 border-4 shadow-inner border-blue-700 rounded-xl py-5">
        <div className="flex justify-center items-center mb-3 p-2 rounded-md shadow-md shadow-gray-400">
          <GenerateIcon icon={"message-logo-2"} size={"50px"} />
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