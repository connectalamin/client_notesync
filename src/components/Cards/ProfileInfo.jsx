import React from 'react';
import { getInitials } from '../../utils/helper';

const ProfileInfo = ({ userInfo }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };
  return (
    <div className="flex items-center gap-3 text-sm md:text-lg   ">
      <div className="w-8 h-8 flex item-center justify-center rounded-full text-orange-400  font-semibold bg-slate-800 border-2  border-orange-500 relative md:w-12 md:h-12">
        <h2 className="absolute md:top-[10px] top-[4px] ">
          {userInfo?.fullName ? getInitials(userInfo.fullName) : ''}
        </h2>
      </div>
      <div>
        <p className="text-sm font-medium hover:text-orange-500 text-orange-400">
          {userInfo?.fullName || 'User'}
        </p>
        <button
          className="font-medium hover:text-orange-500 text-orange-400"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
