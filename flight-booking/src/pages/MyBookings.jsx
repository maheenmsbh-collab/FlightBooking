import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(saved);
  }, []);

  const handleRemove = (indexToRemove) => {
    const updated = bookings.filter((_, index) => index !== indexToRemove);
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
  };

  const handleConfirm = (flight) => {
    navigate("/confirm-booking", { state: { flight } });
  };

  if (bookings.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-950 text-white p-6">
        <p className="text-xl font-semibold">🛫 No booked flights yet.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto mt-12 p-8 bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-300 tracking-wide">
          My Bookings
        </h1>

        <div className="space-y-4">
          {bookings.map((flight, index) => (
            <div
              key={index}
              className="p-4 bg-slate-700/70 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition hover:scale-[1.01] shadow-lg"
            >
              {/* Flight Info */}
              <div className="space-y-1">
                <p className="font-semibold text-lg text-blue-300">
                  {flight.airline?.name || "Unknown Airline"}
                </p>
                <p>
                  {flight.departure?.iata} → {flight.arrival?.iata}
                </p>
                <p>Status: <span className="font-medium">{flight.flight_status}</span></p>
                <p>Flight No: {flight.flight?.iata || flight.flight?.number}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-2 md:mt-0">
                <button
                  className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition shadow-md"
                  onClick={() => handleRemove(index)}
                >
                  Cancel
                </button>
                <button
                  className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition shadow-md"
                  onClick={() => handleConfirm(flight)}
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
