import React from "react";

interface PoolOption {
  label: string;
  className?: string;
}

interface PoolItemProps {
  option: PoolOption;
}

const PoolItem: React.FC<PoolItemProps> = ({ option }) => (
  <div className={option.className}>
    {option.label}
  </div>
);

export default PoolItem;
