/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import React from 'react';
import axios from 'axios';
import { errorNotification } from '../../utils/helpers/notifications';
const SearchAPI = async (term) => {
  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      headers: {
        Authorization: 'Client-ID 8O50V7bNzfKdVixwS9W9nZVdr0VnrCv9gmeimfdvp6Y',
      },
      params: {
        query: term,
      },
    });
    return response.data.results;
  } catch (error) {
    errorNotification(error?.toString());
  }
};
export default SearchAPI;
