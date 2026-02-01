import React from 'react';

const Dashboard: React.FC = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="panel bg-white p-5 rounded-md shadow-sm dark:bg-[#060818]">
                    <h5 className="font-semibold text-lg dark:text-white-light">Total Events</h5>
                    <p className="text-primary text-3xl font-bold mt-2">0</p>
                </div>
                <div className="panel bg-white p-5 rounded-md shadow-sm dark:bg-[#060818]">
                    <h5 className="font-semibold text-lg dark:text-white-light">Tickets Sold</h5>
                    <p className="text-success text-3xl font-bold mt-2">0</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
