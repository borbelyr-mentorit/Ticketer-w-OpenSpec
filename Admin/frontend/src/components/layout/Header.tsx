import React from 'react';

interface HeaderProps {
    toggleSidebar: () => void;
    isCollapsed: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isCollapsed }) => {
    return (
        <header className="z-40">
            <div className="shadow-sm">
                <div className="relative flex w-full items-center bg-white px-5 py-2.5 dark:bg-[#060818]">
                    <div className="flex items-center ltr:mr-2 rtl:ml-2">
                        {isCollapsed && (
                            <button
                                type="button"
                                className="collapse-menu flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-500/10 hover:text-primary dark:text-white-light dark:hover:bg-dark-light/10"
                                onClick={toggleSidebar}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
                                    <path d="M4 6H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    <path d="M4 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
                                    <path d="M4 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </button>
                        )}
                    </div>

                    <div className="flex items-center space-x-2 ltr:ml-auto rtl:mr-auto dark:text-[#d0d2d6]">
                        <div className="shrink-0">
                            <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-white font-semibold cursor-pointer">
                                <span>U</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
