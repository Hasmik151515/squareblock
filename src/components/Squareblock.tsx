import React from "react";

interface SquareblockProps {
    setColumns: React.Dispatch<React.SetStateAction<number>>;
}

const Squareblock: React.FC<SquareblockProps> = ({ setColumns }) => {
    return (
        <div>
            {/* 2 Columns */}
            <div
                onClick={() => setColumns(2)}
                className="border border-gray-400 h-[45px] w-[45px] absolute top-[330px] right-[50px] rounded-[10px] flex justify-center items-center gap-0.5 bg-white cursor-pointer"
            >
                <i className="fa-regular fa-square text-[12px] text-black"></i>
                <i className="fa-regular fa-square text-[12px] text-black"></i>
            </div>

            {/* 3 Columns */}
            <div
                onClick={() => setColumns(3)}
                className="border border-gray-400 h-[45px] w-[45px] absolute top-[330px] right-[110px] rounded-[10px] flex justify-center items-center gap-0.5 bg-white cursor-pointer"
            >
                <i className="fa-regular fa-square text-[12px] text-black"></i>
                <i className="fa-regular fa-square text-[12px] text-black"></i>
                <i className="fa-regular fa-square text-[12px] text-black"></i>
            </div>
        </div>
    );
};

export default Squareblock;
