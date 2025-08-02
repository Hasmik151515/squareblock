import React, { useEffect, useState } from "react";

interface BathroomOption {
    label: string;
    className: string;
}

const Bathrooms: React.FC = () => {
    const [bathrooms, setBathrooms] = useState<BathroomOption[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("https://amaranoc4-default-rtdb.firebaseio.com/bathrooms.json")
            .then((res) => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.json();
            })
            .then((data) => {
                if (data) {
                    const bathsArray = Array.isArray(data) ? data : Object.values(data);
                    setBathrooms(bathsArray as BathroomOption[]);
                }
                setLoading(false);
            })
            .catch((err: Error) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading bathrooms...</p>;
    if (error) return <p>Error loading bathrooms: {error}</p>;

    return (
        <div>
            <p className="text-base font-medium absolute top-[990px] left-[120px]">Bathrooms count</p>

            <div className="absolute top-[1030px] left-[120px]">
                <div className="grid grid-cols-3 gap-2">
                    {bathrooms.map((bath, idx) => (
                        <div key={idx} className={bath.className}>
                            {bath.label}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Bathrooms;
