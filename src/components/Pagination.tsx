import React, { useEffect, useState } from "react";
import PageItem from "./PageItem";

interface Page {
  label: string;
  className?: string;
}

const Pagination: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://amaranoc4-default-rtdb.firebaseio.com/pages.json")  
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(data => {
        setPages(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading pages...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="absolute left-[800px] top-[2800px] flex items-center gap-3">
      <div className="flex justify-center items-center h-[40px] w-[40px] rounded-full text-[#585e6d] cursor-pointer">
        <i className="fa-solid fa-arrow-left"></i>
      </div>

      {pages.map((page, index) => (
        <PageItem key={index} label={page.label} className={page.className} />
      ))}

      <div className="flex justify-center items-center h-[40px] w-[40px] rounded-full text-[#585e6d] cursor-pointer">
        <i className="fa-solid fa-arrow-right"></i>
      </div>
    </div>
  );
};

export default Pagination;
