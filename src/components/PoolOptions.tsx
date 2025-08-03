import React, { useEffect, useState } from "react";

interface PoolOption {
    label: string;
    className: string;
}

const PoolOptions: React.FC = () => {
    const [poolOptions, setPoolOptions] = useState<PoolOption[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("https://amaranoc4-default-rtdb.firebaseio.com/poolOptions.json")
            .then((res) => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.json();
            })
            .then((data) => {
                const optionsArray = Array.isArray(data)
                    ? data
                    : Object.values(data);
                setPoolOptions(optionsArray as PoolOption[]);
                setLoading(false);
            })
            .catch((err: Error) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading pool options...</p>;
    if (error) return <p>Error loading pool options: {error}</p>;

    return (
        <div>
            <p className="text-base font-medium absolute top-[1140px] left-[120px]">Pool</p>

            <div className="absolute top-[1180px] left-[120px] grid grid-cols-2 grid-rows-3 gap-2">
                {poolOptions.map((option, index) => (
                    <div key={index} className={option.className}>
                        {option.label}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PoolOptions;
