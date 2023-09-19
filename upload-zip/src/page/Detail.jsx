import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import logo from "../assets/nodata.png";

export default function Detail() {
    const location = useLocation();
    const data = location.state?.dataContext;
    const [selectedChannel, setSelectedChannel] = useState('All');
    const navigate = useNavigate();
    const contain = {
        ALL: 'All',
        SYS: '"Sys"',
        APP: '"App"',
        SEC: '"Sec"',
    }

    const handleTime = (timestamp) => {
        const timestampWithoutQuotes = timestamp.replace(/^"(.*)"$/, '$1');
        const date = new Date(timestampWithoutQuotes);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate;
    }

    const hanldText = (text) => {
        return text.replace(/^"(.*)"$/, '$1');
    }

    const handleClick = (channel) => {
        setSelectedChannel(channel);
    }

    const filteredData = data.filter((item) =>
        selectedChannel === contain.ALL ? true : item.Channel === selectedChannel
    );

    return (
        <div className="flex">
            <div className="w-1/4 p-10 fixed h-full">
                <div className="flex-col flex justify-between h-full overflow-y-auto w-full border-t-2 border-t-white rounded-lg">
                    <div className='bg-primary rounded-lg '>
                        <div className='flex-col flex space-y-5'>
                            <ul>
                                <li
                                    onClick={() => handleClick(contain.ALL)}
                                    className={`${selectedChannel === contain.ALL ? 'bg-black' : ''} px-10 py-3 text-gray-300 font-medium flex items-center justify-between rounded-lg cursor-pointer`}
                                >
                                    <p>All</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="chevron-right"><path fill="none" d="M0 0h24v24H0V0z"></path><path fill='currentColor' d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"></path></svg>
                                </li>
                                <li onClick={() => handleClick(contain.SYS)} className={`${selectedChannel === contain.SYS ? 'bg-black' : ''} px-10 py-3 text-gray-300 font-medium flex items-center justify-between rounded-lg cursor-pointer`}>
                                    <p>System</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="chevron-right"><path fill="none" d="M0 0h24v24H0V0z"></path><path fill='currentColor' d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"></path></svg>
                                </li>
                                <li onClick={() => handleClick(contain.APP)} className={`${selectedChannel === contain.APP ? 'bg-black' : ''} px-10 py-3 text-gray-300 font-medium flex items-center justify-between rounded-lg cursor-pointer`}>
                                    <p>Application</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="chevron-right"><path fill="none" d="M0 0h24v24H0V0z"></path><path fill='currentColor' d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"></path></svg>
                                </li>
                                <li onClick={() => handleClick(contain.SEC)} className={`${selectedChannel === contain.SEC ? 'bg-black' : ''} px-10 py-3 text-gray-300 font-medium flex items-center justify-between rounded-lg cursor-pointer`}>
                                    <p>Security</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="chevron-right"><path fill="none" d="M0 0h24v24H0V0z"></path><path fill='currentColor' d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"></path></svg>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <svg onClick={() => { navigate("/"); }} className="w-7 h-7 rounded-lg cursor-pointe text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" d="M13 5H1m0 0 4 4M1 5l4-4" />
                    </svg>
                </div>
            </div>
            <div className="w-3/4 ml-[25%] p-10 px-20 bg-secondary">
                {filteredData.length > 0 ? filteredData.map((item, index) => {
                    return <div key={index} className={`px-7 py-5 mb-5 bg-primary border-t-2 border-t-white rounded-lg shadow hover:shadow-lg transition-all`}>
                        <div className="py-3 space-y-2">
                            <div className="flex">
                                <p className="w-28 font-medium text-gray-400">Event ID:</p>
                                <p className="grow capitalize text-white">{item.EventID}</p>
                            </div>
                        </div>
                        <div className=" py-3 space-y-2">
                            <div className="flex">
                                <p className="w-28 font-medium text-gray-400">Channel:</p>
                                <p className="grow capitalize text-white">{hanldText(item.Channel)}</p>
                            </div>
                        </div>
                        <div className=" py-3 space-y-2">
                            <div className="flex">
                                <p className="w-28 font-medium text-gray-400">Host Name:</p>
                                <p className="grow capitalize text-white">{hanldText(item.Hostname)}</p>
                            </div>
                        </div>
                        <div className=" py-3 space-y-2">
                            <div className="flex">
                                <p className="w-28 font-medium text-gray-400">Behavior:</p>
                                <p className="grow capitalize text-white">{hanldText(item.Behavior)}</p>
                            </div>
                        </div>
                        <div className=" py-3 space-y-2">
                            <div className="flex">
                                <p className="w-28 font-medium text-gray-400">Timestamp:</p>
                                <p className="grow capitalize text-white">{handleTime(item.Timestamp)}</p>
                            </div>
                        </div>
                    </div>
                }) : <div className='h-screen'>
                    <div className='h-full flex items-center justify-center'>
                        <img src={logo} className='w-[500px] h-[500px] opacity-60' alt="" />
                    </div>
                </div>}
            </div>
        </div>
    );
}
