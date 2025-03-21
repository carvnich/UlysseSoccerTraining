import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {
    const { showSearch, setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext)
    const [visible, setVisible] = React.useState(false)
    const location = useLocation()

    const logout = () => {
        navigate('/login');
        localStorage.removeItem('token');
        setToken('');
        setCartItems({});
    }

    // Handle scroll to section
    const scrollToSection = (sectionId) => {
        const currentPath = location.pathname

        if (currentPath === '/') {
            // Already on home page, just scroll
            const element = document.getElementById(sectionId)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            }
        } else {
            // On another page, navigate to home with section info
            navigate('/', { state: { scrollTo: sectionId } })
        }

        // Close mobile menu if open
        setVisible(false)
    }

    // Check for scrollTo in location state when component mounts or updates
    useEffect(() => {
        if (location.state && location.state.scrollTo) {
            setTimeout(() => {
                const element = document.getElementById(location.state.scrollTo)
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })

                    // Clear the state after scrolling
                    window.history.replaceState({}, document.title)
                }
            }, 100) // Small delay to ensure the DOM is ready
        }
    }, [location])

    return (
        <div className='flex items-center justify-between py-4 font-medium'>
            <Link to="/" className="no-underline">
                <h1 className="text-xl text-gray-700 tracking-widest uppercase">
                    ULYSSE SOCCER TRAINING
                </h1>
            </Link>
            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                <NavLink to='/' className="flex flex-col items-center gap-1">
                    <p>HOME</p>
                    <hr className='w-2/4 border-none h-[2px] bg-gray-700 hidden' />
                </NavLink>
                <div onClick={() => scrollToSection('Programs')} className="flex flex-col items-center gap-1 cursor-pointer">
                    <p>PROGRAMS</p>
                    <hr className='w-2/4 border-none h-[2px] bg-gray-700 hidden' />
                </div>
                {/* <NavLink to='/about' className="flex flex-col items-center gap-1">
                    <p>ABOUT</p>
                    <hr className='w-2/4 border-none h-[2px] bg-gray-700 hidden' />
                </NavLink> */}
                <div onClick={() => scrollToSection('Contact')} className="flex flex-col items-center gap-1 cursor-pointer">
                    <p>CONTACT</p>
                    <hr className='w-2/4 border-none h-[2px] bg-gray-700 hidden' />
                </div>
                <div onClick={() => scrollToSection('Affiliates')} className="flex flex-col items-center gap-1 cursor-pointer">
                    <p>AFFILIATES</p>
                    <hr className='w-2/4 border-none h-[2px] bg-gray-700 hidden' />
                </div>
                <NavLink to='/coaches' className="flex flex-col items-center gap-1">
                    <p>COACHES</p>
                    <hr className='w-2/4 border-none h-[2px] bg-gray-700 hidden' />
                </NavLink>
            </ul>
            <div className='flex items-center gap-6'>
                <img onClick={() => setShowSearch(!showSearch)} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />
                <div className='group relative'>
                    <img onClick={() => { token ? null : navigate('/login') }} src={assets.profile_icon} className='w-5 cursor-pointer' alt="" />
                    {/* Dropdown Menu */}
                    {
                        token && <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                                <p className='cursor-pointer hover:text-black'>My Profile</p>
                                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                                <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                            </div>
                        </div>
                    }
                </div>
                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
                    <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">{getCartCount()}</p>
                </Link>
                <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
            </div>
            {/* Sidebar menu for smaller screen */}
            <div className={`fixed top-0 right-0 bottom-0 left-0 h-screen overflow-y-auto bg-white transition-all ${visible ? 'z-50' : 'hidden'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} to='/' className='py-2 pl-6'>HOME</NavLink>
                    <div onClick={() => scrollToSection('Programs')} className='py-2 pl-6 cursor-pointer'>PROGRAMS</div>
                    <NavLink onClick={() => setVisible(false)} to='/about' className='py-2 pl-6'>ABOUT</NavLink>
                    <div onClick={() => scrollToSection('Contact')} className='py-2 pl-6 cursor-pointer'>CONTACT</div>
                </div>
            </div>
        </div>
    )
}

export default Navbar