import React from 'react'

const ScrollToTop = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <button
            onClick={scrollToTop} className="fixed bottom-8 right-8 bg-black text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 transition-all duration-300 z-50" aria-label="Scroll to top">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
        </button>
    )
}

export default ScrollToTop