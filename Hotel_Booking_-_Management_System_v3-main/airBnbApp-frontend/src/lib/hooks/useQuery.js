import { useEffect, useState } from 'react';
import axiosInstance from '../axios-instance';

export default function useQuery({ url, options = {} }) {
  const [queryState, setQueryState] = useState({
    data: null,
    pending: true,
    error: null,
  });

  async function fetchData() {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await axiosInstance(url, options);
      setQueryState({
        data: response.data,
        pending: false,
        error: null,
      });
    } catch (e) {
      setQueryState((prev) => ({
        ...prev,
        error: e.message,
      }));
    } finally {
      setQueryState((prev) => ({
        ...prev,
        pending: false,
      }));
    }
  }

  useEffect(() => {
    fetchData();
  }, [url, JSON.stringify(options)]);

  return { refetchQuery: fetchData, ...queryState };
}
