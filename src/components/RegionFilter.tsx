import React, { useEffect, useState } from "react";

interface Region {
  name: string;
  count?: number;
}

function RegionFilter() {
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://amaranoc4-default-rtdb.firebaseio.com/regions.json")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        const regionsArray = Array.isArray(data) ? data : Object.values(data);
        setRegions(regionsArray);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (error) return <p>Error loading regions: {error}</p>;
  if (loading) {
    return (
      < div className=" h-[35px] w-[50px]" >
        < img className=" h-[35px] w-[50px]" src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" alt="" />
      </div >
    );
  }
  return (
    <div className="w-[278px] h-[1750px] rounded-[15px] p-5 border border-gray-200 relative left-[100px]">
      <p className="relative left-2.5 top-2.5 font-medium">Region</p>
      <div
        className="h-[200px] w-[200px] overflow-y-scroll relative top-5 text-[#585e6d] font-normal
                   grid grid-rows-[repeat(16,30px)]"
      >
        {regions.map((region, idx) => (
          <label key={idx} className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox" />
            <span>
              {region.name} {region.count !== undefined ? `(${region.count})` : ""}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default RegionFilter;
