import { Outlet } from 'react-router-dom'; //  Only import Outlet, not createBrowserRouter
import TNavBar from '../Technician-Navbar/TNavbar';

const TLayout = () => {
  return (
    <>
      <TNavBar/>
      <Outlet />
    </>
  );
};

export default TLayout;
