import React from "react";

interface AdvantageItemProps {
  name: string;
}

const AdvantageItem: React.FC<AdvantageItemProps> = ({ name }) => {
  return (
    <label>
      <input type="checkbox" /> {name}
    </label>
  );
};

export default AdvantageItem;
