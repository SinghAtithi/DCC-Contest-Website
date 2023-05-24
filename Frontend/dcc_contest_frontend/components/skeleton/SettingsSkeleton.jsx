import React from 'react'

export default function SettingsSkeleton() {
  return (
    <div className="m-2">
      <div className="account-top-div">
        <div className="account-image-div" >
          <div className="animated-background mt-1" style={{ width: "200px", height: "200px", "border-radius": "50%" }}></div>
        </div>
        <div className="profile-info-div">
          <div className="animated-background m-2" style={{ width: "30%", height: "30px" }}></div>
          <div className="animated-background m-2" style={{ width: "30%", height: "20px" }}></div>
          <div className="animated-background m-2" style={{ width: "30%", height: "20px" }}></div>
        </div>
      </div>

      <AccountSectionSkeleton />
      <AccountSectionSkeleton />
      <AccountSectionSkeleton />
      <AccountSectionSkeleton />
      <AccountSectionSkeleton />
    </div >
  )
}


function AccountSectionSkeleton() {
  return (
    <div className="account-section">
      <div className="account-section-area">
          <div className="animated-background m-2" style={{ width: "20%", height: "30px" }}></div>
          <div className="animated-background m-2" style={{ width: "70%", height: "30px" }}></div>
          <div className="animated-background m-2" style={{ width: "10%", height: "30px" }}></div>
      </div>
    </div>
  )
}
