import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';

export default function ResendConfirmationEmailModal(props) {

    const cancelButtonRef = useRef(null);

    const [email, setEmail] = useState("");

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loadingSendEmailButton, setLoadingSendEmailButton] = useState("");

    function closeModal() {
        props.setOpen(false);
        setEmail("");
        setError("");
        setMessage("");
        setLoadingSendEmailButton("");
    }

    function sendEmail() {
        setLoadingSendEmailButton("loading");
        if (email) {
            if (email.includes("@") && email.includes(".", email.indexOf("@"))) {
                const url = BASE_URL + "/auth/resendConfirmationEmail";
                const body = {
                    email: email
                };

                axios.post(url, body).then((res) => {
                    setError("");
                    setMessage("Email sent successfully.");
                    setLoadingSendEmailButton("");
                    setTimeout(() => {
                        closeModal();
                    }, 1500);

                }).catch((error) => {
                    setMessage("");
                    if (error.response) {
                        const statusCode = error.response.status;
                        if (statusCode == 400) setError("Please check your credientials.");
                        else if (statusCode == 401) setError("Your email has already been verified.");
                        else if (statusCode == 402) setError("Couldnot send the email. Please try again.");
                        else if (statusCode == 404) setError("User not found. Please check your email.");
                        else setError("Internal Server Error");

                    }
                    else if (error.request) setError("Network error. Please check your internet connectivity.");
                    else setError("Something went wrong. Please reload");
                    setLoadingSendEmailButton("");
                })

            }
            else {
                setMessage("");
                setError("Invalid Email");
                setLoadingSendEmailButton("");
            }
        }
        else {
            setMessage("");
            setError("Email is required");
            setLoadingSendEmailButton("");
        }
    }

    return (
        <Transition.Root show={props.open} as={Fragment}>
            <Dialog as="div" className="relative z-20" initialFocus={cancelButtonRef} onClose={props.setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed top-16 inset-0 z-20 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 w-full sm:pr-4 sm:ml-4 sm:mt-0 sm:text-left ">
                                            <Dialog.Title as="h3" className="flex justify-center align-middle text-base font-serif font-semibold leading-6 text-gray-900">
                                                RESEND CONFIRMATION EMAIL
                                            </Dialog.Title>
                                            {error && <div className="alert alert-error shadow-lg mt-3 mb-3">
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                    <span>{error}</span>
                                                </div>
                                            </div>}
                                            {message && <div className="alert alert-success shadow-lg mt-3 mb-3">
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                    <span>{message}</span>
                                                </div>
                                            </div>}
                                            <div className="mt-2 pt-2">
                                                <form className="w-full max-w-lg">
                                                    <div className="flex flex-wrap -mx-3 mb-6">
                                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                                            Enter your Email
                                                        </label>
                                                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-green-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="example@gmail.com" value={email} onChange={(e) => {
                                                            setEmail(e.target.value);
                                                        }}
                                                        />
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className={`btn btn-outline btn-info rounded mx-1 ${loadingSendEmailButton}`}
                                        onClick={sendEmail}
                                    >
                                        Send Email
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline btn-error rounded mx-1"
                                        onClick={closeModal}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root >
    )
}