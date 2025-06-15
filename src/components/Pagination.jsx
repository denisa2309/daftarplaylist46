import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

const Pagination = ({
  currentPage,
  totalPages,
  goToPrevPage,
  goToNextPage,
}) => {
  return (
    <div className='flex justify-center items-center my-10 text-gray-600'>
      <button
        onClick={goToPrevPage}
        disabled={currentPage === 1}
        className='cursor-pointer disabled:cursor-not-allowed hover:text-black hover:scale-110 transform transition duration-300 ease-in-out'
      >
        <GrFormPrevious size={24} />
      </button>

      <span className='text-sm sm:text-base md:text-lg'>
        Halaman {currentPage} dari {totalPages}
      </span>

      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className='cursor-pointer disabled:cursor-not-allowed hover:text-black hover:scale-110 transform transition duration-300 ease-in-out'
      >
        <GrFormNext size={24} />
      </button>
    </div>
  );
};

export default Pagination;
