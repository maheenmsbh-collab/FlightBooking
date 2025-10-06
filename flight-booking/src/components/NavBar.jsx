import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-slate-800 text-slate-100 shadow-md">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center px-6 py-3">
        {/* Logo */}
        <h1 className="text-2xl font-bold mb-3 md:mb-0 text-center md:text-left">
          FlightGo. ✈️
        </h1>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <Link to="/" className="hover:text-slate-300 transition">Home</Link>
          <Link to="/flights" className="hover:text-slate-300 transition">SearchFlights</Link>
          {/* <Link to="/tracker">Live Tracker</Link> */}
          <Link to="/airlines" className="hover:text-slate-300 transition">Airlines</Link>
          <Link to="/about" className="hover:text-slate-300 transition">About</Link>
          <Link to="/my-bookings" className="hover:text-slate-300 transition">MyBookings</Link>
        </div>
      </div>
    </nav>
  );
}
