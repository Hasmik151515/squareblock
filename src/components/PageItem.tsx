import React from "react";

interface PageItemProps {
  label: string;
  className?: string;
}

const PageItem: React.FC<PageItemProps> = ({ label, className }) => {
  return <div className={className}>{label}</div>;
};

export default PageItem;
