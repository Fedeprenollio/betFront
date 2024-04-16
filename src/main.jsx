import ReactDOM from 'react-dom';
import './index.css';
import Layout from './pages/Layout';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Layout />
  </BrowserRouter>
);
