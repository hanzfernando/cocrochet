import { useState } from 'react';
import UserProfile from "../components/UserProfile";
import OrderHistory from "../components/OrderHistory";

const ProfilePage = () => {
    const [activeSection, setActiveSection] = useState('userProfile');

    return (
        <div className="bg-gray-100 p-16">
            {/* Navigation buttons */}
            <div className='max-w-[100rem] w-full flex font-playfair mx-auto'>
                <button
                    className={`block px-8 py-2 rounded-t-lg text-lg ${
                        activeSection === 'userProfile' ? 'bg-white text-black z-10' : 'bg-gray-200 z-0'
                    }`}
                    onClick={() => setActiveSection('userProfile')}
                >
                    User Profile
                </button>

                <button
                    className={`block ml-[-1rem] px-8 py-2 rounded-t-lg text-lg ${
                        activeSection === 'orderHistory' ? 'bg-white text-black z-10' : 'bg-gray-200 z-0'
                    }`}
                    onClick={() => setActiveSection('orderHistory')}
                >
                    Order History
                </button>
            </div>

            <div className="max-w-[100rem] w-full bg-white rounded p-8 mx-auto">
                {/* Content */}
                {activeSection === 'userProfile' && <UserProfile />}
                {activeSection === 'orderHistory' && <OrderHistory />}
            </div>
        </div>
    );
};

export default ProfilePage;
