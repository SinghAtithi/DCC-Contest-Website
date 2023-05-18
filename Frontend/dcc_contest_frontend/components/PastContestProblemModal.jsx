import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function PastContestProblemModal(props) {

    const cancelButtonRef = useRef(null);

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
                                            <Dialog.Title as="h3" className="flex justify-center align-middle text-base font-semibold leading-6 text-gray-900">
                                                Problems of Contest - {props.name}
                                            </Dialog.Title>
                                            <div className="mt-2 pt-2">
                                                {/* <p className="text-sm text-gray-500"> */}
                                                    <div className="overflow-x-auto w-full">
                                                        <table className="table w-full custom-table">
                                                            {/* head */}
                                                            <thead className='text-gray-500'>
                                                                <tr>
                                                                    <th>SL. NO.</th>
                                                                    <th>Problem</th>
                                                                    <th>Go to Problem</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className='text-white'>
                                                                {props.problems.map((problem, index) => (<>
                                                                    <tr key={problem.ques_id} className='hover'>
                                                                        <th>{index + 1}</th>
                                                                        <td>{problem.ques_id}</td>
                                                                        <td><button className='btn btn-outline btn-info min-h-8 h-8'><a href={`/problems/${problem.ques_id}`} target="_blank" rel="noreferrer">Solve</a></button></td>
                                                                    </tr>
                                                                </>))}
                                                            </tbody>
                                                        </table >
                                                    </div>
                                                {/* </p> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => props.setOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Done
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