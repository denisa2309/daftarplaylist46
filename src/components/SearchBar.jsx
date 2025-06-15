import { GoSearch } from 'react-icons/go';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className='relative w-2/5 my-5 left-4 hover:scale-105 transform transition duration-300 ease-in-out'>
      <GoSearch className='absolute left-0 top-1 transform -translate-y-1/2 text-gray-500 text-xl' />
      <input
        type='text'
        placeholder='Cari playlist...'
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className='w-full pl-10 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-1 text-gray-600'
      />
    </div>
  );
};

export default SearchBar;
