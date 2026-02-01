import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import Footer from './Footer';

const Layout: React.FC = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div className={`main-section antialiased relative font-nunito text-sm font-normal vertical ${isSidebarCollapsed ? 'toggle-sidebar' : ''}`}>
            {/* Sidebar Overlay (Mobile only) */}
            {!isSidebarCollapsed && (
                <div 
                    className="fixed inset-0 z-50 bg-[black]/60 lg:hidden" 
                    onClick={toggleSidebar}
                ></div>
            )}

            <div className="main-container min-h-screen text-black dark:text-white-dark transition-all duration-300">
                {/* Sidebar */}
                <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />

                <div className={`main-content flex flex-col min-h-screen transition-all duration-300 ${isSidebarCollapsed ? 'lg:pl-[70px]' : 'lg:pl-[260px]'}`}>
                    {/* Header */}
                    <Header toggleSidebar={toggleSidebar} isCollapsed={isSidebarCollapsed} />

                    {/* Main Content Area */}
                    <div className="flex-1">
                        <MainContent />
                    </div>

                    {/* Footer */}
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default Layout;
