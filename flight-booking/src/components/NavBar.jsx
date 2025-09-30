
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-slate-800 text-slate-100 px-6 py-3 flex justify-between items-center shadow h-19">
      <h1 className="text-3xl font-bold text-slate-100 ">FlightGo. ✈️</h1>
      <div className="flex gap-6 text-sm">
        <Link to="/">Home</Link>
        <Link to="/flights">SearchFlights</Link>
        {/* <Link to="/tracker">Live Tracker</Link> */}
        <Link to="/airlines">Airlines</Link>
        <Link to="/about">About</Link>
        <Link to="/my-bookings">MyBookings</Link>
      </div>
    </nav>
  );
}
