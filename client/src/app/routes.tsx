import { createBrowserRouter } from 'react-router-dom';
import AppLayout from './AppLayout';
import Home from '../pages/Home';
import Search from '../pages/Search';
import Article from '../pages/Article';
import ErrorPage from '../pages/ErrorPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'search', element: <Search /> },
      { path: 'article/:id', element: <Article /> },
    ],
  },
]);
