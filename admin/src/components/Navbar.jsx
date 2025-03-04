import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ setToken }) => {
    return (
        <div className='flex items-center py-2 px-[4%] justify-between'>
            <Link to="/" className="w-[max(30%,80px)] no-underline">
                <h1 className="flex flex-col text-xl text-gray-700 tracking-widest uppercase">
                    ULYSSE SOCCER TRAINING
                    <span className='text-sm'>Admin Panel</span>
                </h1>
            </Link>
            <button onClick={() => setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
        </div>
    )
}

export default Navbar
