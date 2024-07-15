import React, { useState } from 'react';
import TagInput from '../../components/Input/TagInput';
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/axiosinstance';
import { toast } from 'react-hot-toast';
const AddEditNotes = ({ noteData, type, onClose, getAllNotes }) => {
  const [title, setTitle] = useState(noteData ? noteData.title : '');
  const [content, setContent] = useState(noteData ? noteData.content : '');
  const [tags, setTags] = useState(noteData ? noteData.tags : []);
  const [error, setError] = useState('');

  const editNote = async () => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put(
        '/api/users/edit-note/' + noteId,
        {
          title,
          content,
          tags,
        }
      );
      if (response.data) {
        getAllNotes();
        onClose();
        toast.success('Note updated successfully!');
      } else {
        toast.error('Failed to update note');
      }
    } catch (error) {
      if (error) {
        console.log('Unexpected error occurred:', error);
      }
    }
  };

  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post('/api/users/add-note', {
        title,
        content,
        tags,
      });
      if (response.data) {
        console.log(response.data);
        getAllNotes();
        onClose();
        toast.success('Note added successfully!');
      } else {
        toast.error('Failed to add note');
      }
    } catch (error) {
      if (error) {
        console.log('Unexpected error occurred:', error);
      }
    }
  };

  const handleAddNote = () => {
    if (!title && !content) {
      setError('Please enter title and content');
      return;
    }
    if (!title) {
      setError('Please enter title ');
      return;
    }
    if (!content) {
      setError('Please enter  content');
      return;
    }
    setError('');

    if (type === 'edit') {
      editNote();
    } else {
      addNewNote();
    }
  };
  return (
    <div className="relative ">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center  absolute top-[-1rem] right-[-1rem] hover:bg-orange-400"
        onClick={onClose}
      >
        <MdClose className="text-3xl text-slate-400 hover:text-white" />
      </button>
      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          placeholder=" Write here..."
          className="text-3xl text-slate-950 bg-slate-200 outline-none "
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">DESCRIPTION</label>
        <textarea
          className="text-xl text-slate-950 outline-none bg-slate-100 p-2 rounded"
          placeholder=" Content"
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="mt-3">
        <label className="input-label">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>
      {error && <p className="text-red-700 text-lg pt-4">{error}</p>}
      <button
        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded mt-5 p-4 text-center w-[80%] ms-[10%]  "
        onClick={handleAddNote}
      >
        {type === 'edit' ? 'UPDATE' : 'ADD'}
      </button>
    </div>
  );
};

export default AddEditNotes;
