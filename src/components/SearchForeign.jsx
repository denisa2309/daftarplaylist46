// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { MdPlaylistRemove } from 'react-icons/md';

const SearchForeign = () => {
  return (
    <motion.div
      className='flex flex-col justify-center items-center text-center py-16'
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <MdPlaylistRemove className='text-6xl text-gray-400 mb-4' />
      <h1 className='text-2xl font-semibold text-gray-600 mb-2'>
        Belum ada playlist ditemukan
      </h1>
      <p className='text-gray-500'>Tambahkan playlist favorit kamu sekarang!</p>
    </motion.div>
  );
};

export default SearchForeign;
