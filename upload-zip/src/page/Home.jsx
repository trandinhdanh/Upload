import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Home() {
    const [dragging, setDragging] = useState(false);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const API_URL = "https://364e-101-99-33-237.ngrok-free.app/eventlog/analyze"
    const navigate = useNavigate();


    const handleUpload = async () => {
        setLoading(true);
        try {
            const { data } = await axios.post(API_URL, file, {
                headers: {
                    'Content-Type': 'application/zip',
                    'ngrok-skip-browser-warning': 'true'
                },
            });
            setLoading(false);
            if (data.length > 0) {
                toast.success('Success', {
                    position: toast.POSITION.TOP_RIGHT
                });
                navigate('/detail', { state: { dataContext: data } });
            } else {
                toast.error('No data found!', {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        } catch (error) {
            setLoading(false);
            console.error(error);
            toast.error('An error occurred while uploading the file.', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    const handleRemove = () => {
        setFile(null);
    };

    const dragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const dragEnter = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const dragLeave = (e) => {
        e.preventDefault();
        setDragging(false);
    };

    const fileDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        if (e.dataTransfer.files.length) {
            setFile(e.dataTransfer.files[0]);
        }
    };
    const handleChange = (e) => {
        if (e.target.files.length) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="p-4 mt-20 py-5 w-1/2 bg-whtie m-auto bg-primary rounded-lg">
                <div
                    className={` p-4 relative border-4 border-dotted  rounded-lg bg-primary  ${dragging === true ? `border-blue-800` : `border-gray-300`
                        }`}
                    onDragOver={dragOver}
                    onDragEnter={dragEnter}
                    onDragLeave={dragLeave}
                    onDrop={fileDrop}
                >
                    <svg
                        className="text-white w-24 mx-auto mb-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <div className=" flex flex-col w-max mx-auto text-center">
                        <div className=" flex flex-col w-max mx-auto text-center mb-2">
                            {file ? (
                                <button onClick={handleUpload} className=" bg-black transition-all text-white  border border-gray-300 rounded font-semibold cursor-pointer p-2 px-5 hover:bg-white hover:text-black hover:border-black">
                                    Scan File
                                </button>
                            ) : (
                                <>
                                    <label>
                                        <input
                                            className="text-sm cursor-pointer w-36 hidden"
                                            type="file"
                                            onChange={handleChange}
                                        />
                                        <div className=" bg-black transition-all text-white hover:text-black hover:border-black border border-gray-300 rounded font-semibold cursor-pointer p-2 px-5 hover:bg-white hover:text-black hover:border-black">
                                            Select
                                        </div>
                                    </label>
                                    <div className=" uppercase text-white mt-3">
                                        or drop files here
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    {file && (
                        <div className="flex justify-center items-center space-x-3">
                            <div className="overflow-hidden text-white" key={file.name}>
                                {file.name}
                            </div>
                            <button
                                type="button"
                                onClick={handleRemove}
                                className="transition-colors bg-primary text-white hover:text-primary hover:bg-white rounded-full mt-0.5 p-0.5 duration-300 opacity-90"
                            >
                                <svg
                                    className="w-4 h-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {
                loading && <div className="fixed w-screen h-screen top-0 left-0 bg-[#000000ca] flex flex-col justify-center items-center">
                    <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-indigo-600" />
                    <div className='text-center mt-4'>
                        <h1 className='text-2xl font-medium text-white my-2'>Loading...</h1>
                        <h1 className='text-white text-lg'> This may take a few seconds, please don't close this page.</h1>


                    </div>
                </div>
            }

        </>
    );
}
