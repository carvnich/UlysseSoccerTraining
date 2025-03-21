import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
import { motion } from 'framer-motion'

const Programs = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        // Sort products by date (newest first) before slicing
        const sortedProducts = [...products].sort((a, b) => new Date(a.date) - new Date(b.date));
        setLatestProducts(sortedProducts.slice(0, 10));
    }, [products]);

    return (
        <div className='my-10 overflow-hidden' id='Programs'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={'ALL'} text2={'PROGRAMS'} />
            </div>
            <div className='grid grid-cols-1 gap-4 gap-y-6'>
                {latestProducts.length > 0 ? (
                    latestProducts.map((item, index) => (
                        <motion.div key={index} initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true, amount: 0.2 }}>
                            <ProductItem id={item._id} image={item.image} name={item.name} price={item.price} description={item.description} date={item.date} endDate={item.endDate} location={item.location} age={item.age} time={item.time} />
                        </motion.div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 py-8">No programs available at the moment.</p>
                )}
            </div>
        </div>
    )
}

export default Programs