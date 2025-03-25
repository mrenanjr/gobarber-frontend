import React from 'react';
import { BrowserRouter } from 'react-router';

import GlobalStyle from './styles/global';

import AppProvider from './hooks';

import RoutesProvider from './routes';

const App: React.FC = () => (
  <BrowserRouter>
    <AppProvider>
      <RoutesProvider />
    </AppProvider>

    <GlobalStyle />
  </BrowserRouter>
);

export default App;
