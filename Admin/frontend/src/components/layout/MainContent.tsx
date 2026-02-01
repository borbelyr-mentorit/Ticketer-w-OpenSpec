import React from 'react';
import { Outlet } from 'react-router-dom';

const MainContent: React.FC = () => {
    return (
        <main className="main-content min-h-[calc(100vh-120px)] p-6 transition-all duration-300">
            <div className="animate__animated animate__fadeIn">
                <Outlet />
            </div>
        </main>
    );
};

export default MainContent;
