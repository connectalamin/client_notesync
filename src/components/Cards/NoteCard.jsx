import React from 'react';
import { MdOutlinePushPin, MdCreate, MdDelete } from 'react-icons/md';
const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="border-2  hover:border-orange-500 rounded p-4 bg-slate-100 hover:shadow-lg transition-all ease-in-out  ">
      <div className="flex items-center justify-between">
        <div>
          <h6 className=" font-medium">{title}</h6>
          <span className="text-xs text-slate-500 hover:text-orange-700">
            {date}
          </span>
        </div>
        <MdOutlinePushPin
          className={`${
            isPinned ? 'text-orange-500' : 'text-slate-500'
          } text-lg`}
          onClick={onPinNote}
        />
      </div>
      <p className="text-sm text-slate-900 mt-2">{content?.slice(0, 60)}...</p>
      <div className="flex items-center justify-between mt-2">
        {tags?.length > 0 && (
          <div className="text-xs text-slate-500 flex items-center gap-2 flex-wrap mt-2">
            {tags.map((tag, index) => (
              <span
                className=" gap-2 text-slate-900 bg-slate-50 px-2 py-1 rounded-md border border-orange-300 cursor-pointer tag-span"
                key={index}
              >
                <span className="text-orange-600"># </span>
                {tag}{' '}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center gap-2">
          <MdCreate
            onClick={onEdit}
            className="hover:text-blue-500 cursor-pointer"
          />
          <MdDelete
            onClick={onDelete}
            className="hover:text-red-500 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
