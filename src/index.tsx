import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { TimespanPlanner } from './features/timespanPlanner/timeSpanPlanner';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <TimespanPlanner />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

