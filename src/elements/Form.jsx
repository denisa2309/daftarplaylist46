import { useState } from 'react';
import Swal from 'sweetalert2';
import Button from '../components/Button';
import { useMutatePlaylist } from '../hooks/useMutatePlaylist';

const Form = ({ initialData = {}, id_play = null }) => {
  const [formData, setFormData] = useState({
    play_name: initialData.play_name || '',
    play_url: initialData.play_url || '',
    play_thumbnail: initialData.play_thumbnail || '',
    play_genre: initialData.play_genre || '',
    play_description: initialData.play_description || '',
  });

  const { mutatePlaylist, loading } = useMutatePlaylist();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: 'Apakah kamu yakin?',
      text: id_play ? 'Data akan diperbarui!' : 'Data akan disimpan!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya',
      cancelButtonText: 'Batal',
      backdrop: false,
    });

    if (result.isConfirmed) {
      const res = await mutatePlaylist(id_play, formData);
      if (res) {
        Swal.fire({
          title: 'Berhasil!',
          text: id_play
            ? 'Data berhasil diperbarui.'
            : 'Data berhasil ditambahkan.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
          backdrop: false,
        }).then(() => {
          window.location.reload();
        });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-4 p-4 mt-6 max-w-md mx-auto bg-white rounded-2xl border border-blue-200'
    >
      <h2 className='text-2xl font-semibold text-center mb-2'>
        {id_play ? 'Edit Playlist' : 'Tambah Playlist Baru'}
      </h2>
      <input
        type='text'
        name='play_name'
        value={formData.play_name}
        onChange={handleChange}
        placeholder='Nama Playlist'
        className='border border-gray-300 rounded p-2'
        required
      />

      <input
        type='text'
        name='play_url'
        value={formData.play_url}
        onChange={handleChange}
        placeholder='URL Playlist'
        className='border border-gray-300 rounded p-2'
        required
      />

      <input
        type='text'
        name='play_thumbnail'
        value={formData.play_thumbnail}
        onChange={handleChange}
        placeholder='Thumbnail URL'
        className='border border-gray-300 rounded p-2'
        required
      />

      <select
        name='play_genre'
        value={formData.play_genre}
        onChange={handleChange}
        className='border border-gray-300 rounded p-2 text-gray-500'
        required
      >
        <option value=''>-- Pilih Genre --</option>
        <option value='Education'>Education</option>
        <option value='Music'>Music</option>
        <option value='Movie'>Movie</option>
      </select>

      <textarea
        name='play_description'
        value={formData.play_description}
        onChange={handleChange}
        placeholder='Deskripsi Playlist'
        className='border border-gray-300 rounded p-2'
        required
      />
      <Button type='submit'>{loading ? 'Memproses...' : 'Simpan'}</Button>
    </form>
  );
};

export default Form;
