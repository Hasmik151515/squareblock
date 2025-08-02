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

  if (loading) return <p>Loading overnight options...</p>;
  if (error) return <p>Error loading overnight options: {error}</p>;

  return (
    <div>
              <p className="text-base font-medium absolute top-[660px] left-[120px]">Overnight availability</p>

    <div className="absolute top-[700px] left-[120px] border border-spacing-2 grid grid-cols-3 gap-3">
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
