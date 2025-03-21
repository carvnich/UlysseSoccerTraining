import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
    const { productId } = useParams();
    const { products, currency, addToCart } = useContext(ShopContext);
    const [productData, setProductData] = useState(false);
    const [image, setImage] = useState('');

    const fetchProductData = async () => {
        products.map((item) => {
            if (item._id == productId) {
                setProductData(item);
                setImage(item.image && item.image.length > 0 ? item.image[0] : assets.three_balls);
                return null;
            }
        })
    }

    useEffect(() => {
        fetchProductData();
    }, [productId, products])

    // Format dates
    const formatDate = (dateString) => {
        if (!dateString) return '';
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
    const ageRange = productData?.age ? `${productData.age.min}-${productData.age.max} years` : '';

    return productData ? (
        <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
            {/* Product Data */}
            <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
                {/* Product Images */}
                <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
                    <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
                        {
                            productData.image && productData.image.map((item, index) => (
                                <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
                            ))
                        }
                    </div>
                    <div className='w-full sm:w-[80%]'>
                        <img src={image} className='w-full h-auto' alt="" />
                    </div>
                </div>
                {/* Product Info */}
                <div className='flex-1'>
                    <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>

                    {/* Date, Time, Location, Age Range */}
                    <div className='mt-5 flex flex-col gap-2'>
                        {productData.date && (
                            <p className='text-lg'>
                                <span className='font-medium'>When: </span>
                                {formatDate(productData.date)}
                                {productData.endDate ? ` to ${formatDate(productData.endDate)}` : ''}
                                {productData.time?.startTime ? `, ${formatTime(productData.time.startTime)} - ${formatTime(productData.time.endTime)}` : ''}
                            </p>
                        )}
                        {productData.location && (
                            <p className='text-lg'>
                                <span className='font-medium'>Where: </span>{productData.location}
                            </p>
                        )}
                        {productData.age && (
                            <p className='text-lg'>
                                <span className='font-medium'>Ages: </span>{ageRange}
                            </p>
                        )}
                    </div>

                    {/* All Prices */}
                    <div className='flex flex-wrap gap-x-4 gap-y-1 mt-5'>
                        {productData.price?.earlyBird && (
                            <p className='text-lg'>
                                <span className='font-medium'>Early Bird: </span>
                                <span className='text-green-600'>{currency}{productData.price.earlyBird}</span>
                            </p>
                        )}
                        {productData.price?.fullCourse && (
                            <p className='text-lg'>
                                <span className='font-medium'>Full Course: </span>
                                {currency}{productData.price.fullCourse}
                            </p>
                        )}
                        {productData.price?.perSession && (
                            <p className='text-lg'>
                                <span className='font-medium'>Per Session: </span>
                                {currency}{productData.price.perSession}
                            </p>
                        )}
                        {productData.price?.halfDay && (
                            <p className='text-lg'>
                                <span className='font-medium'>Half Day: </span>
                                {currency}{productData.price.halfDay}
                            </p>
                        )}
                        {productData.price?.fullDay && (
                            <p className='text-lg'>
                                <span className='font-medium'>Full Day: </span>
                                {currency}{productData.price.fullDay}
                            </p>
                        )}
                        {/* Fallback to regular price if none of the specific prices exist */}
                        {!productData.price?.earlyBird && !productData.price?.fullCourse &&
                            !productData.price?.perSession && !productData.price?.halfDay &&
                            !productData.price?.fullDay && productData.price && (
                                <p className='text-3xl font-medium'>{currency}{productData.price}</p>
                            )}
                    </div>

                    <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>

                    {/* Only show size selector if sizes exist */}
                    {productData.sizes && productData.sizes.length > 0 && (
                        <div className='flex flex-col gap-4 my-8'>
                            <p>Select Size</p>
                            <div className='flex gap-2'>
                                {productData.sizes.map((item, index) => (
                                    <button
                                        onClick={() => setSize(item)}
                                        className={`border py-2 px-4 bg-gray-100 ${size === item ? 'border-orange-500' : ''}`}
                                        key={index}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <button onClick={() => addToCart(productData._id, size)} className='bg-black text-white px-8 mt-5 py-3 text-sm active:bg-gray-700'>
                        ADD TO CART
                    </button>

                    {/* <hr className='mt-8 sm:w-4/5' /> */}

                    {/* <div className='text-sm text-gray-505 mt-5 flex flex-col gap-1'>
                        <p>100% Original product.</p>
                        <p>Cash on delivery is available on this product.</p>
                        <p>Easy return and exchange policy within 7 days.</p>
                    </div> */}
                </div>
            </div>

            {/* Description & Review Section */}
            {/* <div className='mt-20'>
                <div className='flex'>
                    <b className='border px-5 py-3 text-sm'>Description</b>
                    <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
                </div>
                <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
                    <p>{productData.description}</p>
                </div>
            </div> */}

            <hr className='my-20 w-full text-gray-300' />

            {/* Display Related Products */}
            <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
        </div>
    ) : <div className='opacity-0'></div>

}

export default Product