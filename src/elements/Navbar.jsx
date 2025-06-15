import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';
import Form from './Form';
import { ImCancelCircle } from 'react-icons/im';

const Navbar = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => setShowForm(!showForm);

  return (
    <div className='pt-3 pb-4'>
      <div className='flex flex-row justify-between items-center'>
        <h1 className='text-5xl font-bold'>Daftar Playlist Saya</h1>
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
