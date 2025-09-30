import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ConfirmBooking() {
  const location = useLocation();
  const navigate = useNavigate();
  const flight = location.state?.flight;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cnic, setCnic] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const username = useSelector((state) => state.user.username);

  if (!flight) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center">
        <p className="text-xl mb-4">No flight selected.</p>
        <button
          onClick={() => navigate("/my-bookings")}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Back to My Bookings
        </button>
      </div>
    );
  }

  const handleConfirm = () => {
    if (!name || !email) {
      alert("Please enter your details to confirm your booking. Thank you!");
      return;
    }

    const saved = JSON.parse(localStorage.getItem("bookings") || "[]");
    const savedAfterConfirm = saved.filter(
      (m) => m.flight?.iata !== flight.flight?.iata
    );
    localStorage.setItem("bookings", JSON.stringify(savedAfterConfirm));

    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      navigate("/flights");
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex justify-center items-center p-6 relative">
      {/* Main content */}
      <div className={`${showPopup ? "blur-sm" : ""} bg-slate-800 p-8 rounded-lg shadow-lg max-w-lg w-full transition-all`}>
        <h1 className="text-3xl font-bold text-blue-400 text-center mb-6">
          Confirm Booking
        </h1>

        <p className="text-lg font-semibold mb-2">
          Flight Code: {flight.flight?.iata || "N/A"}
        </p>

        <div className="mb-6 space-y-2">
          <p><strong>Airline:</strong> {flight.airline?.name || "Unknown"}</p>
          <p><strong>From:</strong> {flight.departure?.airport} ({flight.departure?.iata})</p>
          <p><strong>To:</strong> {flight.arrival?.airport} ({flight.arrival?.iata})</p>
        </div>

        <h2 className="text-xl font-semibold mb-2">User Information</h2>
        <div className="flex flex-col gap-3">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="p-3 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"/>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" className="p-3 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"/>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone (optional)" className="p-3 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"/>
          <input type="text" value={cnic} onChange={(e) => setCnic(e.target.value)} placeholder="Enter CNIC" className="p-3 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"/>
        </div>

        <div className="flex flex-col gap-4 mt-6">
          <button onClick={handleConfirm} className="w-full bg-green-600 py-3 rounded-lg font-semibold hover:bg-green-700 transition shadow-md">
            Confirm Booking
          </button>
          <button onClick={() => navigate("/my-bookings")} className="w-full bg-slate-700 hover:bg-slate-600 py-3 rounded-lg font-semibold transition">
            Cancel
          </button>
        </div>
      </div>

   
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
         
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

    
          <div className="relative bg-blue-950 text-white px-10 py-8 rounded-2xl shadow-2xl text-center animate-popup z-50">
            <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
            <p className="mb-4">✅ Hey {username}, your flight has been successfully confirmed.</p>
            <button
              onClick={() => { setShowPopup(false); navigate("/flights"); }}
              className="bg-green-600 px-6 py-2 rounded-lg hover:bg-green-700 transition font-semibold"
            >
              Continue
            </button>
          </div>
        </div>
      )}

    
      <style>
        {`
          @keyframes popup {
            0% { transform: scale(0.5); opacity: 0; }
            50% { transform: scale(1.05); opacity: 1; }
            100% { transform: scale(1); }
          }
          .animate-popup {
            animation: popup 0.4s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
}
