import React, { useState } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== '') {
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };
  const handleKeyDown = (e) => {
    if (e.key == 'Enter') addNewTag();
  };
  const handleRemoveTag = (tagRemove) => {
    setTags(tags.filter((tag) => tag !== tagRemove));
  };
  return (
    <>
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-2 text-slate-900 bg-slate-50 px-3 py-1 rounded-md"
            >
              <span className="text-orange-600">#</span>
              {tag}
              <button
                onClick={() => {
                  handleRemoveTag(tag);
                }}
                className="text-slate-500"
              >
                <MdClose className="hover:text-orange-600" />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center gap-4 mt-3 ">
        <input
          type="text"
          className=" bg-transparent border py-1 w-28 outline-none rounded-sm bg-slate-50 border-slate-400"
          placeholder=" Add Tags"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          value={inputValue}
        />
        <button
          className="w-8 h-8 flex items-center justify-center rounded border border-orange-400 hover:bg-orange-500"
          onClick={() => {
            addNewTag();
          }}
        >
          <MdAdd className="text-3xl text-orange-500 hover:text-white" />
        </button>
      </div>
    </>
  );
};

export default TagInput;
