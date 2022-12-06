import React from 'react';
import { useRouter } from "next/router";

const Demo = () => {
  const router = useRouter();
  const {qid} = router.query;
  return (
    <div>qid : {qid}</div>
  )
}

export default Demo