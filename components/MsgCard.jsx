import React from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteMessage } from "../redux/reducers/messageSlice";

const MsgCard = ({ message, currentMsgCardStyle }) => {
  const dispatch = useDispatch();
  // console.log('message', message)
  const handleDelete = id => {
    console.log('e', id)
    dispatch(deleteMessage(id));
  }
  return (
    <div
      style={{
        backgroundColor: `${currentMsgCardStyle.bgColor}`,
        color: `${currentMsgCardStyle.textColor}`,
      }}
      className="p-3 mb-5 mx-3 rounded-md border-2 border-white shadow-md shadow-gray-400"
    >
      <div
        style={{ fontFamily: "'DM Sans', sans-serif" }}
        className="overflow-scroll h-32 mb-2"
      >
        {message?.msg}
      </div>
      <div className="flex justify-between items-center">
        <div
          style={{ fontFamily: "'Varela Round', sans-serif" }}
          className="w-full text-xs text-gray-800"
        >
          received at {message?.timestamp}
        </div>
      </div>
    </div>
  );
};

export default MsgCard;
