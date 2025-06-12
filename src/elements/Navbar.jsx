import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';
import Form from './Form';
import { GoSearch } from 'react-icons/go';
import { ImCancelCircle } from 'react-icons/im';

const Navbar = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => setShowForm(!showForm);

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-row justify-between items-center'>
        <h1 className='text-3xl font-bold'>Daftar Playlist Saya</h1>
        <Button type='button' onClick={toggleForm}>
          {showForm} + Tambah Playlist
        </Button>
      </div>

      {/* Search input with icon */}
      <div className='relative w-1/3'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3'>
          <GoSearch className='text-gray-500 text-xl' />
        </div>
        <input
          type='text'
          placeholder='Cari playlist...'
          className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500'
        />
      </div>

      {/* Form as Popup/Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className='fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className='bg-white rounded-xl p-6 shadow-lg relative w-full max-w-md border border-blue-200'
            >
              <button
                className='absolute top-0 right-0 text-gray-500 hover:text-red-500 text-xl font-bold'
                onClick={toggleForm}
              >
                <ImCancelCircle />
              </button>
              <Form />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
