import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import App from '@/components/app';
import AboutLazy from '@/pages/about/about.lazy';
import ShopLazy from '@/pages/shop/shop.lazy';
import { Suspense } from 'react';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/about',
        element: (
          <Suspense fallback="Loading...">
            <AboutLazy />
          </Suspense>
        ),
      },
      {
        path: '/shop',
        element: (
          <Suspense fallback="Loading...">
            <ShopLazy />
          </Suspense>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
