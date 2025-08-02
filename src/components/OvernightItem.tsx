import React from "react";

interface OvernightOption {
  label: string;
  className?: string;
}

interface OvernightItemProps {
  option: OvernightOption;
}

const OvernightItem: React.FC<OvernightItemProps> = ({ option }) => (
  <div className={option.className}>
    {option.label}
  </div>
);

export default OvernightItem;
