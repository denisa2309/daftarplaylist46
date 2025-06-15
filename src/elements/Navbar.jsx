import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import Form from './Form';
import Button from '../components/Button';
import { ImCancelCircle } from 'react-icons/im';

const Navbar = () => {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => setShowForm(!showForm);

  return (
    <div className='pt-2 pb-4 px-2 sm:px-4'>
      <div className='flex flex-col sm:flex-row justify-between items-center gap-5 sm:gap-0'>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className='text-4xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink to-blue-500 text-transparent bg-clip-text drop-shadow-md text-center sm:text-left'
        >
          Daftar Playlist Saya
        </motion.h1>
        {/* Add Playlist Button */}
        <Button type='button' onClick={toggleForm}>
          {showForm} + Tambah Playlist
        </Button>
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
              className='bg-white rounded-xl p-6 shadow-lg relative w-full max-w-md mx-2 border border-blue-200'
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
