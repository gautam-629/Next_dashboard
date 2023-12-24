/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import './App.scss';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { MainContainer } from './hoc/main';
import MainRoute from './routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ScrollToTop from './components/common/ScrollToTop';
import ScrollToTopAuto from './utils/hooks/ScrollToTopAuto';
function App() {
  return (
    <Provider store={store}>
      <MainContainer>
        <MainRoute />
        <ScrollToTopAuto />
      </MainContainer>
    </Provider>
  );
}

export default App;
