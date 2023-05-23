import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import GenerateIcon from '../../components/GenerateIcon';
import { Image, Button, message, Spin } from "antd";

const AnsPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const { uid } = router.query;
  const [username, setUsername] = useState("");
  const [msgInput, setMsgInput] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setLoading(true);
    try {
      if(msgInput.length != 0){
        const ts = `${new Date().getHours()}:${new Date().getMinutes()} ${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`
        let msgObj = {
          msg: msgInput,
          timestamp: ts
        }
        const docRef = doc(db, "users", uid);
        await updateDoc(docRef, {
          answers: arrayUnion(msgObj),
        });
        messageApi.open({
          type: "success",
          content: "Message sent successfully✅",
        });
        router.push("/redirect");
      }else {
        messageApi.open({
          type: "error",
          content: "Please type a message first",
        });
      }
    } catch (error) {
      console.log('error', error)
      setError(true);
    }
  };

  setTimeout(() => {
    setError(false);
  }, 3000);

  useEffect(() => {
    if(localStorage.getItem('userId')){
      router.push("/profile")
    } else {
      if (uid) {
        getUserInfo();
        setLoading(false);
      }
    }
  }, [getUserInfo, router, uid]);

  return (
    <div className="h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
      {contextHolder}
      <Spin spinning={loading} size="large">
      <div className="flex flex-col justify-center items-center pt-20"></div>
      <div className="bg-white flex flex-col justify-center items-center mx-3 rounded-xl py-5 shadow-md shadow-black">
        <div className="flex justify-center items-center mb-3 p-2">
        <Image
            src="https://i.ibb.co/YXw2y4T/2933124.jpg"
            width={130}
            alt="Secret message link 2023"
            preview={false}
          />
        </div>
        <div
          style={{ fontFamily: "'Varela Round', sans-serif" }}
          className="w-64 font-bold text-md mx-2 text-cyan-500 p-2 rounded-md text-center border-1 border-cyan-500 shadow-sm shadow-gray-500"
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
            className="w-64 border-1 border-cyan-500 rounded-md p-2 focus:border-green-500 focus:outline-none"
            onChange={(e) => setMsgInput(e.target.value)}
          />
        </div>
        <Button
          style={{ fontFamily: "'Roboto', sans-serif" }}
          type="submit"
          className="shadow-md text-white bg-gradient-to-r from-cyan-500 to-blue-500 h-10 px-4 py-2 rounded-xl hover:bg-green-500 w-28 mt-2 shadow-md shadow-slate-400"
          onClick={sendMsg}
        >
          Send
        </Button>
      </div>
      </Spin>
    </div>
  );
};

export default AnsPage;
