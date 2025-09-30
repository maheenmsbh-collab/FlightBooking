const KEY = "9d84f7c44c7f064eccceddd27f79a1dc"; 




export async function fetchAirlines() {
  try {
    const res = await fetch(
      `https://api.aviationstack.com/v1/airlines?access_key=${KEY}`
    );

    if (!res.ok) throw new Error("Network response was not ok");

    const json = await res.json();
    return json.data || [];
    
  } catch (error) {
    console.error("Error fetching airlines:", error);
    return [];
  }
}
export async function fetchFlightsByRoute(dep, arr) {
  if (!dep || !arr) return [];

  try {
    const res = await fetch(
      `https://api.aviationstack.com/v1/flights?access_key=${KEY}&dep_iata=${dep}&arr_iata=${arr}&limit=30`
    );


    if (!res.ok) {
      if (res.status === 429) throw new Error("API limit reached. Try again later.");
      throw new Error("Network response was not ok");
    }

    const data = await res.json();
    console.log("data",data)

    return data.data || [];
  } catch (error) {
    console.error("Error fetching flights by route:", error);
    return [];
  }
}
