import { useState, useEffect } from 'react';
import { ErrorHandler, Loading, SearchBar } from '../components';
import { Card, Footer, Navbar } from '../elements';
import { useFetchPlaylist } from '../hooks/useFetchPlaylist';

const LandingPages = () => {
  const { data, loading, error } = useFetchPlaylist();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Pagination with device responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setItemsPerPage(3); // mobile
      } else {
        setItemsPerPage(6); // desktop
      }
    };
    // Initial check
    handleResize();
    // Listen for resize
    window.addEventListener('resize', handleResize);
    // Cleanup listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handler
  if (loading) return <Loading />;
  if (error) return <ErrorHandler />;

  // Search term
  const filteredPlaylists = data.filter((item) =>
    item.play_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredPlaylists.length / itemsPerPage);
  // Navigate next pages
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  // Navigate previous pages
  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <Navbar />
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <Card
        playlists={filteredPlaylists}
        loading={loading}
        error={error}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        goToNextPage={goToNextPage}
        goToPrevPage={goToPrevPage}
        totalPages={totalPages}
      />
      <Footer />
    </>
  );
};

export default LandingPages;
