// SearchResults.tsx
import React from "react";
import { items } from "../data/search";
import BestOfferItem from "./BestOfferItem";
import { icons } from "../data/icons";

interface SearchResultsProps {
    searchTerm: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchTerm }) => {
    const filteredItems = items.filter((item) =>
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredItems.length === 0) {
        return <p className="p-5">No results found for "{searchTerm}"</p>;
    }

    return (
        <div className="grid justify-center">
            < div className="grid grid-cols-3 gap-4 justify-center items-center" >
                {
                    filteredItems.map((item) => (
                        <div key={item.id} className="h-[400px] w-[330px] rounded-[10px]">
                            <BestOfferItem offer={item} icons={icons} />
                        </div>
                    ))
                }
            </div >
        </div>

    );
};

export default SearchResults;
