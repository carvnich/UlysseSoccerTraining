import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const Hero = () => {
    return (
        <div className='flex flex-col sm:flex-row border border-gray-400'>
            {/* Hero Left Side */}
            <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
                <div className='text-[#414141]'>
                    <div className='flex items-center gap-2'>
                        <p className='w-8 md:2-11 h-[2px] bg-[#414141]'></p>
                        <p className='font-medium text-sm md:text-base'>2025 Programming</p>
                    </div>
                    <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Now Available</h1>
                </div>
            </div>
            {/* Hero Right Side */}
            <img src={assets.three_balls} className='w-full sm:w-1/2' alt="" />
        </div>
    )
}

export default Hero
