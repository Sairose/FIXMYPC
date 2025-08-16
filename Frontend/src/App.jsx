// src/App.jsx
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LandingPage from './pages/Landing-Wraper-Page/LandingPage';
import ErrorPage from './pages/Error/ErrorPage';
import Login from './pages/Login/Login';
import MultiStepForm from './pages/SignUp/MultiStepForm';
import CLayout from './components/Layout/CLayout';
import CHome from './pages/Client/CHome';
import CTechnician from './pages/Client/CTechnician';
import CBooked from './pages/Client/CBooked';
import CSetting from './pages/Client/CSetting';
import ProtectedRoute from './components/ProtectedRoutes';
import TLayout from './components/Layout/TLayout';
import TechnicianDashboard from './pages/Technician/Dashboard';
import BookingRequests from './pages/Technician/BookingRequest';
import BookTechnician from './pages/Client/BookingTechnician';
import TechnicianBooked from './pages/Technician/TechnicianBooked';
import Chat from './pages/Chat/Chat';
import ReviewPage from './pages/ReviewPage';
import ViewYourReview from './pages/ViewYourReview';
import Setting from './pages/Technician/Setting';



const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <ErrorPage />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <MultiStepForm />
  },
  {
    path: '/client',
    element: <ProtectedRoute allowedRoles={['client']} />,
    children: [
      {
        path: 'dashboard',
        element: <CLayout />,
        children: [
          { path: '', element: <CHome /> },
          // { path: 'technician', element: <CTechnician /> },
          { path: 'technician', element: <BookTechnician /> },
          { path: 'booked', element: <CBooked /> },
          { path: 'setting', element: <CSetting /> },

        ]
      }
    ]
  },
  {
    path: '/technician',
    element: <ProtectedRoute allowedRoles={['technician']} />,
    children: [
      {
        path: 'dashboard',
        element: <TLayout />, // define technician layout
        children: [
          { path: '', element: <TechnicianDashboard /> },
          { path: 'booking-requests', element: <BookingRequests /> },
          { path: 'booked', element: <TechnicianBooked /> },
          { path: 'setting', element: <Setting/>}
        ]
      }
    ]
  },
  {
    path: '/chat',
    element: <Chat />,
  },

{
  path: '/user/:id/reviews',
  element: <ReviewPage />,
},
{
  path:"/technician/reviews/:id",
   element: <ViewYourReview />
},
{
  path:"/client/reviews/:id",
   element: <ViewYourReview />
}

]);

const App = () => <RouterProvider router={router} />;
export default App;
