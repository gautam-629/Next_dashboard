import { useState, useEffect } from 'react';
import { CategoryType } from '../interfaces/type';

const useCourseByCategory = (url: CategoryType[]) => {
  const [data, setData] = useState<CategoryType[]>([]);
  console.log(url, '@url data');

  useEffect(() => {
    // Simulating an API call
    const fetchData = async () => {
      // Simulating a delay for the response
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Assigning the mockupData to the state
      setData(url);
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once

  return data; // Return the data from the custom hook
};

export default useCourseByCategory;
