import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { coaches } from '../assets/assets'

const Coaches = () => {
    return (
        <div>
            <div className='text-2xl text-center pt-8 border-t'>
                <Title text1={'COACH\'S'} text2={'CORNER'} />
            </div>
            <div className='my-10 grid grid-cols-1 md:grid-cols-2 gap-6'>
                {coaches.map((coach) => (
                    <motion.div key={coach.id} className='bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-auto sm:h-64' initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true, amount: 0.2 }}>
                        <div className='flex flex-col sm:flex-row h-full'>
                            <div className='h-48 sm:h-auto sm:w-2/5'>
                                <img
                                    src={coach.image}
                                    alt={coach.name}
                                    className='w-full h-full object-cover object-center'
                                />
                            </div>
                            <div className='p-4 flex flex-col justify-between w-full sm:w-3/5'>
                                <h3 className='text-lg font-semibold text-gray-800'>{coach.name}</h3>
                                <p className='text-gray-600 my-2 flex-grow'>{coach.body}</p>
                                <p className='text-sm italic text-gray-500 mt-auto'>
                                    {coach.footer.includes('@') && coach.footer.includes('.') ? (<a href={`mailto:${coach.footer}`} className="text-blue-900 hover:underline">{coach.footer}</a>) : (coach.footer)}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            <div>
                <div className='text-xl pt-4'>
                    <Title text1={'COACHING'} text2={'PHILOSOPHY'} />
                </div>
                <p className='text-lg text-gray-600 pb-8'>UST is passionate about developing soccer players in Brantford and surrounding areas. From growing up playing soccer in Brantford we have experienced the joy of playing the beautiful game. We believe that players should achieve two things every single time they step onto a soccer pitch: improved ability in the game and a huge smile on their face (like Ronaldinho). If either of those components are missing for a player at any level, something is wrong. We believe that players should be encouraged to reach their potential and that it is the job of the coach to guide them through that process. It is also the job of the player to train with discipline, be respectful and work hard towards their goals.</p>
                <div className='text-xl pt-4'>
                    <Title text1={'APPLY TO'} text2={'COACH'} />
                </div>
                <p className='text-lg text-gray-600 pb-8'>Are you an outgoing person?  Experienced soccer player?  At UST we are always interested in adding to our paid house league staff.  If you would like to apply contact Coach Brendon at <a href='mailto:coach@ulyssesoccertraining.com'>coach@ulyssesoccertraining.com</a></p>
                <div className='text-xl pt-4'>
                    <Title text1={'VOLUNTEER'} text2={'WITH US'} />
                </div>
                <p className='text-lg text-gray-600'>Get involved and earn community volunteer hours while playing soccer. We have a wide range of programs and opportunities available to you. Contact us!</p>
            </div>
        </div>
    )
}

export default Coaches