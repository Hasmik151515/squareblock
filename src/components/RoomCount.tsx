import React, { useEffect, useState } from "react";

// Տվյալների տիպը
type RoomOption = {
    label: string;
    className: string;
};

const RoomCount: React.FC = () => {
    const [roomCounts, setRoomCounts] = useState<RoomOption[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("https://amaranoc4-default-rtdb.firebaseio.com/roomCounts.json")
            .then((res) => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.json();
            })
            .then((data) => {
                if (data) {
                    const roomCountsArray: RoomOption[] = Array.isArray(data)
                        ? data
                        : Object.values(data);
                    setRoomCounts(roomCountsArray);
                }
                setLoading(false);
            })
            .catch((err: Error) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading room counts...</p>;
    if (error) return <p>Error loading room counts: {error}</p>;

    return (
        <div>
            <p className="text-base font-medium absolute top-[770px] left-[120px]">Room count</p>

            <div className="absolute top-[810px] left-[120px] grid grid-cols-3 gap-2">
                {roomCounts.map((option, index) => (
                    <div key={index} className={option.className}>
                        {option.label}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoomCount;
