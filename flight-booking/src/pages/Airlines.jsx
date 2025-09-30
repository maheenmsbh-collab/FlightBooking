import { useQuery } from "@tanstack/react-query";
import { fetchAirlines } from "../api/flights";
import Loading from "../components/Loading";

export function Airlines() {
  const queryKey = ["airlines"];
  const queryFn = () => fetchAirlines();

  const { data: airlines, isLoading, isError, error } = useQuery({
    queryKey,
    queryFn,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-200">
        <Loading/>
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-red-400">
        <p>Error: {error.message}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-900 p-8 text-center">
      <h1 className="text-4xl font-bold text-blue-400 mb-8">Airlines</h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  ">
        {airlines.map((airline) => (
          <div
            key={airline.iata_code || airline.airline_id}
            className="bg-slate-800 hover:bg-slate-700 transition duration-300 p-6 rounded-2xl shadow-lg text-slate-100 flex flex-col items-center justify-center"
          >
            <h2 className="text-lg font-semibold">{airline.airline_name}</h2>
            <p className="text-slate-400 mt-2 text-sm">{airline.iata_code}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
