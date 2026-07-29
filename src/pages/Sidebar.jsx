import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiBookOpen, FiImage, FiLogOut } from "react-icons/fi";
import toast from "react-hot-toast";
import { MdOutlinePermMedia } from "react-icons/md";


const Sidebar = () => {
    const navigate=useNavigate()
    const handleLogout=()=>{
        localStorage.removeItem('Login');
        toast.success("Logout");
        navigate('/login');
    }


    return (
        <div className="hidden h-full md:flex flex-col  w-64 bg-slate-900 p-6 shadow-lg">
            <div className="text-2xl font-bold mb-10 text-center text-[#9B2C2C] underline">
                Admin panel
            </div>
            <ul className="menu w-full bg-gray-700 rounded-2xl p-3">
                <li>
                    <Link
                        to="/blog"
                        className="flex text-white  items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#9B2C2C] hover:text-white transition-all"
                    >
                        <FiBookOpen size={20} />
                        Blog
                    </Link>
                </li>

                <li>
                    <Link
                        to="/media"
                        className="flex text-white  items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#9B2C2C] hover:text-white transition-all"
                    >
                        <MdOutlinePermMedia size={20} />
                        Media
                    </Link>
                </li>
               
                <li>
                    <button
                        onClick={handleLogout}
                        className="flex text-white items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#9B2C2C] hover:text-white transition-all"
                    >
                        <FiLogOut size={20} />
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
