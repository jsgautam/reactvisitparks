import { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useFetchData = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://local-business-data.p.rapidapi.com/${endpoint}`,
    headers: {
      "X-RapidAPI-Key": 'RAPIDAPI KEY',
      "X-RapidAPI-Host": 'local-business-data.p.rapidapi.com',
    },
    params: { ...query },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const localData = await AsyncStorage.getItem('apidata');
      if (localData !== null) {
        // Data is available in local storage
        setData(JSON.parse(localData));
        console.log("Data Fetched from Local Storage");
      } else {
        // Data is not available in local storage, fetch from API
        const response = await axios.request(options);
        setData(response.data.data);
        console.log("Data Fetched from API");
        await AsyncStorage.setItem('apidata', JSON.stringify(response.data.data));
      }
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading, error };
};

export default useFetchData;