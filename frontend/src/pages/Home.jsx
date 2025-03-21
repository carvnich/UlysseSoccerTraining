import React, { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import Programs from '../components/Programs'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import Contact from '../components/Contact'
import ScrollToTop from '../components/ScrollToTop'
import Affiliates from '../components/Affiliates'

const Home = () => {
    const [showScrollButton, setShowScrollButton] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            // Show button when page is scrolled down 300px
            if (window.scrollY > 300) {
                setShowScrollButton(true);
            } else {
                setShowScrollButton(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])

    return (
        <div>
            <Hero />
            <div id="Programs">
                <Programs />
            </div>
            <div id="Contact">
                <Contact />
            </div>
            <div id="Affiliates">
                <Affiliates />
            </div>
            {/* <BestSeller /> */}
            {/* <OurPolicy /> */}
            {/* <NewsletterBox /> */}

            {/* Show ScrollToTop button only when scrolled down */}
            {showScrollButton && <ScrollToTop />}
        </div>
    )
}

export default Home