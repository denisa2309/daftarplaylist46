import { useState } from 'react';
import axios from 'axios';

export const useMutatePlaylist = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = async (id_play, data, method = 'POST') => {
    setLoading(true);
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

  return { mutate, loading, error };
};
