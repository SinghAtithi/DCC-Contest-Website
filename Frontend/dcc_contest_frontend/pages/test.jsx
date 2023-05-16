import React from 'react';
import QuestionSkeleton from '../components/skeleton/QuestionSkeleton';
import Navbar from '../components/Navbar';
import CreateProblemSkeleton from '../components/skeleton/CreateProblemSkeleton';
import SideNav from '../components/SideNavAdmin';
import { AdminSideNavMap } from '../utils/constants';
import SideNavSkeleton from '../components/skeleton/SideNavSkeleton';
import ViewProblemSkeleton from '../components/skeleton/ViewProblemSkeleton';

const Test = () => {


  return (
    <>
      <SideNavSkeleton />
      <ViewProblemSkeleton />
    </>
  );
};


export default Test;
