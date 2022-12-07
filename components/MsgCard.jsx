import React from 'react';

const MsgCard = ({message, currentMsgCardStyle}) => {
  return (
    <div style={{backgroundColor:`${currentMsgCardStyle.bgColor}`, color: `${currentMsgCardStyle.textColor}` }} className="p-3 mb-4 rounded-md border-2 border-white shadow-md shadow-gray-400">
      <div style={{ fontFamily: "'DM Sans', sans-serif"}} className="overflow-scroll h-20 mb-2">{message.msg}</div>
      <div style={{ fontFamily: "'Fredoka One', cursive" }} className='w-full text-xs text-gray-800'>received at {message.timestamp}</div>
    </div>
  )
}

export default MsgCard