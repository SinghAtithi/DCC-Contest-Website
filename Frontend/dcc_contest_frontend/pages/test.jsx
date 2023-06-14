import React, { useState } from 'react'
import SideNav from '../components/SideNavAdmin'
import Head from 'next/head'
import { AdminSideNavMap, SUPER_ADMIN } from '../utils/constants'
import ViewContestSkeleton from '../components/skeleton/ViewContestSkeleton';
import ContestStatsSkeleton from '../components/skeleton/ContestStatsSkeleton';

export default function test() {
  
  return (
    <>
      <ContestStatsSkeleton />
    </>
  )
}
