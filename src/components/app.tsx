import { type FC } from 'react';
import { Link, Outlet } from 'react-router-dom';
import ReactLogoPng from '@/assets/img/react_png.png';
import ReactLogoJpeg from '@/assets/img/react_jpeg.jpeg';
import ReactLogoSvg from '@/assets/img/react_svg.svg';

const App: FC = () => {
  return (
    <>
      <img src={ReactLogoPng} width={50} height={50} alt="" />
      <img src={ReactLogoJpeg} width={50} height={50} alt="" />
      <ReactLogoSvg width={100} height={100} color="green" />
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
