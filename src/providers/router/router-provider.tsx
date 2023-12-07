import { type FC } from 'react';
import { RouterProvider as ReactRouterProvider } from 'react-router-dom';
import { router } from '@/providers/router/router';

const RouterProvider: FC = () => {
  return <ReactRouterProvider router={router} />;
};

export default RouterProvider;
