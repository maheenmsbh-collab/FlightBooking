import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/NavBar";

import SearchFlights from "./pages/SearchFlights";
import { Airlines } from "./pages/Airlines";
import { About } from "./pages/About";
import FlightDetail from "./pages/FlightDetails";
import ConfirmBooking from "./pages/ConfirmBooking";
import { Home } from "./pages/Home";
import MyBookings from "./pages/MyBookings";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet /> 
    </>
  );
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/flights", element: <SearchFlights /> },
      { path: "/airlines", element: <Airlines /> },
      { path: "/about", element: <About /> },
      { path: "/flight/:flightId", element: <FlightDetail /> },
      { path: "/my-bookings", element: <MyBookings /> },
      { path: "/confirm-booking", element: <ConfirmBooking /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
