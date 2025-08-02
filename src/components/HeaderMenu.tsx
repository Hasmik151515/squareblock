import React from 'react';
import { useNavigate } from 'react-router-dom';

interface MenuItem {
  label: string;
  className?: string;
}

interface HeaderMenuProps {
  menuItems: MenuItem[];
}
function HeaderMenu({ menuItems }: HeaderMenuProps): React.ReactElement {
  const navigate = useNavigate();

  const handleMenuClick = (label: string) => {
    const path = '/' + label.toLowerCase().replace(/\s+/g, '-');
    navigate(path);
  };

  return (
    <>
      {menuItems.map((item, index) => (
        <div
          key={index}
          className={`grid justify-center items-center cursor-pointer ${item.className ?? ''}`}
          onClick={() => handleMenuClick(item.label)}
        >
          {item.label}
        </div>
      ))}
    </>
  );
}

export default HeaderMenu;
