import React from 'react'
import toast from 'react-hot-toast'
import { FaBlog, FaSignOutAlt, FaTimes } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('Login');
        toast.success("Logout");
        navigate('/login');
    }
    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="navbar bg-[#9B2C2C] w-full">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2">
                        <img src="/logo.png" alt="" className='w-25' />
                    </div>
                    <div className="hidden flex-none lg:block">
                        <button onClick={handleLogout} className='btn btn-outline'>Logout</button>
                    </div>
                </div>
            </div>

            <div className="drawer-side">
                <label
                    htmlFor="my-drawer-3"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>

                <div className="menu bg-base-200 min-h-full w-80 p-4 flex flex-col">
                    {/* Header */}
                    <label
                        htmlFor="my-drawer-3"
                        className="absolute right-4 top-4 cursor-pointer text-gray-600 hover:text-red-800 transition"
                    >
                        <FaTimes className="text-xl" />
                    </label>
                    <div className="border-b border-gray-300 pb-4 mb-4">
                        <h1 className="text-2xl font-bold text-center text-red-800">
                            Admin Panel
                        </h1>
                    </div>

                    {/* Menu Links */}
                    <nav className="flex-1 space-y-2">
                        <Link
                            to="/blog"
                            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#9B2C2C] hover:text-white transition-all"
                        >
                            <FaBlog className="text-lg" />
                            <span>Blog</span>
                        </Link>
                        {/* Logout Button at Bottom */}
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-800 hover:text-white transition-all mt-auto w-full"
                        >
                            <FaSignOutAlt className="text-lg" />
                            <span>Logout</span>
                        </button>
                    </nav>

                </div>
            </div>
        </div>
    )
}

export default Navbar