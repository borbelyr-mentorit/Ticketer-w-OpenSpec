import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { MainMenu } from './menus/MainMenu';

interface SidebarProps {
    isCollapsed: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar }) => {
    return (
        <div className={`sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen transition-all duration-300 ${isCollapsed ? 'w-[70px] ltr:-left-[70px] rtl:-right-[70px] ltr:lg:left-0 rtl:lg:right-0' : 'w-[260px] ltr:left-0 rtl:right-0'}`}>
            <nav className="h-full bg-white dark:bg-[#060818] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)]">
                <div className={`flex items-center justify-between px-4 py-3 ${isCollapsed ? 'justify-center' : ''}`}>
                    {!isCollapsed && (
                        <NavLink to="/admin" className="main-logo flex shrink-0 items-center">
                            <span className="text-2xl font-semibold align-middle ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light transition-all duration-300">TICKETER</span>
                        </NavLink>
                    )}
                    <button
                        type="button"
                        className={`flex h-10 w-10 items-center justify-center rounded-full transition duration-300 hover:bg-gray-500/10 hover:text-primary dark:text-white-light dark:hover:bg-dark-light/10`}
                        onClick={toggleSidebar}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-all duration-300 ${isCollapsed ? 'rotate-180' : ''}`}>
                            <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
                <div className={`mt-4 ${isCollapsed ? 'px-2' : 'px-4'}`}>
                    <ul className="relative font-semibold space-y-0.5">
                        {MainMenu.map((item, index) => (
                            <li key={index} className="nav-item">
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) => 
                                        `group flex items-center rounded-md p-2 hover:bg-primary/10 hover:text-primary dark:hover:bg-[#181f32] ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-700 dark:text-gray-300'} ${isCollapsed ? 'justify-center' : ''}`
                                    }
                                    end
                                    title={isCollapsed ? item.title : undefined}
                                >
                                    {item.icon && (
                                        <span className={`flex-none transition-all duration-300 text-current ${!isCollapsed ? 'ltr:mr-3 rtl:ml-3' : ''}`}>
                                            {item.icon}
                                        </span>
                                    )}
                                    {!isCollapsed && (
                                        <span>
                                            {item.title}
                                        </span>
                                    )}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
