import React from 'react';
import { Link } from "react-router-dom"

export const Appbar = () => {

    const handleSignOut = () => {
        localStorage.removeItem('token');
    };

    return (
        <div className="shadow-lg h-14 flex justify-between">
            <div className="flex flex-col justify-center h-full ml-4 font-bold text-lg text-[#002C7C]">
                PAYMENTS APP
            </div>
            <div className="flex pt-1">
                <div className="flex flex-col justify-center h-full mr-4">
                    <Link onClick={handleSignOut} className=" w-full text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-200 font-medium rounded-lg text-sm p-2 mb-2" to={'/signin'}>Sign Out</Link>
                </div>
            </div>
        </div>
    );
};
