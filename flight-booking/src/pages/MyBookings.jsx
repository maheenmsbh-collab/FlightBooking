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
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center">
        <p className="text-xl">No booked flights yet.</p>
      </div>
    );

  return (
    <div>
    
    <div className="max-w-3xl mx-auto  mt-12 p-6 bg-slate-800 rounded-lg text-slate-100">
      <h1 className="text-3xl font-bold mb-6 text-center">My Bookings</h1>
      <div className="space-y-4">
        {bookings.map((flight, index) => (
          <div
            key={index}
            className="p-4 bg-slate-700 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-lg">
                {flight.airline?.name || "Unknown Airline"}
              </p>
              <p>
                {flight.departure?.iata} → {flight.arrival?.iata}
              </p>
              <p>Status: {flight.flight_status}</p>
              <p>Flight No: {flight.flight?.iata || flight.flight?.number}</p>
            </div>
            <div className="flex gap-2">
              <button
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                onClick={() => handleRemove(index)}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 px-3 py-1 rounded hover:bg-green-700"
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
