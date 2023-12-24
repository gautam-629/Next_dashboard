/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

//console.log(import.meta.env.VITE_BACKEND_APP_URL);

export const BASE_URL = import.meta.env.VITE_BACKEND_APP_URL
  ? import.meta.env.VITE_BACKEND_APP_URL
  : 'http://localhost:3002';
// export const BASE_URL = 'http://192.168.100.74:3002';
