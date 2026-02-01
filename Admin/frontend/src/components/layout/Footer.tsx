import React from 'react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="mt-auto p-6 pt-0 text-center dark:text-white-dark ltr:sm:text-left rtl:sm:text-right">
            <p className="mb-0">
                © {currentYear}. Ticketer Admin - Version 1.0.0
            </p>
        </footer>
    );
};

export default Footer;
