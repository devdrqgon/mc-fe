import React from 'react';
import ReactDOM from 'react-dom';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { TimespanPlanner } from './features/timespanPlanner/timeSpanPlanner';
import { ReactQueryDevtools } from 'react-query/devtools'
import toast, { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Sample from 'features/planOverview/sample';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: any) =>
      toast.error(`Something went wrong: ${error.message}`),
  }),
})
ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Switch>
        <Route path="/planner" component={TimespanPlanner} />
        <Route path="/sample" component={Sample} />
      </Switch>
      </BrowserRouter>  
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

