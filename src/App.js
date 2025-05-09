import logo from './logo.svg';
import './App.css';
import AllRoutes from './allRoutes';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "react-query";
import './i18n';

const queryClient = new QueryClient();


function App() {
  

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AllRoutes />
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
