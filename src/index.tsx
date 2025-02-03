import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  const queryClient = new QueryClient();

  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>,
  );
}
