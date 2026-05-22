import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';
import './index.css';
import App from './App';

const theme = createTheme({
  primaryColor: 'gold',
  colors: {
    gold: [
      '#fff9e6',
      '#ffedb3',
      '#ffe080',
      '#ffd24d',
      '#ffc51a',
      '#e6ac00',
      '#b38600',
      '#806000',
      '#4d3900',
      '#1a1300',
    ],
  },
  fontFamily: 'Inter, sans-serif',
  headings: {
    fontFamily: 'Crimson Pro, Georgia, serif',
  },
  defaultRadius: 'md',
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <Notifications position="top-right" />
      <App />
    </MantineProvider>
  </React.StrictMode>
);
