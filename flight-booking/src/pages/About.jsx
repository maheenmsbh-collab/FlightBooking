import { useSelector } from "react-redux";
export function About() {
  const username = useSelector((state) => state.user.username);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  p-6 text-center "
    style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1454496406107-dc34337da8d6?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}>
         <div className= "h-70 w-200 rounded-lg   bg-slate-900/60 backdrop-blur-sm">

      <h1 className="text-5xl font-bold text-slate-100 mt-7 mb-8">FlightGo</h1>
     
      <p className="text-xl text-slate-100 mb-7">
        This website provides real-time flight data using the AviationStack API...
      </p>
      <p className="text-lg font-bold text-slate-100">
        {username},We hope you have a great experience with us! ✈️
      </p>
      </div>
    </div>
  );
}
