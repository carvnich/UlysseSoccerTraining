import React from 'react'
import Title from '../components/Title'
import { assets, affiliates } from '../assets/assets'
import { motion } from 'framer-motion'

const Affiliates = () => {
    // Item animation variants for staggered entry
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className='text-center py-10 px-6 lg:px-32 w-full overflow-hidden' id='Affiliates'>
            <div className='text-center text-3xl mb-4'>
                <Title text1={'OUR'} text2={'AFFILIATES'} />
            </div>

            <p className="text-gray-600 mx-auto mb-10">
                We're proud to partner with these organizations to offer you the best soccer training experience.<br />Click on any logo to learn more about our partners.
            </p>

            <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                {affiliates.map((affiliate) => (
                    <motion.div key={affiliate.id} className="flex flex-col items-center" variants={itemVariants}>
                        <a href={affiliate.url} target="_blank" rel="noopener noreferrer" className="block w-full transform transition-transform duration-300 hover:scale-105" aria-label={affiliate.name}>
                            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 p-4 h-32 flex items-center justify-center">
                                <img src={affiliate.logo} alt={affiliate.name} className="max-h-full max-w-full object-contain" />
                            </div>
                        </a>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}

export default Affiliates