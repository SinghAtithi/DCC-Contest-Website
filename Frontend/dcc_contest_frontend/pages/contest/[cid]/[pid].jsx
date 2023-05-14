import React from "react";
import { useRouter } from "next/router";
import ContestProblem from "./ContestProblem";

function ContestProblemIndex() {
  const router = useRouter();
  const { pid, cid } = router.query;
  return (
    <div>
      {pid}
      <ContestProblem pid={pid} cid={cid} />
    </div>
  );
}

export default ContestProblemIndex;
