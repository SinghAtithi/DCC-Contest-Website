import React, { useState, useEffect } from 'react';
import QuestionSkeleton from '../components/skeleton/QuestionSkeleton';
import Navbar from '../components/Navbar';
import CreateProblemSkeleton from '../components/skeleton/CreateProblemSkeleton';
import SideNav from '../components/SideNavAdmin';
import { AdminSideNavMap, CONTEST_SEARCH, PROBLEM_SEARCH, SEARCH_CONTESTS_ENDPOINT_BACKEND } from '../utils/constants';
import SideNavSkeleton from '../components/skeleton/SideNavSkeleton';
import ViewProblemSkeleton from '../components/skeleton/ViewProblemSkeleton';
import SearchBar from '../components/SearchBar';
import DisplayProblemData from '../components/DisplayProblemData';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import DisplayContestData from '../components/DisplayContestData';


const Test = () => {

};

export default Test;
