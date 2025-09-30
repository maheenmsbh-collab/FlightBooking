
export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-10 mt-16">
      <div className="max-w-6xl mx-auto text-center px-6">
        <h2 className="text-2xl font-bold tracking-wide">FlightGo.</h2>
        <p className="text-slate-300 mt-2 text-sm">
          Real-time flight booking experience.
        </p>

        <hr className="my-6 border-slate-700" />

        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} FlightGo. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
