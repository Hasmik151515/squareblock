// SearchInput.tsx
import React from "react";

interface SearchInputProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
    searchTerm,
    setSearchTerm,
    placeholder = "Search",
}) => {
    return (
        <div className="absolute top-[30px] left-[1290px]">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={placeholder}
                className="h-[34px] w-[200px] rounded-full text-[#101623] border border-[#101623] px-2 text-[15px]"
            />
            <i className="fa-solid fa-magnifying-glass absolute top-[11px] left-[175px] text-[#101623] text-[13px]"></i>

        </div>
    );
};

export default SearchInput;
