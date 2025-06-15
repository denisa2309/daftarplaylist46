import { useState } from 'react';
import axios from 'axios';

export const useDeletePlaylist = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const deleteData = async (id_play) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.delete(
        `https://webfmsi.singapoly.com/api/playlist/${id_play}`
      );

      setData(response.data.datas);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { deleteData, data, loading, error };
};
