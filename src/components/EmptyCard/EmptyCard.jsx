import React from 'react';
import { MdAdd } from 'react-icons/md';
import newAdd from '../../assets/newAdd.svg';
const EmptyCard = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen md:-mt-32 ">
      <img src={newAdd} alt="" className="text-white filter-orange w-52 h-52" />
      <p className="text-slate-200 mt-4 md:text-2xl sm:text-xl sm:text-wrap w-[330px] text-center">
        "No notes yet. Start creating and fill your space with ideas!"
      </p>
    </div>
  );
};
export default EmptyCard;
