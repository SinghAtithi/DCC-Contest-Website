import React from 'react'

export default function LoginPageSkeleton() {
    return (
        <>
            <div></div> {/* Just to adjust the login form and animation */}
            <LoginFormSkeleton />
            <LoginLottieSkeleton />
            <div></div> {/* Just to adjust the login form and animation */}
        </>
    )
}

function LoginFormSkeleton() {
    return (
        <div className="login-form">
            <div className='skeleton-login-form-input'></div>
            <div className='skeleton-login-form-input'></div>
            <div className='skeleton-login-form-button'></div>
        </div>
    )

}

function LoginLottieSkeleton() {
    return (
        <div className='skeleton-login-lottie'></div>
    )
}

