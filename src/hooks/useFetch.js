import { useEffect, useState } from "react";

interface IFetch {
  response: any[];
  error: Error;
  loading: boolean;
}

const useFetch = (url: string) => {
  const [response, setResponse] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const fetchData = async (signal) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "GET",
        signal,
      });

      const data = await response.json();

      setResponse(data.content);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    fetchData(signal);
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { response, error, loading };
};

export default useFetch;
