// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { BiErrorAlt } from 'react-icons/bi';

const ErrorHandler = ({ error }) => {
  if (error) {
    return (
      <motion.div
        className='flex flex-col justify-center items-center text-center py-16'
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <BiErrorAlt className='text-6xl text-red-400 mb-4' />
        <h1 className='text-2xl font-semibold text-gray-700 mb-2'>
          Terjadi Kesalahan
        </h1>
        <p className='text-gray-500 max-w-md'>
          {error.message || 'Maaf, terjadi kesalahan yang tidak terduga.'}
        </p>
      </motion.div>
    );
  }

  return null;
};

export default ErrorHandler;
