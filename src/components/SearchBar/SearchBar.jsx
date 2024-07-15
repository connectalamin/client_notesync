import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  const handleKeyDown = (e) => {
    if (e.key == 'Enter') handleSearch();
  };
  return (
    <div className="md:w-96 flex items-center px-4  bg-slate-900 rounded-md   sm:w-auto">
      <input
        type="text"
        placeholder="Search..."
        className="w-full text-sm bg-transparent py-3 outline-none  text-orange-300"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
      {value && (
        <IoMdClose
          className="text-xl text-slate-400 hover:text-orange-500 mr-3 cursor-pointer"
          onClick={onClearSearch}
        />
      )}
      <button className="">
        <FaSearch
          size={18}
          className="text-slate-400 hover:text-orange-500"
          onClick={handleSearch}
        />
      </button>
    </div>
  );
};

export default SearchBar;
