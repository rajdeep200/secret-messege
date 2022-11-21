import React from 'react';
import { useRouter } from "next/router";

const AnsPage = () => {
  const router = useRouter();
  const {userId} = router.query;
  console.log("userId ==>> ", userId);
  return (
    <div className="h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
      <div className="flex flex-col justify-center items-center pt-4"></div>
      <div className="bg-white flex flex-col justify-center items-center mx-3 border-4 shadow-inner border-blue-700 rounded-xl py-5">
        <div>Send secret message</div>
      </div>
    </div>
  )
}

export default AnsPage