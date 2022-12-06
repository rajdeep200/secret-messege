import React from 'react';
import { useRouter } from "next/router";

const demo = () => {
  const router = useRouter();
  const {qid} = router.query;
  return (
    <div>qid : {qid}</div>
  )
}

export default demo