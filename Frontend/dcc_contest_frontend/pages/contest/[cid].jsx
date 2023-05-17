import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import axios from 'axios';

import Navbar from '../../components/Navbar';
import ProblemTable from '../../components/contest/problemTable';

const ContestProblem = () => {

  const router = useRouter();
  const { cid } = router.query;

  const [contestId, setContestId] = useState('');
  const [problems, setProblems] = useState([])

  useEffect(() => {
    setContestId(cid);
    if (cid) {
      axios.get(`http://localhost:5000/contest/CPTITAN-DEV-001`).then((res) => {
        console.log(res.data)
        setProblems(res.data.quesIds)
      }).catch((err) => {
        console.log(err)
      })
    }
  }, [cid])

  return (
    <div className='absolute'>
      <Navbar />
      <ProblemTable problems={problems} />
    </div>
  )
}

export default ContestProblem