import React from 'react';

const MsgCard = ({message, currentMsgCardStyle}) => {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", backgroundColor:`${currentMsgCardStyle.bgColor}`, color: `${currentMsgCardStyle.textColor}` }} className={"w-full p-3 mb-4 rounded-md h-24 overflow-scroll shadow-md shadow-gray-400 border-2"}>{message}</div>
  )
}

export default MsgCard