import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
    const [image1, setImage1] = useState(false);
    const [image2, setImage2] = useState(false);
    const [image3, setImage3] = useState(false);
    const [image4, setImage4] = useState(false);

    // Basic info
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');

    // Date range
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Time fields
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    // Age range
    const [ageMin, setAgeMin] = useState('');
    const [ageMax, setAgeMax] = useState('');

    // Pricing options
    const [pricePerSession, setPricePerSession] = useState('');
    const [priceFullCourse, setPriceFullCourse] = useState('');
    const [priceEarlyBird, setPriceEarlyBird] = useState('');
    const [priceHalfDay, setPriceHalfDay] = useState('');
    const [priceFullDay, setPriceFullDay] = useState('');

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            // Basic info
            formData.append("name", name);
            formData.append("description", description);
            formData.append("location", location);

            // Date (using the start date for the main date field)
            formData.append("date", startDate);
            if (endDate) formData.append("endDate", endDate);

            // Time fields
            formData.append("startTime", startTime);
            formData.append("endTime", endTime);

            // Age range
            formData.append("ageMin", ageMin);
            formData.append("ageMax", ageMax);

            // Pricing options
            if (pricePerSession) formData.append("pricePerSession", pricePerSession);
            if (priceFullCourse) formData.append("priceFullCourse", priceFullCourse);
            if (priceEarlyBird) formData.append("priceEarlyBird", priceEarlyBird);
            if (priceHalfDay) formData.append("priceHalfDay", priceHalfDay);
            if (priceFullDay) formData.append("priceFullDay", priceFullDay);

            // Images
            image1 && formData.append("image1", image1);
            image2 && formData.append("image2", image2);
            image3 && formData.append("image3", image3);
            image4 && formData.append("image4", image4);

            const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } });
            console.log(response.data);

            if (response.data.success) {
                toast.success(response.data.message);
                // Reset all fields
                setName('');
                setDescription('');
                setLocation('');
                setStartDate('');
                setEndDate('');
                setStartTime('');
                setEndTime('');
                setAgeMin('');
                setAgeMax('');
                setPricePerSession('');
                setPriceFullCourse('');
                setPriceEarlyBird('');
                setPriceHalfDay('');
                setPriceFullDay('');
                setImage1(false);
                setImage2(false);
                setImage3(false);
                setImage4(false);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
            {/* Image uploads */}
            <div className=''>
                <p className='mb-2'>Upload Images</p>
                <div className='flex gap-2'>
                    <label className='cursor-pointer' htmlFor='image1'>
                        <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
                        <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
                    </label>
                    <label className='cursor-pointer' htmlFor='image2'>
                        <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
                        <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
                    </label>
                    <label className='cursor-pointer' htmlFor='image3'>
                        <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
                        <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
                    </label>
                    <label className='cursor-pointer' htmlFor='image4'>
                        <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
                        <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
                    </label>
                </div>
            </div>

            {/* Basic information */}
            <div className='w-full'>
                <p className='mb-2'>Program Name</p>
                <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Enter program name' required />
            </div>

            <div className='w-full'>
                <p className='mb-2'>Program Description</p>
                <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' rows="4" placeholder='Enter program description' required />
            </div>

            <div className='w-full'>
                <p className='mb-2'>Location</p>
                <input onChange={(e) => setLocation(e.target.value)} value={location} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Enter location' required />
            </div>

            {/* Date range */}
            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
                <div>
                    <p className='mb-2'>Start Date</p>
                    <input onChange={(e) => setStartDate(e.target.value)} value={startDate} className='w-full px-3 py-2' type="date" required />
                </div>
                <div>
                    <p className='mb-2'>End Date (Optional)</p>
                    <input onChange={(e) => setEndDate(e.target.value)} value={endDate} className='w-full px-3 py-2' type="date" />
                </div>
            </div>

            {/* Time fields */}
            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
                <div>
                    <p className='mb-2'>Start Time</p>
                    <input onChange={(e) => setStartTime(e.target.value)} value={startTime} className='w-full px-3 py-2' type="time" required />
                </div>
                <div>
                    <p className='mb-2'>End Time</p>
                    <input onChange={(e) => setEndTime(e.target.value)} value={endTime} className='w-full px-3 py-2' type="time" required />
                </div>
            </div>

            {/* Age range */}
            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
                <div>
                    <p className='mb-2'>Minimum Age</p>
                    <input onChange={(e) => setAgeMin(e.target.value)} value={ageMin} className='w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='7' required />
                </div>
                <div>
                    <p className='mb-2'>Maximum Age</p>
                    <input onChange={(e) => setAgeMax(e.target.value)} value={ageMax} className='w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='14' required />
                </div>
            </div>

            {/* Pricing options */}
            <div className='w-full max-w-[700px]'>
                <hr className='my-5 text-gray-500' />
                <p className='mb-4 font-medium text-xl'>Pricing Options</p>
                <div className='mb-4'>
                    <p className='text-sm text-gray-600 mb-2'>Course Pricing</p>
                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                        <div>
                            <p className='mb-2'>Early Bird Special</p>
                            <input onChange={(e) => setPriceEarlyBird(e.target.value)} value={priceEarlyBird} className='w-full px-3 py-2' type="number" placeholder='180' />
                        </div>
                        <div>
                            <p className='mb-2'>Per Session Price</p>
                            <input onChange={(e) => setPricePerSession(e.target.value)} value={pricePerSession} className='w-full px-3 py-2' type="number" placeholder='25' />
                        </div>
                        <div>
                            <p className='mb-2'>Full Course Price</p>
                            <input onChange={(e) => setPriceFullCourse(e.target.value)} value={priceFullCourse} className='w-full px-3 py-2' type="number" placeholder='200' />
                        </div>
                    </div>
                </div>
                <div>
                    <p className='text-sm text-gray-600 mb-2'>Daily Rates</p>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <div>
                            <p className='mb-2'>Half Day Price</p>
                            <input onChange={(e) => setPriceHalfDay(e.target.value)} value={priceHalfDay} className='w-full px-3 py-2' type="number" placeholder='100' />
                        </div>
                        <div>
                            <p className='mb-2'>Full Day Price</p>
                            <input onChange={(e) => setPriceFullDay(e.target.value)} value={priceFullDay} className='w-full px-3 py-2' type="number" placeholder='180' />
                        </div>
                    </div>
                </div>
            </div>

            <button className='w-28 py-3 mt-6 bg-black text-white' type='submit'>ADD</button>
        </form>
    )
}

export default Add