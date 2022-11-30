import React from 'react'

const MsgCard = ({message}) => {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }} className='w-full p-2 border-6 border-blue-600 text-blue-900 mb-4 rounded-md h-24 overflow-scroll shadow-md shadow-gray-500'>{message}</div>
  )
}

export default MsgCard