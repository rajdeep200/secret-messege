import React, { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Router, { useRouter } from "next/router";
import Loader from "../../components/Loader";
import MsgCard from "../../components/MsgCard";
import { generateRandomStyle } from "../../utils/functions";
import { useSelector } from "react-redux";
import { Spin, message } from "antd";
import { getUserMessages } from "../../utils/functions";

const MessageBoard = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const {isLoggedIn, userInfo} = useSelector((state) => state.user)
  const [msgList, setMsgList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { uid } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoggedIn) {
        router.push("/");
      } else {
        const messages = await getUserMessages(uid);
        if (messages?.msgList) {
          setMsgList(messages.msgList);
          setLoading(false);
        } else {
          setLoading(false);
          messageApi.open({
            type: 'error',
            content: 'Something Went Wrong',
          });
        }
      }
    };
  
    fetchData();
  }, [isLoggedIn, messageApi, router, uid]);

  return (
    <div className="mt-14">
      {contextHolder}
      <Spin spinning={loading} size="large">
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
              <div
                className="mt-12 text-center text-pink-500"
                style={{ fontFamily: "'Fredoka One', cursive" }}
              >
                Hey cheer up😃...Share your link to your friends and fill your
                board with funny messages & feedbacks😉
              </div>
            </div>
          </div>
        )}
        <div className="m-2">
          {msgList &&
            msgList.map((msg, id) => {
              const currentMsgCardStyle = generateRandomStyle();
              return (
                <MsgCard
                  key={id}
                  message={msg}
                  currentMsgCardStyle={currentMsgCardStyle}
                />
              );
            })}
        </div>
      </Spin>
    </div>
  );
};

export default MessageBoard;
