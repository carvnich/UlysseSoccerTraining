import React from 'react'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import NewsletterBox from '../components/NewsletterBox'
import { motion } from 'framer-motion'

const Contact = () => {
    const [result, setResult] = React.useState("");

    return (
        <div className='text-center p-6 py-20 lg:px-32 w-full overflow-hidden'>
            <div className='text-center text-3xl'>
                <Title text1={'CONTACT'} text2={'US'} />
            </div>
            <form className='max-w-2xl mx-auto text-gray-600 pt-5'>
                <div className='flex flex-wrap'>
                    <div className='w-full md:w-1/2 text-left'>Name
                        <input className='w-full border border-gray-300 rounded py-3 px-4 mt-2' type="text" name="Name" id="" placeholder='Name' required />
                    </div>
                    <div className='w-full md:w-1/2 text-left md:pl-4'>Email
                        <input className='w-full border border-gray-300 rounded py-3 px-4 mt-2' type="email" name="Email" id="" placeholder='Email' required />
                    </div>
                </div>
                <div className='my-6 text-left'>
                    Message
                    <textarea className='w-full border border-gray-300 rounded py-3 px-4 mt-2 h-48 resize-none' name="Message" placeholder='Message' required></textarea>
                </div>
                <button className='bg-black text-white py-2 px-12 mb-10 rounded hover:text-gray-300'>
                    {result ? result : "Send Message"}
                </button>
            </form>
        </div >
    )
}

export default Contact
