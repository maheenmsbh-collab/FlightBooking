
export default function Loading({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center  min-h-screen  text-slate-100">
    
      <div className="w-16 h-16 border-4 border-t-blue-500 border-b-blue-500 border-l-transparent border-r-transparent rounded-full animate-spin mb-4"></div>
      
    
      <p className="text-lg font-semibold">{text}</p>
    </div>
  );
}
