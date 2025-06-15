import { GoSearch } from 'react-icons/go';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className='relative w-4/5 sm:w-3/5 md:w-2/5 my-5 sm-mx-auto md-mx-auto left-4 hover:scale-105 transform transition duration-300 ease-in-out'>
      <GoSearch className='absolute left-0 top-1 transform -translate-y-1/2 text-gray-500 text-xl' />
      <input
        type='text'
        placeholder='Cari playlist...'
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className='w-full pl-11 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-1 text-gray-600 sm:text-lg text-base'
      />
    </div>
  );
};

export default SearchBar;
