import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const ProductItem = ({ id, image, name, price, description, date, endDate, location, age, time }) => {
    const { currency } = useContext(ShopContext)

    // Format dates
    const formatDate = (dateString) => {
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    // Format time
    const formatTime = (timeString) => {
        if (!timeString) return '';
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 || 12;
        return `${formattedHour}:${minutes} ${ampm}`;
    }

    // Format age range
    const ageRange = age ? `${age.min}-${age.max} years` : '';

    return (
        <Link to={`/product/${id}`} className='text-gray-700 cursor-pointer'>
            <div className='flex flex-col sm:flex-row w-full'>
                {/* Responsive height image container */}
                <div className='w-full sm:w-1/3 h-96 overflow-hidden relative'>
                    <img className='absolute inset-0 w-full h-full object-cover hover:scale-110 transition ease-in-out duration-300' src={image && image.length > 0 ? image[0] : assets.three_balls} alt={name} />
                </div>
                <div className='w-full sm:w-2/3 flex flex-col px-4 sm:px-5 gap-3 sm:gap-4 py-4'>
                    <p className='text-xl sm:text-2xl font-medium'>{name}</p>
                    {/* Date and Location */}
                    <div className='mb-1 sm:mb-2'>
                        <p className='text-base sm:text-lg'>
                            <span className='font-medium'>When: </span>
                            {date ? formatDate(date) : ''}
                            {endDate ? ` to ${formatDate(endDate)}` : ''}
                            {time?.startTime ? `, ${formatTime(time.startTime)} - ${formatTime(time.endTime)}` : ''}
                        </p>
                        <p className='text-base sm:text-lg'>
                            <span className='font-medium'>Where: </span>{location}
                        </p>
                        {age && (
                            <p className='text-base sm:text-lg'>
                                <span className='font-medium'>Ages: </span>{ageRange}
                            </p>
                        )}
                    </div>
                    {/* All Prices */}
                    <div className='flex flex-wrap gap-x-4 gap-y-1 mb-1 sm:mb-2'>
                        {price?.earlyBird && (
                            <p className='text-base sm:text-lg'>
                                <span className='font-medium'>Early Bird: </span>
                                <span className='text-green-600'>{currency}{price.earlyBird}</span>
                            </p>
                        )}
                        {price?.fullCourse && (
                            <p className='text-base sm:text-lg'>
                                <span className='font-medium'>Full Course: </span>
                                {currency}{price.fullCourse}
                            </p>
                        )}
                        {price?.perSession && (
                            <p className='text-base sm:text-lg'>
                                <span className='font-medium'>Per Session: </span>
                                {currency}{price.perSession}
                            </p>
                        )}
                        {price?.halfDay && (
                            <p className='text-base sm:text-lg'>
                                <span className='font-medium'>Half Day: </span>
                                {currency}{price.halfDay}
                            </p>
                        )}
                        {price?.fullDay && (
                            <p className='text-base sm:text-lg'>
                                <span className='font-medium'>Full Day: </span>
                                {currency}{price.fullDay}
                            </p>
                        )}
                    </div>
                    {/* Description - line-clamp only on larger screens */}
                    <p className='text-base sm:text-lg sm:line-clamp-2'>{description}</p>
                </div>
            </div>
        </Link>
    )
}

export default ProductItem