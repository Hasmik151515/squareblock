import React, { useEffect, useState } from "react";
import PageItem from "./PageItem";

interface Page {
  label: string;
  className?: string;
}

interface PaginationProps {
  columns: number; // 2 կամ 3
}

const Pagination: React.FC<PaginationProps> = ({ columns }) => {
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

  // Շատ պարզ տարբերակ՝ top-ի արժեքը ըստ columns
  const topPosition = columns === 2 ? 3600 : 1050;

  return (
    <div className="flex items-center gap-3" style={{ position: 'absolute', left: '800px', top: `${topPosition}px` }}>
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
