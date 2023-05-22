import React, { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Router, { useRouter } from "next/router";
import MsgCard from "../../components/MsgCard";
import { generateRandomStyle } from "../../utils/functions";
import { useSelector, useDispatch } from "react-redux";
import { Spin, message, Button } from "antd";
import { getUserMessages, deleteMessages } from "../../utils/functions";
import { setMessages, deleteAllMessages } from "../../redux/reducers/messageSlice";

const MessageBoard = () => {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const {isLoggedIn, userInfo} = useSelector((state) => state.user)
  const { messageList } = useSelector((state) => state.message)
  const [msgList, setMsgList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { uid } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      console.log('localStorage.getItem', localStorage.getItem('userId') )
      if (!localStorage.getItem('userId')) {
        router.push("/");
      } else {
        const messages = await getUserMessages(uid);
        console.log('messages', messages)
        if (messages?.msgList) {
          // dispatch(setMessages(messages.msgList));
          setMsgList(messages.msgList)
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [router, uid]);

  const handleDelete = () => {
    setMsgList([]);
    deleteMessages(uid)
    messageApi.open({
      type: "success",
      content: "Message Deleted Successfully",
    });
  }

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
                Aw, snap! 🙁
              </div>
              <div
                style={{ fontFamily: "'Fredoka One', cursive" }}
                className="text-gray-400 text-md"
              >
                No messages yet? No worries! 
              </div>
              <div
                className="mt-12 text-center text-pink-500"
                style={{ fontFamily: "'Fredoka One', cursive" }}
              >
                Share your link with friends and let the funny messages and feedbacks flood in! 😃 Keep that board laughing! 
              </div>
            </div>
          </div>
        )}
        {msgList && (
          <div className="m-2">
            {
              msgList.length >= 1 && <Button className="text-white bg-red-500 ml-4 shadow-md shadow-gray-600 mt-3 mb-5" onClick={handleDelete}>Delete Messages</Button>
            }
            {msgList &&
              msgList.map((msg, id) => {
                const currentMsgCardStyle = generateRandomStyle();
                return (
                  <MsgCard
                    key={id}
                    message={{ ...msg, id }}
                    currentMsgCardStyle={currentMsgCardStyle}
                  />
                );
              })}
          </div>
        )}
      </Spin>
    </div>
  );
};

export default MessageBoard;
