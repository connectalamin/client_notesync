import React, { useState } from 'react';
import ProfileInfo from '../Cards/ProfileInfo';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
const Navbar = ({ userInfo, onSearch, clearSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery) {
      onSearch(searchQuery);
    }
  };
  const onClearSearch = () => {
    setSearchQuery('');
    clearSearch();
  };
  return (
    <div className="bg-gray-900 flex item-center justify-between px-6 py-2 drop-shadow-sm">
      <h2 className="text-xl font-medium py-2 md::text-2xl text-orange-500">
        NoteSync
      </h2>
      {userInfo ? (
        <>
          <div className="search">
            <SearchBar
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              handleSearch={handleSearch}
              onClearSearch={onClearSearch}
            />
          </div>

          {/* Profile info */}
          <div className="">
            <ProfileInfo userInfo={userInfo} />
          </div>
        </>
      ) : (
        <div className="flex gap-3 items-center">
          {' '}
          <Link
            className="font-medium hover:text-orange-500 text-orange-400"
            to={'/login'}
          >
            Login
          </Link>
          <Link
            className="font-medium hover:text-orange-500 text-orange-400"
            to={'/signup'}
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
