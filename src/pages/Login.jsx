import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { ContextAPI } from "../ContextAPI/Context.API";

const Login = () => {
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate=useNavigate();

    const validateInput = () => {
        if (!email || !password) {
            toast.dismiss();
            toast.error("Please enter email and password");
            return false;
        }
        return true;
    };

    const adminLogin = () => {
        if (!validateInput()) return;

        if (email === "gautamsolar@2025" && password === "admin@2025") {

            toast.success('Welcome');
            setLogin(true);
            localStorage.setItem("Login", "True");
            navigate('/');
            
        } else {
            toast.dismiss();
            toast.error("Email or password is invalid")
            setError("Invalid email or password.");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            adminLogin();
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
            <div className="bg-white text-black rounded-2xl p-8 w-96 shadow-lg relative" >
                <h2 className="text-2xl font-semibold mb-6 text-center">Admin Login</h2>
                <div className="flex flex-col gap-4">
                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full border border-gray-300 rounded px-3 py-2 "
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>

                    <button
                        onClick={adminLogin}
                        className="bg-red-500 hover:bg-red-500 text-white font-semibold py-2 rounded mt-2 transition"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
