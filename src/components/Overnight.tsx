import React, { useState, useEffect } from "react";

interface OvernightOption {
  label: string;
  className?: string;
}

const Overnight: React.FC = () => {
  const [overnightOptions, setOvernightOptions] = useState<OvernightOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://amaranoc4-default-rtdb.firebaseio.com/overnightOptions.json")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        if (data) {
          const optionsArray = Array.isArray(data) ? data : Object.values(data);
          setOvernightOptions(optionsArray);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[600px] w-[1500px]">
        < div className=" h-[350px] w-[500px]" >
          < img className=" h-[350px] w-[500px]" src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" alt="" />
        </div >
      </div >
    );
  }

  if (error) return <p>Error loading overnight options: {error}</p>;

  return (
    <div>
      <p className="text-base font-medium absolute top-[660px] left-[120px]">Overnight availability</p>

      <div className="absolute top-[700px] left-[120px] grid grid-cols-3 gap-2">
        {overnightOptions.map((option, index) => (
          <div key={index} className={option.className}>
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overnight;
