import { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { BASE_URL, REGISTER_CONTEST_ENDPOINT_BACKEND } from '../utils/constants';
import axios from 'axios';

export default function ContestUnRegisterModal(props) {
    const cancelButtonRef = useRef(null);
    const [error, setError] = useState("");
    const [unregisterButtonLoading, setUnegisterButtonLoading] = useState("");

    function handleRegister() {
        setUnegisterButtonLoading("loading");
        const url = BASE_URL + REGISTER_CONTEST_ENDPOINT_BACKEND;
        const body = {
            contest_id: props.contest_id,
            type: "unregister"
        }
        const options = {
            headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("token"),
            },
        };

        axios.post(url, body, options).then((res) => {
            setError("");

            const updatedContests = props.upcomingContests.map(contest => {
                if (contest.contest_id === props.contest_id) {
                    // Add the username to the registrations array of the specific contest
                    const updatedRegistrations = contest.registrations.filter(
                        (registration) => registration !== props.username
                    );
                    return { ...contest, registrations: updatedRegistrations };
                }
                return contest;
            });

            // Update the state with the modified contests array
            props.setUpcomingContests(updatedContests);


            props.setOpen(false);
            setUnegisterButtonLoading("");
        }).catch((error) => {
            console.log(error);
            if (error) {
                if (error.response) {
                    if (error.response.data.error) {
                        setError("Your session has expired. Please re-login.");
                    }
                    else if (Array.isArray(error.response.data)) {
                        let errorArray = error.response.data.map(error => `Error in ${error.error_field} - ${error.error_message}`);
                        // console.log(errorArray[0]);
                        setError(errorArray[0]);
                    }
                    else {
                        setError("Internal Server Error.");
                    }
                }
                else {
                    setError("Network Error. Please check your internet connection.");
                }
            }
            else {
                setError("Something went wrong.");
            }
            setUnegisterButtonLoading("");
        })
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
                                        <div className="mt-3  sm:ml-4 sm:mt-0 sm:text-left">
                                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                Unregister for Contest - {props.name}
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500"> <strong>N.B. : </strong>After unregistering, you will not be able to participate in this contest.
                                                </p>
                                                <hr className="border-t-2 border-gray-500" />
                                                {error && <div className="alert alert-error shadow-lg mt-3">
                                                    <div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                        <span>{error}</span>
                                                    </div>
                                                </div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className={`inline-flex w-full justify-center rounded-md ${unregisterButtonLoading} bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto`}
                                        onClick={handleRegister}
                                    >
                                        Unregister
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => props.setOpen(false)}
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
        </Transition.Root>
    )
}