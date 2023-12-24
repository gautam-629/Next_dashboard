/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { combineReducers } from 'redux';
import { authReducer } from './modules/auth/reducer';
import { courseReducer } from './modules/courses/reducers';
import { batchReducer } from './modules/batch/reducers';
import { sectionsReducer } from './modules/sections/reducer';
import { categoryReducer } from './modules/categories/reducers';
import { classRoomReducer } from './modules/classroom/reducer';

export default combineReducers({
  authReducer,
  courseReducer,
  categoryReducer: categoryReducer,
  classRoomReducer,
  sections: sectionsReducer,
  batchReducer,
});
