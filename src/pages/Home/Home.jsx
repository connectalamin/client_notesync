import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import NoteCard from '../../components/Cards/NoteCard';
import { MdAdd } from 'react-icons/md';
import AddEditNotes from './AddEditNotes';
import Modal from 'react-modal'; // Add this import
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosinstance';
import EmptyCard from '../../components/EmptyCard/EmptyCard';
import toast from 'react-hot-toast';

const Home = () => {
  const navigate = useNavigate();

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: 'add',
    data: null,
  });

  const [userInfo, setUserInfo] = useState('');
  const [notes, setNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const handleEdit = (note) => {
    setOpenAddEditModal({
      isShown: true,
      type: 'edit',
      data: note,
    });
  };

  //Search for note
  const searchNote = async (query) => {
    try {
      const response = await axiosInstance.get('/api/users/search/', {
        params: { query },
      });

      if (response.data.notes && response.data.notes.length > 0) {
        setIsSearch(true);
        setNotes(response.data.notes);

        toast.success('Search results found', {
          position: 'bottom-center',
          duration: 1000,
        });
      } else {
        setIsSearch(false);
        toast.error('No results found', {
          position: 'top-center',
          duration: 1000,
        });
        getAllNotes();
      }
    } catch (error) {
      if (error) {
        console.log('Unexpected error occurred:', error);
      }
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  //update is pinned
  const updateIsPinned = async (note) => {
    const noteId = note._id;
    try {
      const response = await axiosInstance.put(
        '/api/users/update-pin-note/' + noteId,
        {
          isPinned: !note.isPinned,
        }
      );
      console.log(note.isPinned);
      if (response.data.note) {
        getAllNotes();
        toast.success(note.isPinned ? 'Note unpinned!' : 'Note pinned!');
      } else {
        toast.error('Failed to update pin status');
      }
    } catch (error) {
      if (error) {
        console.log('Unexpected error occurred:', error);
      }
    }
  };
  //Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get('/api/get-user');

      if (response.data) {
        setUserInfo(response.data);
      } else {
        setUserInfo('User not found');
      }
    } catch (error) {
      if (error) {
        localStorage.removeItem('token');
        navigate('/login');
        toast.error('Unauthorized access. Please login again');
      }
    }
  };

  //Delete Notes
  const deleteNote = async (data) => {
    try {
      const noteId = data._id;
      const response = await axiosInstance.delete(
        '/api/users/delete-note/' + noteId
      );
      if (response.data) {
        console.log(response.data);
        getAllNotes();
        toast.success('Note deleted successfully!');
      } else {
        toast.error('Failed to delete note');
      }
    } catch (error) {
      if (error) {
        console.log('Unexpected error occurred:', error);
      }
    }
  };

  // Get all notes

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get('/api/users/all-notes');
      if (response.data) {
        setNotes(response.data.notes);
      } else {
        console.log('No notes found');
      }
    } catch (error) {
      if (error) {
        localStorage.removeItem('token');
        navigate('/login');
        console.log('Unexpected error occurred:', error);
      }
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    getAllNotes();
  }, []);

  return (
    <>
      <Navbar
        userInfo={userInfo}
        onSearch={searchNote}
        clearSearch={handleClearSearch}
      />
      <div className="container mx-auto">
        {notes.length === 0 ? (
          <EmptyCard />
        ) : (
          <div className="grid lg:grid-cols-3 gap-4 mt-4 sm:grid-cols-1 md:grid-cols-2 ">
            {notes.map((note, index) => (
              <NoteCard
                key={index}
                title={note.title}
                date={new Date(note.createdOn).toLocaleString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })}
                content={note.content}
                tags={note.tags}
                isPinned={note.isPinned}
                onPinNote={() => updateIsPinned(note)}
                onEdit={() => handleEdit(note)}
                onDelete={() => deleteNote(note)}
              />
            ))}
          </div>
        )}
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-3xl bg-orange-500 hover:bg-orange-600 absolute right-10 bottom-10 "
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: 'add', data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        contentLabels=""
        className="w-[80%] md:w-[60%] lg:w-[35%] max-h-3/4 bg-slate-200 rounded-lg mx-auto mt-24 p-8 border shadow"
        appElement={document.getElementById('root')}
      >
        <AddEditNotes
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: 'add', data: null });
          }}
          noteData={openAddEditModal.data}
          type={openAddEditModal.type}
          getAllNotes={getAllNotes}
        />
      </Modal>
      <div className="fixed bottom-0 left-0 right-0 text-center text-sm text-gray-300 py-2 ">
        Developed by Alamin - Bringing your notes to life with NoteSync.
      </div>
    </>
  );
};

export default Home;
