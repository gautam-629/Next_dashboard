/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

export const saveUserIdAfterLogin = (id: string) => {
  localStorage.setItem('user_id', id);
};
