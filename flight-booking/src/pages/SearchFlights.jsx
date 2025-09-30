import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFlightsByRoute } from "../api/flights";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";

export default function SearchFlights() {
  
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [dropList, setDropList] = useState(false);

  const navigate = useNavigate();
  const username = useSelector((state) => state.user.username);

  const { data: flights, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["flights", departure, arrival],
    queryFn: () => fetchFlightsByRoute(departure, arrival),
    enabled: false,
    
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (!departure || !arrival) {
      alert("Please enter dep and arr IATA codes ⚠️");
      return;
    }
    refetch();
  };

  const iataCodes = [
    { code: "KHI", city: "Karachi" },
    { code: "LHE", city: "Lahore" },
    { code: "ISB", city: "Islamabad" },
    { code: "DXB", city: "Dubai" },
    { code: "DOH", city: "Doha" },
    { code: "LHR", city: "London Heathrow" },
    { code: "JFK", city: "New York JFK" },
    { code: "HND", city: "Tokyo Haneda" },
    { code: "IST", city: "Istanbul" },
     { code: "BOM", city: "Mumbai" },
      { code: "DEL", city: "Delhi" },
       { code: "YYZ", city: "Toronto" },

  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8 flex flex-col items-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-center text-blue-400">
        FlightGo.
      </h1>
      <p className="text-center text-slate-400 mt-3 mb-8 text-xl sm:text-base">
        Hi {username || "Guest"}! Search flights using IATA codes.
      </p>

     
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-3xl bg-slate-800/60 p-6 rounded-2xl shadow-lg backdrop-blur-md border border-slate-700"
      >
        <input
          type="text"
          placeholder="Departure (e.g. LHR)"
          value={departure}
          onChange={(e) => setDeparture(e.target.value.toUpperCase())}
          className="flex-1 p-3 rounded-xl bg-slate-900/70 text-slate-100 border border-slate-700 placeholder-slate-500"
        />

       
        <input
          type="text"
          placeholder="Arrival (e.g. JFK)"
          value={arrival}
          onChange={(e) => setArrival(e.target.value.toUpperCase())}
          className="flex-1 p-3 rounded-xl bg-slate-900/70 text-slate-100 border border-slate-700 placeholder-slate-500"
        />

     
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-blue-600/40"
        >
          Search
        </button>

       
        <div className="relative">
          <button
            type="button"
            onClick={() => setDropList(!dropList)}
            className="bg-slate-700 hover:bg-slate-600 px-4 py-3 rounded-xl shadow-md transition flex items-center gap-1"
          >
            View IATA Codes⬇️
          </button>

         
          {dropList && (
            <div className="absolute right-0 mt-3 w-64 bg-slate-900 text-white rounded-xl shadow-xl">
              <div className="max-h-56 overflow-y-auto">
                {iataCodes.map((iata) => (
                  <div
                    key={iata.code}
                    onClick={() => setDropList(false)}
                    className="px-4 py-2 cursor-pointer text-sm border-b border-slate-800 hover:bg-slate-800 transition"
                  >
                    <span className="font-semibold">{iata.code}</span> :{" "}
                    {iata.city}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </form>

    
      <div className="mt-9 w-full  px-2 sm:px-1">
       
        {isLoading && (
          <div className="text-center py-6">
            <Loading />
          </div>
        )}

        
        {isError && <p className="text-center text-red-400">{error.message}</p>}

     
        {flights && flights.length > 0 ? (
          <div className="overflow-x-auto w-full">
            <table className="w-full min-w-full bg-slate-800 rounded-lg">
              <thead className="bg-slate-700">
                <tr>
                  <th className="py-3 px-4 text-left">Airline</th>
                  <th className="py-3 px-4 text-left">Flight</th>
                  <th className="py-3 px-4 text-left">Route</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {flights.map((flight, index) => {
                  const isScheduled = flight.flight_status === "scheduled";
                  const statusColor = isScheduled
                    ? "text-green-400"
                    : "text-red-400";

                  return (
                    <tr
                      key={index}
                      className="border-b border-slate-700 hover:bg-slate-700 transition"
                    >
                      <td className="py-3 px-4">
                        {flight.airline?.name || "Unknown Airline"}
                      </td>
                      <td className="py-3 px-4">
                        {flight.flight?.iata ||
                          flight.flight?.number ||
                          "N/A"}
                      </td>
                      <td className="py-3 px-4">
                        {flight.departure?.iata || "?"} →{" "}
                        {flight.arrival?.iata || "?"}
                      </td>
                      <td className={`py-3 px-4 font-semibold ${statusColor}`}>
                        {flight.flight_status?.toUpperCase()}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {isScheduled ? (
                          <button
                            onClick={() =>
                              navigate(`/flight/${index}`, { state: { flight } })
                            }
                            className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded"
                          >
                            View Details
                          </button>
                        ) : (
                          <button
                            disabled
                            className="bg-gray-600 px-4 py-1 rounded cursor-not-allowed"
                          >
                            Not Available :(
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          !isLoading && (
            <p className="text-center text-slate-400 mt-6">
              No flights found... try searching again.
            </p>
          )
        )}
      </div>
    </div>
  );
}
