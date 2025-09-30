import { useLocation, useNavigate } from "react-router-dom";

export default function FlightDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const flight = location.state?.flight;

  if (!flight) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center">
        <p className="text-xl mb-4">No flight details found.</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }


  const handleBook = () => {
  
  const saved = JSON.parse(localStorage.getItem("bookings") || "[]");
  const alreadyExist = saved.some(
    (fly) => fly.flight?.iata === flight.flight?.iata
  );


  if (alreadyExist) {    alert("This flight is already in your bookings ");
    return; 
  }

  saved.push(flight);
  localStorage.setItem("bookings", JSON.stringify(saved));

  navigate("/my-bookings");
};


  return (
    <div className="min-h-screen  bg-slate-900 text-slate-100
     flex justify-center items-center p-6">
      <div className="bg-slate-800 p-8 rounded-lg shadow-lg max-w-160 h-130 w-full">
        <h1 className="text-3xl font-bold text-blue-400 text-center mb-6">
          Flight Details
        </h1>

        <p>
          <strong>Airline:</strong> {flight.airline?.name || "Unknown"}
        </p>
        <p>
          <strong>Flight Code:</strong> {flight.flight?.iata || "N/A"}
        </p>
        <p>
          <strong>From:</strong> {flight.departure?.airport} (
          {flight.departure?.iata})
        </p>
        <p>
          <strong>To:</strong> {flight.arrival?.airport} (
          {flight.arrival?.iata})
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={
              flight.flight_status === "scheduled"
                ? "text-green-400"
                : "text-red-400"
            }
          >
            {flight.flight_status.toUpperCase()}
          </span>
        </p>

        {flight.flight_status === "scheduled" && (
          <button
            onClick={handleBook}
            className="mt-12 w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold"
          >
            Book Flight
          </button>
        )}

        <button
          onClick={() => navigate("/flights")}
          className="mt-7 w-full bg-slate-700 hover:bg-slate-600 py-2 rounded"
        >
          Back to Search
        </button>
      </div>
    </div>
  );
}
