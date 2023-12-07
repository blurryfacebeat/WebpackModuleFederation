import { type FC } from 'react';
import { Link, Outlet } from 'react-router-dom';

const App: FC = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Main</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
        </ul>
      </nav>
      <h1>App Component</h1>
      <Outlet />
    </>
  );
};

export default App;
