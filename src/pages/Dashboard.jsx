import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100 gap-2">
            {/* Main Content */}
            <Sidebar />
            <div className="flex-1 flex flex-col ">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
