import { useState } from 'react';
import axios from 'axios';

export const useMutatePlaylist = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutatePlaylist = async (id_play, data, method = 'POST') => {
    setLoading(true);
    setError(null);

    try {
      const url = id_play
        ? `https://webfmsi.singapoly.com/api/playlist/update/${id_play}`
        : 'https://webfmsi.singapoly.com/api/playlist/46';

      const response = await axios({
        method,
        url,
        headers: {
          'Content-Type': 'application/json',
        },
        data,
      });

      return response.data;
    } catch (err) {
      setError(err);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { mutatePlaylist, loading, error };
};
