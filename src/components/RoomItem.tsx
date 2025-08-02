import React from "react";

type RoomOption = {
  label: string;
  className: string;
};

type Props = {
  option: RoomOption;
};

const RoomItem: React.FC<Props> = ({ option }) => (
  <div className={option.className}>
    {option.label}
  </div>
);

export default RoomItem;
