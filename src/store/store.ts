/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './rootReducer';

export const store = createStore(rootReducer, applyMiddleware(thunk));
