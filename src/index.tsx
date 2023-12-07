import { createRoot } from 'react-dom/client';
import RouterProvider from '@/providers/router/router-provider';

const root = document.getElementById('root');

if (!root) {
  throw new Error('root not found');
}

const container = createRoot(root);

container.render(<RouterProvider />);
